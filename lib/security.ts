const BLOCK_STRIP_TAGS = [
  'script',
  'style',
  'iframe',
  'object',
  'embed',
  'svg',
  'math',
  'form',
  'textarea',
  'button',
  'noscript',
  'template',
] as const;

const ALLOWED_EDITORIAL_TAGS = new Set([
  'p',
  'br',
  'strong',
  'b',
  'em',
  'i',
  'u',
  'ul',
  'ol',
  'li',
  'h2',
  'h3',
  'h4',
  'blockquote',
  'a',
  'span',
]);

/**
 * Escapa caracteres especiais HTML para inserção segura de texto puro.
 */
export function escapeHtmlText(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function extrairHrefSeguro(attrsRaw: string): string | null {
  const match = attrsRaw.match(/\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/i);
  if (!match) return null;
  const rawHref = (match[1] ?? match[2] ?? match[3] ?? '').trim();
  if (!rawHref) return null;

  // Remover caracteres de controlo que possam mascarar esquemas perigosos
  const cleaned = rawHref.replace(/[\u0000-\u001f\u007f\s]+/g, '');
  if (!/^(https?:\/\/|mailto:|\/(?!\/|\\))/i.test(cleaned)) {
    return null;
  }
  return rawHref;
}

function findTagEndIndex(html: string, startLt: number): number {
  let quote: '"' | "'" | null = null;
  for (let i = startLt + 1; i < html.length; i++) {
    const ch = html[i];
    if (quote) {
      if (ch === quote) quote = null;
    } else if (ch === '"' || ch === "'") {
      quote = ch;
    } else if (ch === '>') {
      return i;
    }
  }
  return -1;
}

/**
 * Sanitiza HTML editorial por allowlist estrita de tags tipográficas.
 * Remove blocos ativos (script, style, svg, iframe, object, etc.),
 * elimina todos os event handlers (on*) e restringe atributos apenas a href seguro em <a>.
 */
export function sanitizarHtmlEditorial(rawHtml: string): string {
  if (!rawHtml || typeof rawHtml !== 'string') return '';

  let working = rawHtml;

  // 1. Remover blocos perigosos incluindo conteúdo interno (em ciclo até estabilizar contra nesting)
  for (const tag of BLOCK_STRIP_TAGS) {
    const blockRegex = new RegExp(`<${tag}\\b[\\s\\S]*?<\\/${tag}>`, 'gi');
    let prev = '';
    while (prev !== working) {
      prev = working;
      working = working.replace(blockRegex, '');
    }
    const openOnlyRegex = new RegExp(`<${tag}\\b[^>]*\\/?>`, 'gi');
    working = working.replace(openOnlyRegex, '');
  }

  // 2. Scanner tag-a-tag com allowlist estrita
  let result = '';
  let cursor = 0;

  while (cursor < working.length) {
    const lt = working.indexOf('<', cursor);
    if (lt === -1) {
      result += working.slice(cursor);
      break;
    }

    if (lt > cursor) {
      result += working.slice(cursor, lt);
    }

    // Comentários HTML <!-- ... -->
    if (working.startsWith('<!--', lt)) {
      const endComment = working.indexOf('-->', lt + 4);
      cursor = endComment === -1 ? working.length : endComment + 3;
      continue;
    }

    const gt = findTagEndIndex(working, lt);
    if (gt === -1) {
      result += '&lt;';
      cursor = lt + 1;
      continue;
    }

    const inner = working.slice(lt + 1, gt).trim();
    cursor = gt + 1;

    const tagMatch = inner.match(/^(\/?)\s*([a-zA-Z][a-zA-Z0-9-]*)(?:[\s/]([\s\S]*))?$/);
    if (!tagMatch) {
      result += '&lt;';
      cursor = lt + 1;
      continue;
    }

    const isClosing = tagMatch[1] === '/';
    const tagName = tagMatch[2].toLowerCase();
    const attrsRaw = tagMatch[3] || '';

    if (!ALLOWED_EDITORIAL_TAGS.has(tagName)) {
      continue;
    }

    if (isClosing) {
      if (tagName !== 'br') {
        result += `</${tagName}>`;
      }
      continue;
    }

    if (tagName === 'br') {
      result += '<br />';
      continue;
    }

    if (tagName === 'a') {
      const safeHref = extrairHrefSeguro(attrsRaw);
      if (!safeHref) {
        result += '<a>';
      } else if (/^https?:\/\//i.test(safeHref)) {
        result += `<a href="${escapeHtmlText(safeHref)}" target="_blank" rel="noopener noreferrer">`;
      } else {
        result += `<a href="${escapeHtmlText(safeHref)}">`;
      }
      continue;
    }

    result += `<${tagName}>`;
  }

  return result;
}

export function obterIpCliente(request: Request): string {
  const realIp = request.headers.get('x-real-ip')?.trim();
  const vercelForwarded = request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim();
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const cfConnecting = request.headers.get('cf-connecting-ip')?.trim();

  const candidato = realIp || vercelForwarded || forwardedFor || cfConnecting || '';
  if (!candidato || /[\r\n\s]/.test(candidato)) {
    return '127.0.0.1';
  }
  return candidato.slice(0, 64);
}

interface RateLimitBucketEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitBucketEntry>();
const MAX_RATE_LIMIT_ENTRIES = 2000;

export function verificarRateLimitMemoria(
  bucket: string,
  ip: string,
  maxRequests: number,
  windowMs: number,
  nowMs: number = Date.now()
): { allowed: boolean; retryAfterSec: number } {
  if (rateLimitStore.size > MAX_RATE_LIMIT_ENTRIES / 2) {
    for (const [k, entry] of rateLimitStore.entries()) {
      if (entry.resetAt <= nowMs) {
        rateLimitStore.delete(k);
      }
    }
    if (rateLimitStore.size >= MAX_RATE_LIMIT_ENTRIES) {
      const firstKey = rateLimitStore.keys().next().value;
      if (firstKey !== undefined) {
        rateLimitStore.delete(firstKey);
      }
    }
  }

  const key = `${bucket}:${ip}`;
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt <= nowMs) {
    rateLimitStore.set(key, { count: 1, resetAt: nowMs + windowMs });
    return { allowed: true, retryAfterSec: Math.ceil(windowMs / 1000) };
  }

  if (current.count >= maxRequests) {
    const retryAfterSec = Math.max(1, Math.ceil((current.resetAt - nowMs) / 1000));
    return { allowed: false, retryAfterSec };
  }

  current.count += 1;
  return {
    allowed: true,
    retryAfterSec: Math.max(1, Math.ceil((current.resetAt - nowMs) / 1000)),
  };
}

export function limparRateLimitMemoriaParaTestes(): void {
  rateLimitStore.clear();
}

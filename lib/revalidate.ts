import { timingSafeEqual } from 'node:crypto';
import { revalidatePath } from 'next/cache';

export const ALLOWED_SITE_PATHS = [
  '/',
  '/associacao',
  '/modalidades',
  '/patrocinadores',
  '/multimedia',
  '/jif',
  '/jif/classificacao',
  '/jif/futsal',
  '/api/search-index',
] as const;

export type AllowedSitePath = (typeof ALLOWED_SITE_PATHS)[number];

export type RevalidateScope =
  | 'all'
  | 'noticias'
  | 'eventos'
  | 'modalidades'
  | 'patrocinadores'
  | 'multimedia'
  | 'documentos'
  | 'jif';

const SCOPE_PATHS: Record<RevalidateScope, AllowedSitePath[]> = {
  all: [...ALLOWED_SITE_PATHS],
  noticias: ['/', '/api/search-index'],
  eventos: ['/', '/jif', '/api/search-index'],
  modalidades: ['/modalidades'],
  patrocinadores: ['/patrocinadores'],
  multimedia: ['/multimedia'],
  documentos: ['/associacao'],
  jif: ['/', '/jif', '/jif/classificacao', '/jif/futsal', '/api/search-index'],
};

const ALLOWED_ORIGINS = [
  'https://ajavp.pt',
  'https://www.ajavp.pt',
  'https://gestao.ajavp.pt',
  'https://ajavp.vercel.app',
  'https://ajavp-site.vercel.app',
  'https://ajavp-gestao.vercel.app',
];

export function getRevalidateCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get('origin') || '';
  const isLocalhost =
    origin.startsWith('http://localhost:') ||
    origin.startsWith('http://127.0.0.1:');

  const allowOrigin =
    ALLOWED_ORIGINS.includes(origin) || isLocalhost
      ? origin
      : ALLOWED_ORIGINS[0];

  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

function getBearerToken(request: Request): string {
  const authHeader = request.headers.get('authorization') || '';
  return authHeader.toLowerCase().startsWith('bearer ')
    ? authHeader.slice(7).trim()
    : '';
}

function isValidRevalidationToken(secret: string, candidate: string): boolean {
  if (!secret || !candidate) return false;

  const expected = Buffer.from(secret, 'utf8');
  const actual = Buffer.from(candidate, 'utf8');

  if (expected.length !== actual.length) return false;

  try {
    return timingSafeEqual(expected, actual);
  } catch {
    return false;
  }
}

export function verifyRevalidateRequest(
  request: Request
): { ok: true } | { ok: false; status: number; error: string } {
  const secret = process.env.REVALIDATE_SECRET_TOKEN?.trim();
  if (!secret) {
    return {
      ok: false,
      status: 500,
      error: 'Servidor de revalidação não configurado.',
    };
  }

  const token = getBearerToken(request);
  if (!isValidRevalidationToken(secret, token)) {
    return {
      ok: false,
      status: 401,
      error: 'Não autorizado. Token de revalidação inválido ou ausente.',
    };
  }

  return { ok: true };
}

export function resolveRevalidatePaths(options?: {
  scope?: string;
  paths?: unknown;
}): AllowedSitePath[] {
  const allowedSet = new Set<string>(ALLOWED_SITE_PATHS);

  if (Array.isArray(options?.paths) && options.paths.length > 0) {
    const filtered = options.paths.filter(
      (p): p is AllowedSitePath => typeof p === 'string' && allowedSet.has(p)
    );
    if (filtered.length > 0) {
      return Array.from(new Set(filtered));
    }
  }

  if (
    typeof options?.scope === 'string' &&
    options.scope in SCOPE_PATHS
  ) {
    return SCOPE_PATHS[options.scope as RevalidateScope];
  }

  return [...ALLOWED_SITE_PATHS];
}

export function revalidateAllowedPaths(paths: AllowedSitePath[]): AllowedSitePath[] {
  for (const path of paths) {
    revalidatePath(path);
  }
  return paths;
}

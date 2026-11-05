import { NextResponse } from 'next/server';

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  'https://mudgnaajtolytggksvvq.supabase.co';

const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11ZGduYWFqdG9seXRnZ2tzdnZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIwNjAxODcsImV4cCI6MjEwNzYzNjE4N30.lL5jb84u0PUWH4BjQWdZ4uZLpGKybUuhGISGB9tvdIQ';

function getCorsHeaders(req: Request) {
  const origin = req.headers.get('origin') || '';
  const allowedOrigins = [
    'https://ajavp.vercel.app',
    'https://ajavp-site.vercel.app',
    'https://ajavp-gestao.vercel.app',
    'https://ajavp.pt',
    'https://www.ajavp.pt',
  ];

  const isLocalhost =
    origin.startsWith('http://localhost:') ||
    origin.startsWith('http://127.0.0.1:');

  const allowOrigin =
    allowedOrigins.includes(origin) || isLocalhost
      ? origin
      : allowedOrigins[0];

  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

/**
 * Validação rigorosa do host do gateway de Push
 * Impede poluição da base de dados com URLs forjados ou SSRF
 */
function isPushEndpointValido(endpointStr: string): boolean {
  try {
    const url = new URL(endpointStr);
    if (url.protocol !== 'https:') return false;

    const hostname = url.hostname.toLowerCase();
    const hostsAutorizados = [
      'fcm.googleapis.com',
      'android.googleapis.com',
      'updates.push.services.mozilla.com',
    ];

    if (hostsAutorizados.includes(hostname)) return true;
    if (hostname.endsWith('.push.apple.com')) return true;
    if (hostname.endsWith('.notify.windows.com')) return true;
    if (hostname.endsWith('.push.services.mozilla.com')) return true;

    return false;
  } catch {
    return false;
  }
}

export async function OPTIONS(req: Request) {
  return new NextResponse(null, { status: 200, headers: getCorsHeaders(req) });
}

export async function POST(req: Request) {
  const corsHeaders = getCorsHeaders(req);
  try {
    if (!SUPABASE_ANON_KEY) {
      console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY não configurada no servidor.');
      return NextResponse.json(
        { error: 'Configuração de servidor incompleta.' },
        { status: 500, headers: corsHeaders }
      );
    }

    const body = await req.json().catch(() => null);
    const { endpoint, keys, userAgent } = body || {};

    if (!endpoint || typeof endpoint !== 'string' || !isPushEndpointValido(endpoint)) {
      return NextResponse.json(
        { error: 'Endpoint de notificação push inválido ou não suportado.' },
        { status: 400, headers: corsHeaders }
      );
    }

    if (
      !keys?.p256dh ||
      typeof keys.p256dh !== 'string' ||
      keys.p256dh.length < 20 ||
      keys.p256dh.length > 250 ||
      !keys?.auth ||
      typeof keys.auth !== 'string' ||
      keys.auth.length < 10 ||
      keys.auth.length > 120
    ) {
      return NextResponse.json(
        { error: 'Chaves criptográficas de subscrição inválidas.' },
        { status: 400, headers: corsHeaders }
      );
    }

    const rpcRes = await fetch(`${SUPABASE_URL}/rest/v1/rpc/push_subscribe`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        p_endpoint: endpoint.trim(),
        p_p256dh: keys.p256dh.trim(),
        p_auth: keys.auth.trim(),
        p_user_agent: typeof userAgent === 'string' ? userAgent.slice(0, 300) : '',
      }),
    });

    if (!rpcRes.ok) {
      const errText = await rpcRes.text();
      console.error('Erro na RPC push_subscribe:', errText);
      return NextResponse.json(
        { error: 'Falha ao registar dispositivo no servidor.' },
        { status: 500, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Dispositivo registado para avisos com sucesso.' },
      { status: 200, headers: corsHeaders }
    );
  } catch (err: unknown) {
    console.error('Erro em POST /api/push-subscribe:', err);
    return NextResponse.json(
      { error: 'Erro interno ao processar subscrição.' },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function DELETE(req: Request) {
  const corsHeaders = getCorsHeaders(req);
  try {
    if (!SUPABASE_ANON_KEY) {
      return NextResponse.json(
        { error: 'Configuração de servidor incompleta.' },
        { status: 500, headers: corsHeaders }
      );
    }

    const body = await req.json().catch(() => null);
    const { endpoint } = body || {};

    if (!endpoint || typeof endpoint !== 'string' || !isPushEndpointValido(endpoint)) {
      return NextResponse.json(
        { error: 'Endpoint de cancelamento inválido ou não suportado.' },
        { status: 400, headers: corsHeaders }
      );
    }

    const rpcRes = await fetch(`${SUPABASE_URL}/rest/v1/rpc/push_unsubscribe`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ p_endpoint: endpoint.trim() }),
    });

    if (!rpcRes.ok) {
      const errText = await rpcRes.text();
      console.error('Erro na RPC push_unsubscribe:', errText);
    }

    return NextResponse.json(
      { success: true, message: 'Subscrição cancelada com sucesso.' },
      { status: 200, headers: corsHeaders }
    );
  } catch (err: unknown) {
    console.error('Erro em DELETE /api/push-subscribe:', err);
    return NextResponse.json(
      { error: 'Erro interno ao remover subscrição.' },
      { status: 500, headers: corsHeaders }
    );
  }
}

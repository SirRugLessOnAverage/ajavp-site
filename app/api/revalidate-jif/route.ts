import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

const SECRET_TOKEN =
  process.env.REVALIDATE_SECRET_TOKEN ||
  'ajavp_jif_revalidate_secret_2026';

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
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

export async function OPTIONS(request: Request) {
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(request),
  });
}

export async function POST(request: Request) {
  const corsHeaders = getCorsHeaders(request);

  try {
    const authHeader = request.headers.get('authorization') || '';
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.slice(7).trim()
      : '';

    const url = new URL(request.url);
    const querySecret = url.searchParams.get('secret') || '';

    const tokenFornecido = token || querySecret;

    if (!tokenFornecido || tokenFornecido !== SECRET_TOKEN) {
      return NextResponse.json(
        { error: 'Não autorizado. Token de revalidação inválido ou ausente.' },
        { status: 401, headers: corsHeaders }
      );
    }

    // Revalidar as páginas do ecossistema JIF
    revalidatePath('/jif');
    revalidatePath('/jif/classificacao');
    revalidatePath('/jif/futsal');

    return NextResponse.json(
      {
        revalidated: true,
        rotas: ['/jif', '/jif/classificacao', '/jif/futsal'],
        timestamp: Date.now(),
        message: 'Cache de rotas JIF revalidado com sucesso!',
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Erro ao revalidar cache do site.';
    console.error('Erro na rota /api/revalidate-jif:', err);
    return NextResponse.json(
      { error: msg },
      { status: 500, headers: corsHeaders }
    );
  }
}


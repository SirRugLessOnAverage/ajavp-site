import { NextResponse } from 'next/server';
import {
  getRevalidateCorsHeaders,
  verifyRevalidateRequest,
  resolveRevalidatePaths,
  revalidateAllowedPaths,
} from '@/lib/revalidate';

export async function OPTIONS(request: Request) {
  return new NextResponse(null, {
    status: 204,
    headers: getRevalidateCorsHeaders(request),
  });
}

export async function POST(request: Request) {
  const corsHeaders = getRevalidateCorsHeaders(request);

  try {
    const auth = verifyRevalidateRequest(request);
    if (!auth.ok) {
      return NextResponse.json(
        { error: auth.error },
        { status: auth.status, headers: corsHeaders }
      );
    }

    let body: { scope?: string; paths?: unknown } = {};
    try {
      const text = await request.text();
      if (text.trim()) {
        body = JSON.parse(text) as { scope?: string; paths?: unknown };
      }
    } catch {
      return NextResponse.json(
        { error: 'Corpo JSON inválido.' },
        { status: 400, headers: corsHeaders }
      );
    }

    const rotas = revalidateAllowedPaths(resolveRevalidatePaths(body));

    return NextResponse.json(
      {
        revalidated: true,
        rotas,
        timestamp: Date.now(),
        message: 'Cache do site revalidado com sucesso!',
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Erro ao revalidar cache do site.';
    console.error('Erro na rota /api/revalidate-site:', err);
    return NextResponse.json(
      { error: msg },
      { status: 500, headers: corsHeaders }
    );
  }
}

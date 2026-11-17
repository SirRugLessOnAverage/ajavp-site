import { NextResponse } from 'next/server';
import {
  getRevalidateCorsHeaders,
  verifyRevalidateRequest,
  revalidateAllowedPaths,
  resolveRevalidatePaths,
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

    const rotas = revalidateAllowedPaths(resolveRevalidatePaths({ scope: 'jif' }));

    return NextResponse.json(
      {
        revalidated: true,
        rotas,
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

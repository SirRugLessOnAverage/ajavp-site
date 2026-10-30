import { NextResponse } from 'next/server';

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  'https://mudgnaajtolytggksvvq.supabase.co';

const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11ZGduYWFqdG9seXRnZ2tzdnZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIwNjAxODcsImV4cCI6MjEwNzYzNjE4N30.lL5jb84u0PUWH4BjQWdZ4uZLpGKybUuhGISGB9tvdIQ';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const { endpoint, keys, userAgent } = body || {};

    if (!endpoint || !keys?.p256dh || !keys?.auth) {
      return NextResponse.json(
        { error: 'Dados de subscrição inválidos.' },
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
        p_endpoint: endpoint,
        p_p256dh: keys.p256dh,
        p_auth: keys.auth,
        p_user_agent: (userAgent || '').slice(0, 300),
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
  try {
    const body = await req.json().catch(() => null);
    const { endpoint } = body || {};

    if (!endpoint) {
      return NextResponse.json(
        { error: 'Endpoint obrigatório para cancelamento.' },
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
      body: JSON.stringify({ p_endpoint: endpoint }),
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

import { NextResponse } from 'next/server';

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  'https://mudgnaajtolytggksvvq.supabase.co';

const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11ZGduYWFqdG9seXRnZ2tzdnZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIwNjAxODcsImV4cCI6MjEwNzYzNjE4N30.lL5jb84u0PUWH4BjQWdZ4uZLpGKybUuhGISGB9tvdIQ';

const MODALIDADES_VALIDAS = ['atletismo', 'ciclismo', 'ambos'] as const;
const ELEGIBILIDADES_VALIDAS = ['nasceu_vc', 'reside_vc', 'estuda_vc', 'nao_aplicavel'] as const;

type ModalidadeDiaAberto = (typeof MODALIDADES_VALIDAS)[number];
type ElegibilidadeJif = (typeof ELEGIBILIDADES_VALIDAS)[number];

function getCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get('origin') || '';
  const allowedOrigins = [
    'https://ajavp.pt',
    'https://www.ajavp.pt',
    'https://gestao.ajavp.pt',
    'https://ajavp.vercel.app',
    'https://ajavp-site.vercel.app',
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
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

interface DiaAbertoPayload {
  nomeJovem?: unknown;
  anoNascimento?: unknown;
  modalidade?: unknown;
  nomeEncarregado?: unknown;
  contacto?: unknown;
  elegibilidadeJif?: unknown;
  observacoes?: unknown;
  consentimentoRgpd?: unknown;
  website_url?: unknown;
}

export async function OPTIONS(req: Request) {
  return new NextResponse(null, { status: 200, headers: getCorsHeaders(req) });
}

export async function POST(req: Request) {
  const corsHeaders = getCorsHeaders(req);
  try {
    const body = (await req.json().catch(() => null)) as DiaAbertoPayload | null;
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Pedido inválido.' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Proteção honeypot contra bots
    if (typeof body.website_url === 'string' && body.website_url.trim().length > 0) {
      return NextResponse.json(
        { success: true },
        { status: 200, headers: corsHeaders }
      );
    }

    const nomeJovem = typeof body.nomeJovem === 'string' ? body.nomeJovem.trim() : '';
    const nomeEncarregado =
      typeof body.nomeEncarregado === 'string' ? body.nomeEncarregado.trim() : '';
    const contacto = typeof body.contacto === 'string' ? body.contacto.trim() : '';
    const observacoes =
      typeof body.observacoes === 'string' ? body.observacoes.trim().slice(0, 400) : null;
    const anoNascimento = Number(body.anoNascimento);
    const modalidade =
      typeof body.modalidade === 'string' ? body.modalidade.trim().toLowerCase() : '';
    const elegibilidadeJif =
      typeof body.elegibilidadeJif === 'string'
        ? body.elegibilidadeJif.trim().toLowerCase()
        : '';
    const consentimentoRgpd = body.consentimentoRgpd === true;

    if (nomeJovem.length < 2 || nomeJovem.length > 120) {
      return NextResponse.json(
        { error: 'Indica o nome do jovem atleta (mínimo 2 carateres).' },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!Number.isInteger(anoNascimento) || anoNascimento < 2005 || anoNascimento > 2023) {
      return NextResponse.json(
        { error: 'Seleciona um ano de nascimento válido (entre 2005 e 2023).' },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!(MODALIDADES_VALIDAS as readonly string[]).includes(modalidade)) {
      return NextResponse.json(
        { error: 'Seleciona uma modalidade válida (Atletismo, Ciclismo ou Ambos).' },
        { status: 400, headers: corsHeaders }
      );
    }

    if (nomeEncarregado.length < 2 || nomeEncarregado.length > 120) {
      return NextResponse.json(
        { error: 'Indica o nome do encarregado de educação.' },
        { status: 400, headers: corsHeaders }
      );
    }

    if (contacto.length < 6 || contacto.length > 120) {
      return NextResponse.json(
        { error: 'Indica um telemóvel ou email de contacto válido.' },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!(ELEGIBILIDADES_VALIDAS as readonly string[]).includes(elegibilidadeJif)) {
      return NextResponse.json(
        { error: 'Seleciona o enquadramento de elegibilidade nos JIF de Vila do Conde.' },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!consentimentoRgpd) {
      return NextResponse.json(
        { error: 'É necessário aceitar o consentimento RGPD para enviar a pré-inscrição.' },
        { status: 400, headers: corsHeaders }
      );
    }

    const rpcRes = await fetch(
      `${SUPABASE_URL}/rest/v1/rpc/registar_pre_inscricao_dia_aberto`,
      {
        method: 'POST',
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          p_nome_jovem: nomeJovem,
          p_ano_nascimento: anoNascimento,
          p_modalidade: modalidade as ModalidadeDiaAberto,
          p_nome_encarregado: nomeEncarregado,
          p_contacto: contacto,
          p_elegibilidade_jif: elegibilidadeJif as ElegibilidadeJif,
          p_observacoes: observacoes || null,
          p_consentimento_rgpd: true,
        }),
      }
    );

    if (!rpcRes.ok) {
      const errText = await rpcRes.text();
      console.error('Erro na RPC registar_pre_inscricao_dia_aberto:', errText);
      return NextResponse.json(
        { error: 'Não foi possível registar a pré-inscrição neste momento. Tenta novamente ou contacta via WhatsApp.' },
        { status: 500, headers: corsHeaders }
      );
    }

    const id = await rpcRes.json().catch(() => null);

    return NextResponse.json(
      {
        success: true,
        id,
        message: 'Pré-inscrição registada com sucesso! Entraremos em contacto assim que definirmos a data do Dia Aberto.',
      },
      { status: 201, headers: corsHeaders }
    );
  } catch (err: unknown) {
    console.error('Erro em POST /api/dia-aberto:', err);
    return NextResponse.json(
      { error: 'Erro interno ao processar a pré-inscrição.' },
      { status: 500, headers: corsHeaders }
    );
  }
}

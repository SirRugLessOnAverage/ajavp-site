// Vercel Serverless Function: /api/push-subscribe
// Guarda e atualiza subscrições de Web Push através da função RPC segura no Supabase

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://mudgnaajtolytggksvvq.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'DELETE') {
    try {
      const { endpoint } = req.body || {};
      if (!endpoint) {
        return res.status(400).json({ error: 'Endpoint obrigatório' });
      }

      await fetch(`${SUPABASE_URL}/rest/v1/rpc/push_unsubscribe`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ p_endpoint: endpoint })
      });

      return res.status(200).json({ success: true, message: 'Subscrição removida' });
    } catch (err) {
      console.error('Erro ao remover subscrição:', err);
      return res.status(500).json({ error: 'Erro interno ao remover' });
    }
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { endpoint, keys, userAgent } = req.body || {};

    if (!endpoint || !keys || !keys.p256dh || !keys.auth) {
      return res.status(400).json({ error: 'Dados de subscrição inválidos' });
    }

    const rpcRes = await fetch(`${SUPABASE_URL}/rest/v1/rpc/push_subscribe`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        p_endpoint: endpoint,
        p_p256dh: keys.p256dh,
        p_auth: keys.auth,
        p_user_agent: userAgent || req.headers['user-agent'] || ''
      })
    });

    if (!rpcRes.ok) {
      const errText = await rpcRes.text();
      console.error('Falha ao registar subscrição via RPC:', errText);
      return res.status(502).json({ error: 'Falha ao guardar no servidor' });
    }

    return res.status(200).json({ success: true, message: 'Subscrição guardada com sucesso' });
  } catch (error) {
    console.error('Erro ao processar subscrição:', error);
    return res.status(500).json({ error: 'Erro no servidor' });
  }
}

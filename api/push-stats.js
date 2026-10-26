// Vercel Serverless Function: /api/push-stats
// Devolve estatísticas de subscritores e histórico de notificações apenas com PIN válido da Direção

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://mudgnaajtolytggksvvq.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Admin-Pin');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const pin = req.headers['x-admin-pin'] || req.query.pin || (req.body && req.body.pin);

  if (!pin) {
    return res.status(401).json({ error: 'PIN de acesso obrigatório.' });
  }

  try {
    const rpcRes = await fetch(`${SUPABASE_URL}/rest/v1/rpc/push_admin_stats`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ p_pin: String(pin).trim() })
    });

    if (!rpcRes.ok) {
      const errText = await rpcRes.text();
      return res.status(400).json({ error: errText });
    }

    const data = await rpcRes.json();
    if (!data || !data.ok) {
      return res.status(401).json({ error: 'PIN incorreto. Acesso reservado à Direção da AJAVP.' });
    }

    return res.status(200).json({
      totalSubscribers: data.totalSubscribers || 0,
      notifications: data.notifications || []
    });
  } catch (err) {
    console.error('Erro ao ler estatísticas:', err);
    return res.status(500).json({ error: 'Erro ao obter estatísticas' });
  }
}

// Vercel Serverless Function: /api/push-stats
// Devolve estatísticas de subscritores e histórico de notificações

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://mudgnaajtolytggksvvq.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11ZGduYWFqdG9seXRnZ2tzdnZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIwNjAxODcsImV4cCI6MjEwNzYzNjE4N30.lL5jb84u0PUWH4BjQWdZ4uZLpGKybUuhGISGB9tvdIQ';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // 1. Contagem de subscritores
    const countRes = await fetch(`${SUPABASE_URL}/rest/v1/push_subscriptions?select=id`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Range': '0-0',
        'Prefer': 'count=exact'
      }
    });

    const contentRange = countRes.headers.get('content-range') || '';
    const totalSubscribers = contentRange.includes('/') ? parseInt(contentRange.split('/')[1], 10) || 0 : 0;

    // 2. Histórico recente de notificações
    const historyRes = await fetch(`${SUPABASE_URL}/rest/v1/push_notifications?order=created_at.desc&limit=10`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });

    const notifications = historyRes.ok ? await historyRes.json() : [];

    return res.status(200).json({
      totalSubscribers,
      notifications
    });
  } catch (err) {
    console.error('Erro ao ler estatísticas:', err);
    return res.status(500).json({ error: 'Erro ao obter estatísticas' });
  }
}

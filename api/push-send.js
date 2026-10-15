// Vercel Serverless Function: /api/push-send
// Envia notificações Web Push para todos os associados subscritos

import webpush from 'web-push';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://mudgnaajtolytggksvvq.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11ZGduYWFqdG9seXRnZ2tzdnZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIwNjAxODcsImV4cCI6MjEwNzYzNjE4N30.lL5jb84u0PUWH4BjQWdZ4uZLpGKybUuhGISGB9tvdIQ';

// Chaves VAPID oficiais da AJAVP
const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY || 'BPzVDb-o6o1Mia1g4etMbzgrsQHS048pfOThK9QzWpt4dShSzGZzxseqwfX7YSpd2VgwEVZIKbNYEYTMrop93QA';
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || 'ZZ8uPTA027iFkbUayXY3b-eD_Z5aohLcDBdTiMwwIjg';
const VAPID_SUBJECT = 'mailto:geralajavp@gmail.com';

webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

// Código PIN de autorização da Direção (NIF da associação ou PIN de segurança)
const VALID_PINS = ['519096045', 'ajavp2026', '2026'];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { pin, title, body, url } = req.body || {};

    // 1. Validar PIN da Direção
    if (!pin || !VALID_PINS.includes(String(pin).trim())) {
      return res.status(401).json({ error: 'PIN de segurança incorreto. Acesso reservado à Direção.' });
    }

    if (!title || !body) {
      return res.status(400).json({ error: 'Título e mensagem são obrigatórios.' });
    }

    // 2. Obter todas as subscrições ativas do Supabase
    const subRes = await fetch(`${SUPABASE_URL}/rest/v1/push_subscriptions?select=endpoint,p256dh,auth`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });

    if (!subRes.ok) {
      throw new Error(`Falha ao obter subscrições: ${await subRes.text()}`);
    }

    const subscriptions = await subRes.json();

    if (!subscriptions || subscriptions.length === 0) {
      return res.status(200).json({
        success: true,
        sent: 0,
        failed: 0,
        message: 'Ainda não existem associados subscritos para receber notificações.'
      });
    }

    // 3. Montar o payload da notificação
    const notificationPayload = JSON.stringify({
      title: title.trim(),
      body: body.trim(),
      url: url || '/',
      icon: '/assets/icons/icon-192.png',
      badge: '/assets/icons/icon-192.png',
      timestamp: Date.now()
    });

    // 4. Disparar notificações em paralelo
    const deadEndpoints = [];
    let sentCount = 0;
    let failedCount = 0;

    await Promise.allSettled(
      subscriptions.map(async (sub) => {
        const pushSubscription = {
          endpoint: sub.endpoint,
          keys: {
            p256dh: sub.p256dh,
            auth: sub.auth
          }
        };

        try {
          await webpush.sendNotification(pushSubscription, notificationPayload);
          sentCount++;
        } catch (err) {
          failedCount++;
          // Se o endpoint expirou ou foi cancelado (410 Gone ou 404 Not Found)
          if (err.statusCode === 410 || err.statusCode === 404) {
            deadEndpoints.push(sub.endpoint);
          }
        }
      })
    );

    // 5. Limpar subscrições expiradas no Supabase
    if (deadEndpoints.length > 0) {
      for (const endpoint of deadEndpoints) {
        fetch(`${SUPABASE_URL}/rest/v1/push_subscriptions?endpoint=eq.${encodeURIComponent(endpoint)}`, {
          method: 'DELETE',
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
          }
        }).catch(() => {});
      }
    }

    // 6. Registar envio no histórico de notificações
    await fetch(`${SUPABASE_URL}/rest/v1/push_notifications`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title.trim(),
        body: body.trim(),
        url: url || '/',
        sent_count: sentCount
      })
    }).catch((e) => console.warn('Erro ao registar histórico:', e));

    return res.status(200).json({
      success: true,
      sent: sentCount,
      failed: failedCount,
      cleaned: deadEndpoints.length,
      totalSubscribers: subscriptions.length
    });
  } catch (error) {
    console.error('Erro no envio de push notifications:', error);
    return res.status(500).json({ error: error.message || 'Erro ao enviar notificações' });
  }
}

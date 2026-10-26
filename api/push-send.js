// Vercel Serverless Function: /api/push-send
// Envia notificações Web Push oficiais da AJAVP com validação criptográfica de PIN e chaves seguras

import webpush from 'web-push';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://mudgnaajtolytggksvvq.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const VAPID_SUBJECT = process.env.VAPID_SUBJECT || 'mailto:geralajavp@gmail.com';

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

    if (!pin) {
      return res.status(401).json({ error: 'PIN de segurança obrigatório.' });
    }

    if (!title || !body) {
      return res.status(400).json({ error: 'Título e mensagem são obrigatórios.' });
    }

    const cleanPin = String(pin).trim();

    // 1. Obter contexto seguro da base de dados (só devolve chaves e subscrições se o PIN for válido)
    const ctxRes = await fetch(`${SUPABASE_URL}/rest/v1/rpc/push_admin_context`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ p_pin: cleanPin })
    });

    if (!ctxRes.ok) {
      const errText = await ctxRes.text();
      return res.status(400).json({ error: errText });
    }

    const ctx = await ctxRes.json();

    if (!ctx || !ctx.ok) {
      return res.status(401).json({
        error: 'PIN de segurança incorreto ou bloqueado. Acesso reservado à Direção da AJAVP.'
      });
    }

    const { vapidPublic, vapidPrivate, subscriptions } = ctx;

    if (!vapidPublic || !vapidPrivate) {
      return res.status(500).json({ error: 'Chaves de envio não configuradas no sistema seguro.' });
    }

    webpush.setVapidDetails(VAPID_SUBJECT, vapidPublic, vapidPrivate);

    if (!subscriptions || subscriptions.length === 0) {
      return res.status(200).json({
        success: true,
        sent: 0,
        failed: 0,
        message: 'Ainda não existem associados subscritos para receber notificações.'
      });
    }

    // 2. Montar payload do aviso
    const notificationPayload = JSON.stringify({
      title: title.trim(),
      body: body.trim(),
      url: url || '/',
      icon: '/assets/icons/icon-192.png',
      badge: '/assets/icons/icon-192.png',
      timestamp: Date.now()
    });

    // 3. Disparar notificações em paralelo
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
          if (err.statusCode === 410 || err.statusCode === 404) {
            deadEndpoints.push(sub.endpoint);
          }
        }
      })
    );

    // 4. Registar envio e limpar endpoints expirados de forma segura
    await fetch(`${SUPABASE_URL}/rest/v1/rpc/push_admin_log`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        p_pin: cleanPin,
        p_title: title.trim(),
        p_body: body.trim(),
        p_url: url || '/',
        p_sent: sentCount,
        p_dead_endpoints: deadEndpoints
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

// Vercel Serverless Function: /api/instagram
// Obtém seguidores e contagem de publicações do @ajavp.javip em tempo real

export default async function handler(req, res) {
  // Configurar cabeçalhos CORS e Cache na CDN da Vercel
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  // Cache na CDN da Vercel durante 1 hora (3600s), permitindo servir conteúdo em cache enquanto revalida
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');

  const INSTAGRAM_USERNAME = 'ajavp.javip';
  const PROFILE_URL = `https://www.instagram.com/${INSTAGRAM_USERNAME}/`;

  try {
    const response = await fetch(PROFILE_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      // Timeout de 10s
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      throw new Error(`Instagram respondeu com status ${response.status}`);
    }

    const html = await response.text();

    let followersStr = null;
    let followingStr = null;
    let postsStr = null;

    // 1. Padrão Inglês: "345 Followers, 18 Following, 411 Posts"
    const mEn = html.match(/([0-9,.KkMm]+)\s+Followers,\s+([0-9,.KkMm]+)\s+Following,\s+([0-9,.KkMm]+)\s+Posts/i);
    if (mEn) {
      followersStr = mEn[1];
      followingStr = mEn[2];
      postsStr = mEn[3];
    }

    // 2. Padrão Português: "345 seguidores, A seguir 18, 411 publicações"
    if (!followersStr) {
      const mPt = html.match(/([0-9,.KkMm]+)\s+seguidores,\s*(?:[Aa]\s*seguir\s*)?([0-9,.KkMm]+)[^,]*,\s*([0-9,.KkMm]+)\s*publica/i);
      if (mPt) {
        followersStr = mPt[1];
        followingStr = mPt[2];
        postsStr = mPt[3];
      }
    }

    // 3. Padrão Genérico por meta description
    if (!followersStr) {
      const mDesc = html.match(/<meta[^>]+(?:description|og:description)[^>]+content="([^"]+)"/i);
      if (mDesc) {
        const nums = mDesc[1].match(/\b([0-9]+(?:[.,][0-9]+)?)\b/g);
        if (nums && nums.length >= 3) {
          followersStr = nums[0];
          followingStr = nums[1];
          postsStr = nums[2];
        }
      }
    }

    if (!followersStr || !postsStr) {
      const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
      const title = titleMatch ? titleMatch[1] : 'Sem título';
      const metaDesc = html.match(/<meta[^>]+(?:description|og:description)[^>]+content="([^"]*)"/i);
      const desc = metaDesc ? metaDesc[1] : 'Sem meta desc';
      throw new Error(`Extração falhou. Title: [${title}], Desc: [${desc}], HTML preview: ${html.slice(0, 200)}`);
    }

    const followers = followersStr.replace(/[,.]/g, '').trim();
    const following = followingStr ? followingStr.replace(/[,.]/g, '').trim() : '0';
    const posts = postsStr.replace(/[,.]/g, '').trim();

    // Extrair bio se disponível
    const bioMatch = html.match(/on Instagram:\s*&quot;(.*?)&quot;/);
    const bio = bioMatch ? bioMatch[1] : 'Voltar a dinamizar a freguesia de Vilar do Pinheiro.';

    return res.status(200).json({
      success: true,
      username: INSTAGRAM_USERNAME,
      followers: followers,
      following: following,
      posts: posts,
      bio: bio,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Erro na Vercel Serverless Function /api/instagram:', error);

    // Fallback gracioso com valores de segurança para nunca quebrar o frontend
    return res.status(200).json({
      success: false,
      fallback: true,
      username: INSTAGRAM_USERNAME,
      followers: '345',
      posts: '411',
      error: error.message,
      updatedAt: new Date().toISOString(),
    });
  }
}

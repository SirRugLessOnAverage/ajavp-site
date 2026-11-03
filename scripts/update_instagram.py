#!/usr/bin/env python3
"""Atualizador diário das métricas e publicações recentes da AJAVP no Instagram."""

import sys
import os
import re
import json
import urllib.request
import urllib.parse
import datetime
from pathlib import Path

INSTAGRAM_USERNAME = "ajavp.javip"
PROFILE_URL = f"https://www.instagram.com/{INSTAGRAM_USERNAME}/"
GRAPH_API_VERSION = os.environ.get("INSTAGRAM_GRAPH_API_VERSION", "v23.0")
MEDIA_FIELDS = "id,caption,media_type,media_url,permalink,timestamp"
MAX_MEDIA_POSTS = 12

# Root do projeto
ROOT_DIR = Path(__file__).resolve().parent.parent
INDEX_HTML = ROOT_DIR / "index.html"
DATA_FILE = ROOT_DIR / "data" / "instagram.json"
MEDIA_FILE = ROOT_DIR / "data" / "instagram-media.json"


def fetch_instagram_meta():
    """Obtém as métricas do perfil via OpenGraph com User-Agent de bot permitido."""
    headers = {
        "User-Agent": "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
    }
    req = urllib.request.Request(PROFILE_URL, headers=headers)
    with urllib.request.urlopen(req, timeout=15) as resp:
        html = resp.read().decode("utf-8", errors="ignore")

    followers_str = None
    following_str = None
    posts_str = None

    # 1. Padrão Inglês: "345 Followers, 18 Following, 411 Posts"
    m_en = re.search(
        r"([0-9,.KkMm]+)\s+Followers,\s+([0-9,.KkMm]+)\s+Following,\s+([0-9,.KkMm]+)\s+Posts",
        html,
        re.IGNORECASE,
    )
    if m_en:
        followers_str, following_str, posts_str = m_en.group(1), m_en.group(2), m_en.group(3)

    # 2. Padrão Português: "345 seguidores, A seguir 18, 411 publicações"
    if not followers_str:
        m_pt = re.search(
            r"([0-9,.KkMm]+)\s+seguidores,\s*(?:[Aa]\s*seguir\s*)?([0-9,.KkMm]+)[^,]*,\s*([0-9,.KkMm]+)\s*publica",
            html,
            re.IGNORECASE,
        )
        if m_pt:
            followers_str, following_str, posts_str = m_pt.group(1), m_pt.group(2), m_pt.group(3)

    # 3. Padrão Genérico por meta description
    if not followers_str:
        m_desc = re.search(r'<meta[^>]+(?:description|og:description)[^>]+content="([^"]+)"', html, re.IGNORECASE)
        if m_desc:
            content = m_desc.group(1)
            nums = re.findall(r"\b([0-9]+(?:[.,][0-9]+)?)\b", content)
            if len(nums) >= 3:
                followers_str, following_str, posts_str = nums[0], nums[1], nums[2]

    if not followers_str or not posts_str:
        raise ValueError("Não foi possível extrair os dados do Instagram a partir dos metadados recebidos.")

    followers_clean = followers_str.replace(",", "").replace(".", "").strip()
    following_clean = following_str.replace(",", "").replace(".", "").strip() if following_str else "0"
    posts_clean = posts_str.replace(",", "").replace(".", "").strip()

    # Tenta extrair a bio
    bio_match = re.search(r"on Instagram:\s*&quot;(.*?)&quot;", html)
    bio = bio_match.group(1) if bio_match else "Voltar a dinamizar a freguesia de Vilar do Pinheiro."

    return {
        "username": INSTAGRAM_USERNAME,
        "followers": followers_clean,
        "following": following_clean,
        "posts": posts_clean,
        "bio": bio,
        "last_updated": datetime.datetime.now().astimezone().isoformat(),
    }


def parse_instagram_media(payload, limit=MAX_MEDIA_POSTS):
    """Filtra imagens e carrosséis recentes com URLs HTTPS válidos."""
    data = payload.get("data")
    if not isinstance(data, list):
        raise ValueError("A resposta da API do Instagram não contém uma lista de publicações.")

    posts = []
    for item in data:
        if not isinstance(item, dict):
            continue

        media_type = item.get("media_type")
        media_id = item.get("id")
        media_url = item.get("media_url")
        permalink = item.get("permalink")
        timestamp = item.get("timestamp")
        if not all(
            isinstance(value, str) and value
            for value in (media_id, media_url, permalink, timestamp)
        ):
            continue
        media_host = urllib.parse.urlparse(media_url or "")
        post_url = urllib.parse.urlparse(permalink or "")

        if media_type not in ("IMAGE", "CAROUSEL_ALBUM"):
            continue
        if media_host.scheme != "https" or not media_host.hostname:
            continue
        if not (
            media_host.hostname.endswith(".cdninstagram.com")
            or media_host.hostname.endswith(".fbcdn.net")
        ):
            continue
        if (
            post_url.scheme != "https"
            or post_url.hostname not in ("instagram.com", "www.instagram.com")
            or not re.match(r"^/(p|reel|tv)/[A-Za-z0-9_-]+/?$", post_url.path)
        ):
            continue
        posts.append(
            {
                "id": media_id,
                "caption": str(item.get("caption", ""))[:2200],
                "media_type": media_type,
                "media_url": media_url,
                "permalink": permalink,
                "timestamp": timestamp,
            }
        )

        if len(posts) >= limit:
            break

    return posts


def fetch_instagram_media(user_id, access_token, api_version=GRAPH_API_VERSION):
    """Obtém publicações recentes pela API oficial do Instagram Graph."""
    if not re.fullmatch(r"\d+", user_id):
        raise ValueError("INSTAGRAM_USER_ID deve conter apenas algarismos.")
    if not re.fullmatch(r"v\d+\.\d+", api_version):
        raise ValueError("INSTAGRAM_GRAPH_API_VERSION inválida.")

    query = urllib.parse.urlencode({"fields": MEDIA_FIELDS, "limit": 50})
    url = f"https://graph.facebook.com/{api_version}/{user_id}/media?{query}"
    request = urllib.request.Request(
        url,
        headers={
            "Authorization": f"Bearer {access_token}",
            "Accept": "application/json",
            "User-Agent": "AJAVP-Instagram-Gallery/1.0",
        },
    )

    with urllib.request.urlopen(request, timeout=20) as response:
        payload = json.loads(response.read().decode("utf-8"))

    if not isinstance(payload, dict):
        raise ValueError("A API do Instagram devolveu uma resposta inválida.")
    if payload.get("error"):
        error = payload["error"]
        message = error.get("message", "erro desconhecido") if isinstance(error, dict) else "erro desconhecido"
        raise RuntimeError(f"Falha na API do Instagram: {message}")

    return parse_instagram_media(payload)


def write_json_if_changed(path, data):
    """Guarda JSON apenas quando o conteúdo foi alterado."""
    path.parent.mkdir(parents=True, exist_ok=True)
    serialized = json.dumps(data, ensure_ascii=False, indent=2) + "\n"
    if path.exists() and path.read_text(encoding="utf-8") == serialized:
        return False
    path.write_text(serialized, encoding="utf-8")
    return True


def format_pt_number(val_str):
    """Formata strings numéricas para o padrão português com ponto de milhar se aplicável."""
    try:
        val = int(val_str)
        return f"{val:,}".replace(",", ".")
    except ValueError:
        return val_str


def update_project(data):
    """Atualiza o ficheiro data/instagram.json e o ficheiro index.html."""
    write_json_if_changed(DATA_FILE, data)
    print(f"-> Dados guardados em {DATA_FILE}")

    if not INDEX_HTML.exists():
        print(f"Aviso: {INDEX_HTML} não encontrado.")
        return False

    with open(INDEX_HTML, "r", encoding="utf-8") as f:
        html = f.read()

    followers_fmt = format_pt_number(data["followers"])
    posts_fmt = format_pt_number(data["posts"])

    old_html = html

    # 1. Padrão com IDs específicos (id="igPostsCount" e id="igFollowersCount")
    html = re.sub(
        r'(<strong[^>]*id=["\']igPostsCount["\'][^>]*>)([^<]*)(</strong>)',
        rf"\g<1>{posts_fmt}\g<3>",
        html,
    )
    html = re.sub(
        r'(<strong[^>]*id=["\']igFollowersCount["\'][^>]*>)([^<]*)(</strong>)',
        rf"\g<1>{followers_fmt}\g<3>",
        html,
    )

    # 2. Padrão genérico por texto (publicações / seguidores)
    html = re.sub(
        r'(<div><strong[^>]*>)([^<]*)(</strong>\s*publicações</div>)',
        rf"\g<1>{posts_fmt}\g<3>",
        html,
    )
    html = re.sub(
        r'(<div><strong[^>]*>)([^<]*)(</strong>\s*seguidores</div>)',
        rf"\g<1>{followers_fmt}\g<3>",
        html,
    )

    if html != old_html:
        with open(INDEX_HTML, "w", encoding="utf-8") as f:
            f.write(html)
        print(f"-> {INDEX_HTML} atualizado com sucesso! (Publicações: {posts_fmt}, Seguidores: {followers_fmt})")
        return True
    else:
        print(f"-> {INDEX_HTML} já se encontrava com os valores atualizados ({posts_fmt} posts, {followers_fmt} seguidores).")
        return False


def main():
    print(f"A verificar Instagram @{INSTAGRAM_USERNAME}...")
    access_token = os.environ.get("INSTAGRAM_ACCESS_TOKEN", "").strip()
    user_id = os.environ.get("INSTAGRAM_USER_ID", "").strip()

    try:
        metrics = None
        try:
            metrics = fetch_instagram_meta()
            print(
                f"Métricas obtidas: {metrics['posts']} publicações, "
                f"{metrics['followers']} seguidores, {metrics['following']} a seguir."
            )
        except Exception as error:
            print(f"Aviso: não foi possível atualizar as métricas do perfil: {error}", file=sys.stderr)

        if bool(access_token) != bool(user_id):
            raise ValueError(
                "Configure ambos os secrets INSTAGRAM_ACCESS_TOKEN e INSTAGRAM_USER_ID "
                "para ativar a atualização do feed."
            )

        media_posts = None
        if access_token and user_id:
            media_posts = fetch_instagram_media(user_id, access_token)
            print(f"Publicações de imagem obtidas pela API oficial: {len(media_posts)}.")
        else:
            print(
                "Feed automático não configurado; mantêm-se os destaques da galeria. "
                "Configure os secrets INSTAGRAM_ACCESS_TOKEN e INSTAGRAM_USER_ID."
            )

        if metrics:
            update_project(metrics)

        if media_posts is not None:
            feed = {
                "username": INSTAGRAM_USERNAME,
                "updated_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
                "posts": media_posts,
            }
            write_json_if_changed(MEDIA_FILE, feed)
            print(f"-> Feed guardado em {MEDIA_FILE}")
    except Exception as e:
        print(f"Erro ao atualizar Instagram: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()

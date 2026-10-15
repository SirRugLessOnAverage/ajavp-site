#!/usr/bin/env python3
"""
AJAVP - Atualizador Automático do Feed e Estatísticas do Instagram
Obtém métricas em tempo real de seguidores e publicações do perfil oficial @ajavp.javip
e atualiza diretamente o index.html e data/instagram.json.
"""

import sys
import os
import re
import json
import urllib.request
import datetime
from pathlib import Path

INSTAGRAM_USERNAME = "ajavp.javip"
PROFILE_URL = f"https://www.instagram.com/{INSTAGRAM_USERNAME}/"

# Root do projeto
ROOT_DIR = Path(__file__).resolve().parent.parent
INDEX_HTML = ROOT_DIR / "index.html"
DATA_FILE = ROOT_DIR / "data" / "instagram.json"


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


def format_pt_number(val_str):
    """Formata strings numéricas para o padrão português com ponto de milhar se aplicável."""
    try:
        val = int(val_str)
        return f"{val:,}".replace(",", ".")
    except ValueError:
        return val_str


def update_project(data):
    """Atualiza o ficheiro data/instagram.json e o ficheiro index.html."""
    DATA_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
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
    try:
        data = fetch_instagram_meta()
        print(f"Métricas obtidas: {data['posts']} publicações, {data['followers']} seguidores, {data['following']} a seguir.")
        changed = update_project(data)
        if changed:
            print("Atualização concluída com sucesso!")
        else:
            print("Sem alterações no HTML.")
    except Exception as e:
        print(f"Erro ao atualizar Instagram: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()

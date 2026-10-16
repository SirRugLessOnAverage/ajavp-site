"""
Script para atualizar OpenGraph, Twitter Cards e atributos de imagem nos ficheiros HTML da AJAVP
"""

import os
import re

files = ['index.html', 'jif.html', 'modalidades.html', 'clube.html', 'multimedia.html', 'contactos.html']

for fn in files:
    if not os.path.exists(fn):
        continue

    with open(fn, 'r', encoding='utf-8') as f:
        c = f.read()

    # 1. Substituir og:image (de icon-512 para o banner retangular og-share.jpg)
    old_og_pattern = re.compile(
        r'<meta property="og:image" content="https://ajavp-site\.vercel\.app/assets/icons/icon-512\.png">\s*'
        r'<meta property="og:image:width" content="512">\s*'
        r'<meta property="og:image:height" content="512">',
        re.MULTILINE
    )
    new_og = (
        '<meta property="og:image" content="https://ajavp-site.vercel.app/assets/images/og-share.jpg">\n'
        '  <meta property="og:image:width" content="1200">\n'
        '  <meta property="og:image:height" content="630">\n'
        '  <meta property="og:image:alt" content="AJAVP • Associação Jovens e Adultos de Vilar do Pinheiro">'
    )
    c = old_og_pattern.sub(new_og, c)

    # 2. Twitter card para summary_large_image
    c = c.replace('<meta name="twitter:card" content="summary">', '<meta name="twitter:card" content="summary_large_image">')
    c = c.replace(
        '<meta name="twitter:image" content="https://ajavp-site.vercel.app/assets/icons/icon-512.png">',
        '<meta name="twitter:image" content="https://ajavp-site.vercel.app/assets/images/og-share.jpg">'
    )

    # 3. Adicionar lazy loading na imagem de união em contactos.html
    if fn == 'contactos.html':
        c = c.replace(
            '<img src="assets/images/galeria/contactos_uniao_equipa.jpg" alt="União e Espírito de Equipa AJAVP" class="w-full h-full object-cover object-[center_35%] opacity-40 dark:opacity-75">',
            '<img loading="lazy" decoding="async" src="assets/images/galeria/contactos_uniao_equipa.jpg" alt="União e Espírito de Equipa AJAVP" class="w-full h-full object-cover object-[center_35%] opacity-40 dark:opacity-75">'
        )

    # 4. Adicionar decoding="async" nas imagens de fundo hero
    if fn == 'index.html':
        c = c.replace(
            '<img src="assets/images/galeria/prova_25_abril_2025_grupo.jpg" alt="Comitiva AJAVP na Prova do 25 de Abril em Vila do Conde" class="w-full h-full object-cover object-[center_35%] opacity-40 dark:opacity-75">',
            '<img fetchpriority="high" decoding="async" src="assets/images/galeria/prova_25_abril_2025_grupo.jpg" alt="Comitiva AJAVP na Prova do 25 de Abril em Vila do Conde" class="w-full h-full object-cover object-[center_35%] opacity-40 dark:opacity-75">'
        )
        c = c.replace(
            '<img src="assets/images/logo.png" alt="AJAVP Instagram Avatar" class="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover bg-white">',
            '<img loading="lazy" decoding="async" src="assets/images/logo.png" alt="AJAVP Instagram Avatar" class="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover bg-white">'
        )

    if fn == 'jif.html':
        c = c.replace(
            '<img src="assets/images/galeria/corta_mato_equipa_2026.jpg" alt="Comitiva AJAVP Corta-Mato" class="w-full h-full object-cover object-[center_35%] opacity-40 dark:opacity-75">',
            '<img fetchpriority="high" decoding="async" src="assets/images/galeria/corta_mato_equipa_2026.jpg" alt="Comitiva AJAVP Corta-Mato" class="w-full h-full object-cover object-[center_35%] opacity-40 dark:opacity-75">'
        )

    with open(fn, 'w', encoding='utf-8') as f:
        f.write(c)

print('Metatags OpenGraph, Twitter Cards e atributos de imagem atualizados em todas as páginas!')

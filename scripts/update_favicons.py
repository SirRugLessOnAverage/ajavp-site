"""
Script para atualizar os favicons de alto contraste (preto no branco) em todos os ficheiros HTML com cache-buster ?v=7
"""

import os
import re

html_files = [
    'index.html',
    'jif.html',
    'modalidades.html',
    'clube.html',
    'multimedia.html',
    'contactos.html',
    'admin-alertas.html'
]

new_favicon_tags = (
    '  <link rel="icon" type="image/x-icon" href="/favicon.ico">\n'
    '  <link rel="icon" type="image/png" sizes="32x32" href="assets/icons/favicon-32.png?v=7">\n'
    '  <link rel="icon" type="image/png" sizes="192x192" href="assets/icons/icon-192.png?v=7">\n'
    '  <link rel="apple-touch-icon" href="assets/icons/apple-touch-icon.png?v=7">'
)

for fn in html_files:
    if not os.path.exists(fn):
        continue

    with open(fn, 'r', encoding='utf-8') as f:
        c = f.read()

    # Caso 1: admin-alertas.html ou similar com apenas um favicon-32.png
    if '  <link rel="icon" type="image/png" sizes="32x32" href="assets/icons/favicon-32.png">\n' in c:
        c = c.replace(
            '  <link rel="icon" type="image/png" sizes="32x32" href="assets/icons/favicon-32.png">\n',
            new_favicon_tags + '\n'
        )

    # Caso 2: Ficheiros com tags v6 completas
    old_tags_v6 = (
        '  <link rel="icon" type="image/x-icon" href="/favicon.ico">\n'
        '  <link rel="icon" type="image/png" sizes="32x32" href="assets/icons/favicon-32.png?v=6">\n'
        '  <link rel="icon" type="image/png" sizes="192x192" href="assets/icons/icon-192.png?v=6">\n'
        '  <link rel="apple-touch-icon" href="assets/icons/apple-touch-icon.png?v=6">'
    )
    if old_tags_v6 in c:
        c = c.replace(old_tags_v6, new_favicon_tags)

    # Caso 3: Substituir qualquer ?v=6 remanescente nas tags de ícones
    c = c.replace('favicon-32.png?v=6', 'favicon-32.png?v=7')
    c = c.replace('icon-192.png?v=6', 'icon-192.png?v=7')
    c = c.replace('apple-touch-icon.png?v=6', 'apple-touch-icon.png?v=7')

    with open(fn, 'w', encoding='utf-8') as f:
        f.write(c)
    print(f"Atualizado: {fn}")

print("Todos os ficheiros HTML foram atualizados para os favicons v7 (preto no branco)!")

"""
Script para atualizar os favicons de alto contraste (branco no preto) em todos os ficheiros HTML
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

old_pattern = re.compile(
    r'(<link rel="icon"[^>]+>\s*)+(<link rel="apple-touch-icon"[^>]+>)?',
    re.MULTILINE
)

new_favicon_tags = (
    '  <link rel="icon" type="image/x-icon" href="/favicon.ico">\n'
    '  <link rel="icon" type="image/png" sizes="32x32" href="assets/icons/favicon-32.png?v=6">\n'
    '  <link rel="icon" type="image/png" sizes="192x192" href="assets/icons/icon-192.png?v=6">\n'
    '  <link rel="apple-touch-icon" href="assets/icons/apple-touch-icon.png?v=6">'
)

for fn in html_files:
    if not os.path.exists(fn):
        continue

    with open(fn, 'r', encoding='utf-8') as f:
        c = f.read()

    # Se já tiver link rel="icon", substituir de forma limpa
    if 'rel="icon"' in c:
        # Substituir os blocos de favicon
        c = re.sub(
            r'  <link rel="icon" type="image/png" sizes="32x32" href="[^"]+">\s*'
            r'<link rel="icon" type="image/png" sizes="192x192" href="[^"]+">',
            new_favicon_tags,
            c
        )
        # Se houver link apple-touch-icon duplicado, atualizar
        c = re.sub(
            r'<link rel="apple-touch-icon" href="assets/icons/apple-touch-icon\.png">',
            '<link rel="apple-touch-icon" href="assets/icons/apple-touch-icon.png?v=6">',
            c
        )

    with open(fn, 'w', encoding='utf-8') as f:
        f.write(c)

print('Todos os ficheiros HTML atualizados com o favicon de alto contraste (branco no preto)!')

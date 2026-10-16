"""
Script de Otimização de Imagens e Criação de Banner OpenGraph para a AJAVP
Reduz o peso total do site de ~17 MB para ~5 MB mantendo alta definição.
"""

import os
from PIL import Image, ImageDraw, ImageFont

def create_og_banner():
    w, h = 1200, 630
    img = Image.new('RGB', (w, h), color=(12, 25, 44))
    draw = ImageDraw.Draw(img)

    # Gradiente vertical suave de fundo
    for y in range(h):
        factor = y / h
        r = int(10 + 10 * factor)
        g = int(20 + 25 * factor)
        b = int(40 + 30 * factor)
        draw.line([(0, y), (w, y)], fill=(r, g, b))

    # Faixas decorativas
    draw.rectangle([(0, 0), (w, 10)], fill=(16, 185, 129))  # emerald
    draw.rectangle([(0, h - 8), (w, h)], fill=(245, 158, 11))  # amber

    # Círculo branco com aro verde para o emblema
    draw.ellipse([(80, 145), (440, 505)], fill=(255, 255, 255))
    draw.ellipse([(75, 140), (445, 510)], outline=(16, 185, 129), width=5)

    logo_path = 'assets/images/logo.png'
    if os.path.exists(logo_path):
        logo = Image.open(logo_path).convert('RGBA')
        logo = logo.resize((320, 325), Image.Resampling.LANCZOS)
        img.paste(logo, (100, 162), logo)

    # Carregar fontes
    windir = os.environ.get('WINDIR', 'C:\\Windows')
    font_bold = os.path.join(windir, 'Fonts', 'arialbd.ttf')
    font_reg = os.path.join(windir, 'Fonts', 'arial.ttf')
    font_it = os.path.join(windir, 'Fonts', 'ariali.ttf')

    try:
        f_badge = ImageFont.truetype(font_bold, 20)
        f_title = ImageFont.truetype(font_bold, 72)
        f_sub = ImageFont.truetype(font_bold, 30)
        f_motto = ImageFont.truetype(font_it, 25)
        f_tag = ImageFont.truetype(font_bold, 21)
    except Exception:
        f_badge = f_title = f_sub = f_motto = f_tag = ImageFont.load_default()

    x = 490
    # Badge oficial
    draw.rounded_rectangle([(x, 130), (x + 390, 172)], radius=12, fill=(16, 185, 129))
    draw.text((x + 18, 140), 'CANAL OFICIAL • ÉPOCA 2026/27', fill=(255, 255, 255), font=f_badge)

    # Título
    draw.text((x, 195), 'AJAVP', fill=(255, 255, 255), font=f_title)

    # Subtítulo
    draw.text((x, 280), 'Associação Jovens e Adultos\nde Vilar do Pinheiro', fill=(226, 232, 240), font=f_sub)

    # Lema
    draw.text((x, 375), '"A Tua Terra Tem Futuro" • Vila do Conde', fill=(251, 191, 36), font=f_motto)

    # Badges de modalidades
    tags = ['Futsal', 'Atletismo', 'Ténis de Mesa', 'Duatlo', 'XL JIF']
    curr_x = x
    for t in tags:
        tw = int(draw.textlength(t, font=f_tag)) if hasattr(draw, 'textlength') else len(t) * 13
        badge_w = tw + 28
        draw.rounded_rectangle([(curr_x, 435), (curr_x + badge_w, 478)], radius=12, fill=(30, 41, 59), outline=(16, 185, 129), width=2)
        draw.text((curr_x + 14, 446), t, fill=(255, 255, 255), font=f_tag)
        curr_x += badge_w + 12

    out_path = 'assets/images/og-share.jpg'
    img.save(out_path, format='JPEG', quality=90, optimize=True)
    print(f'[OK] Banner de partilha criado: {out_path} ({os.path.getsize(out_path)/1024:.1f} KB)')


def optimize_logo():
    logo_path = 'assets/images/logo.png'
    if not os.path.exists(logo_path):
        return
    old_sz = os.path.getsize(logo_path)
    im = Image.open(logo_path).convert('RGBA')

    # Redimensionar para 512x520 (resolução perfeita para ecrãs retina/4k de telemóveis e desktop)
    im_resized = im.resize((512, 520), Image.Resampling.LANCZOS)
    im_resized.save(logo_path, format='PNG', optimize=True)
    new_sz = os.path.getsize(logo_path)
    print(f'[OK] logo.png otimizado: {old_sz/1024:.1f} KB -> {new_sz/1024:.1f} KB (poupados {(old_sz-new_sz)/1024:.1f} KB)')


def optimize_all_images():
    total_before = 0
    total_after = 0
    count = 0

    for root, dirs, files in os.walk('assets/images'):
        for f in files:
            ext = os.path.splitext(f)[1].lower()
            if ext in ('.jpg', '.jpeg') and f != 'og-share.jpg':
                p = os.path.join(root, f)
                old_sz = os.path.getsize(p)
                total_before += old_sz

                try:
                    im = Image.open(p)
                    # Se tiver mais de 1600px na maior dimensão, redimensionar mantendo proporções
                    max_dim = max(im.size)
                    if max_dim > 1600:
                        scale = 1600.0 / max_dim
                        new_size = (int(im.size[0] * scale), int(im.size[1] * scale))
                        im = im.resize(new_size, Image.Resampling.LANCZOS)

                    # Se o modo for RGBA num JPEG, converter para RGB
                    if im.mode != 'RGB':
                        im = im.convert('RGB')

                    # Guardar como JPEG progressivo otimizado
                    im.save(p, format='JPEG', quality=83, optimize=True, progressive=True)
                    new_sz = os.path.getsize(p)
                    total_after += new_sz
                    count += 1
                except Exception as e:
                    print(f'Erro em {p}: {e}')
                    total_after += old_sz

    print(f'[OK] {count} fotos otimizadas.')
    print(f'     Antes:  {total_before / (1024*1024):.2f} MB')
    print(f'     Depois: {total_after / (1024*1024):.2f} MB')
    print(f'     Redução total: {(total_before - total_after) / (1024*1024):.2f} MB ({100 - (total_after/total_before*100):.1f}%)')


if __name__ == '__main__':
    create_og_banner()
    optimize_logo()
    optimize_all_images()

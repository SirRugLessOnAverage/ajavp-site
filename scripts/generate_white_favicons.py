"""
Gera o pacote completo de favicons com o emblema AJAVP a preto num fundo branco de alto contraste.
Garante legibilidade máxima em separadores escuros (Dark Mode) e separadores claros.
"""

import os
from PIL import Image, ImageDraw
import numpy as np

def create_favicon_suite():
    # 1. Carregar logo original
    logo_path = 'assets/images/logo.png'
    if not os.path.exists(logo_path):
        raise FileNotFoundError(f"Não foi encontrado {logo_path}")

    logo = Image.open(logo_path).convert('RGBA')
    r, g, b, a = logo.split()

    # Criar versão puramente preta (0,0,0) com a transparência original
    black_logo = Image.merge('RGBA', (
        Image.new('L', logo.size, 0),
        Image.new('L', logo.size, 0),
        Image.new('L', logo.size, 0),
        a
    ))

    def render_icon(size, style='squircle'):
        """
        style: 'squircle' (cantos arredondados com borda subtil)
               'apple' (quadrado sólido branco 180x180 conforme iOS HIG)
               'maskable' (quadrado sólido 512x512 com margem de segurança)
        """
        img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        draw = ImageDraw.Draw(img)

        if style in ('apple', 'maskable'):
            # Fundo quadrado 100% preenchido a branco
            draw.rectangle([(0, 0), (size, size)], fill=(255, 255, 255, 255))
            inner = int(size * 0.65) if style == 'maskable' else int(size * 0.72)
        else:
            # Squircle com cantos arredondados
            radius = max(3, int(size * 0.22))
            border_color = (205, 212, 218, 255) if size <= 48 else (210, 215, 220, 255)
            border_width = 1 if size <= 48 else max(2, int(size * 0.02))

            draw.rounded_rectangle(
                [(0, 0), (size - 1, size - 1)],
                radius=radius,
                fill=(255, 255, 255, 255),
                outline=border_color,
                width=border_width
            )
            inner = int(size * 0.82) if size <= 16 else (int(size * 0.78) if size <= 32 else int(size * 0.74))

        # Redimensionar logo mantendo proporção original
        w, h = black_logo.size
        ratio = w / h
        if ratio >= 1:
            lw = inner
            lh = int(inner / ratio)
        else:
            lh = inner
            lw = int(inner * ratio)

        resized = black_logo.resize((lw, lh), Image.Resampling.LANCZOS)
        lr, lg, lb, la = resized.split()

        # Otimizar contraste de alfa para pequenas resoluções para evitar que linhas finas fiquem cinzentas
        min_a, max_a = la.getextrema()
        if size <= 48 and max_a > 0:
            arr_a = np.array(la, dtype=np.float32)
            gamma = 0.6 if size <= 16 else (0.65 if size <= 32 else 0.75)
            arr_a = (arr_a / max_a) ** gamma * 255.0
            arr_a = np.clip(arr_a, 0, 255).astype(np.uint8)
            la = Image.fromarray(arr_a)

        resized = Image.merge('RGBA', (lr, lg, lb, la))

        ox = (size - lw) // 2
        oy = (size - lh) // 2
        img.paste(resized, (ox, oy), resized)
        return img

    os.makedirs('assets/icons', exist_ok=True)

    # 1. Gerar tamanhos para o favicon.ico multi-resolução
    ico_16 = render_icon(16, style='squircle')
    ico_32 = render_icon(32, style='squircle')
    ico_48 = render_icon(48, style='squircle')

    # Guardar favicon.ico com camadas 16x16, 32x32, 48x48
    ico_32.save(
        'favicon.ico',
        format='ICO',
        sizes=[(16, 16), (32, 32), (48, 48)],
        append_images=[ico_16, ico_48]
    )
    print("Salvo: favicon.ico (16, 32, 48)")

    # 2. Favicon PNG 32x32
    ico_32.save('assets/icons/favicon-32.png', format='PNG', optimize=True)
    print("Salvo: assets/icons/favicon-32.png")

    # 3. Apple Touch Icon (180x180, fundo quadrado branco conforme iOS HIG)
    apple_180 = render_icon(180, style='apple')
    apple_180.save('assets/icons/apple-touch-icon.png', format='PNG', optimize=True)
    print("Salvo: assets/icons/apple-touch-icon.png")

    # 4. PWA Icon 192x192
    pwa_192 = render_icon(192, style='squircle')
    pwa_192.save('assets/icons/icon-192.png', format='PNG', optimize=True)
    print("Salvo: assets/icons/icon-192.png")

    # 5. PWA Icon 512x512
    pwa_512 = render_icon(512, style='squircle')
    pwa_512.save('assets/icons/icon-512.png', format='PNG', optimize=True)
    print("Salvo: assets/icons/icon-512.png")

    # 6. PWA Maskable Icon 512x512
    pwa_maskable = render_icon(512, style='maskable')
    pwa_maskable.save('assets/icons/icon-maskable-512.png', format='PNG', optimize=True)
    print("Salvo: assets/icons/icon-maskable-512.png")

    # Limpar ficheiro de teste se existir
    preview_test = 'assets/icons/preview_white_bg_32.png'
    if os.path.exists(preview_test):
        os.remove(preview_test)
        print("Removido ficheiro temporário de teste:", preview_test)

if __name__ == '__main__':
    create_favicon_suite()

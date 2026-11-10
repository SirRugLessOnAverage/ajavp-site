import subprocess
import os
import time
from PIL import Image, ImageDraw, ImageFont

CHROME_PATH = r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
FRAMES_DIR = r"public\assets\video-teaser\frames"
os.makedirs(FRAMES_DIR, exist_ok=True)

# 1. Capturas reais do site com o Chrome Headless
def capture_url(filename, url, width, height, dark_mode=False, scroll_y=0):
    out_path = os.path.abspath(os.path.join(FRAMES_DIR, filename))
    print(f"A capturar {filename} ({width}x{height}) de {url}...")
    
    # Criar um script temporário para injetar scroll e dark mode via Chrome DevTools / JS se necessário
    # O Chrome permite passar flags
    cmd = [
        CHROME_PATH,
        "--headless=new",
        "--disable-gpu",
        "--hide-scrollbars",
        f"--window-size={width},{height + scroll_y}",
        f"--screenshot={out_path}",
        "--virtual-time-budget=6000",
        url
    ]
    subprocess.run(cmd, capture_output=True)
    
    # Se precisar de scroll_y, recortamos a imagem na altura pretendida
    if os.path.exists(out_path):
        img = Image.open(out_path)
        if scroll_y > 0 and img.size[1] > height:
            # Recortar a partir de scroll_y
            img = img.crop((0, scroll_y, width, scroll_y + height))
            img.save(out_path)
        print(f" -> Sucesso: {filename} ({os.path.getsize(out_path) / 1024:.1f} KB)")
    else:
        print(f" -> Erro ao capturar {filename}")

def generate_closing_scene():
    print("A gerar Cena 5 (Fecho com Logótipo nítido e Slogan 'A Tua Terra Tem Futuro')...")
    logo_path = r"public\assets\images\logo.png"
    logo = Image.open(logo_path).convert("RGBA")

    # Cores Oficiais
    BG_COLOR = (9, 38, 29)        # Verde floresta escuro AJAVP
    ACCENT_GREEN = (34, 197, 94)  # Verde vivo
    GOLD = (245, 158, 11)         # Âmbar dourado
    WHITE = (255, 255, 255)

    try:
        font_slogan = ImageFont.truetype("arialbd.ttf", 64)
        font_sub = ImageFont.truetype("arial.ttf", 40)
        font_url = ImageFont.truetype("arialbd.ttf", 56)
    except:
        font_slogan = font_sub = font_url = ImageFont.load_default()

    # --- 1. Fecho Mobile (1080x1920) ---
    img_m = Image.new("RGB", (1080, 1920), BG_COLOR)
    draw_m = ImageDraw.Draw(img_m)

    badge_center_x, badge_center_y = 540, 680
    badge_radius = 280
    draw_m.ellipse([badge_center_x - badge_radius - 8, badge_center_y - badge_radius - 8,
                    badge_center_x + badge_radius + 8, badge_center_y + badge_radius + 8], fill=(5, 20, 15))
    draw_m.ellipse([badge_center_x - badge_radius, badge_center_y - badge_radius,
                    badge_center_x + badge_radius, badge_center_y + badge_radius], fill=(255, 255, 255), outline=GOLD, width=8)

    lw, lh = logo.size
    logo_m = logo.resize((440, int(440 * lh / lw)), Image.Resampling.LANCZOS)
    img_m.paste(logo_m, (badge_center_x - 220, badge_center_y - int(440 * lh / lw) // 2), logo_m)

    draw_m.text((540, 1100), "A Tua Terra Tem Futuro", fill=GOLD, font=font_slogan, anchor="mm")
    draw_m.text((540, 1190), "Associacao Desportiva e Cultural da Juventude", fill=WHITE, font=font_sub, anchor="mm")
    draw_m.text((540, 1250), "Vilar do Pinheiro", fill=ACCENT_GREEN, font=font_sub, anchor="mm")

    draw_m.rounded_rectangle([240, 1380, 840, 1510], radius=35, fill=(15, 61, 46), outline=ACCENT_GREEN, width=4)
    draw_m.text((540, 1445), "ajavp.pt", fill=WHITE, font=font_url, anchor="mm")

    img_m.save(os.path.join(FRAMES_DIR, "cena5_fecho_mobile.png"))

    # --- 2. Fecho Desktop (1920x1080) ---
    img_d = Image.new("RGB", (1920, 1080), BG_COLOR)
    draw_d = ImageDraw.Draw(img_d)

    badge_x_d, badge_y_d = 450, 540
    badge_radius_d = 260
    draw_d.ellipse([badge_x_d - badge_radius_d - 6, badge_y_d - badge_radius_d - 6,
                    badge_x_d + badge_radius_d + 6, badge_y_d + badge_radius_d + 6], fill=(5, 20, 15))
    draw_d.ellipse([badge_x_d - badge_radius_d, badge_y_d - badge_radius_d,
                    badge_x_d + badge_radius_d, badge_y_d + badge_radius_d], fill=(255, 255, 255), outline=GOLD, width=6)

    logo_d = logo.resize((400, int(400 * lh / lw)), Image.Resampling.LANCZOS)
    img_d.paste(logo_d, (badge_x_d - 200, badge_y_d - int(400 * lh / lw) // 2), logo_d)

    draw_d.text((1250, 390), "A Tua Terra Tem Futuro", fill=GOLD, font=font_slogan, anchor="mm")
    draw_d.text((1250, 480), "Associacao Desportiva e Cultural da Juventude", fill=WHITE, font=font_sub, anchor="mm")
    draw_d.text((1250, 540), "Vilar do Pinheiro", fill=ACCENT_GREEN, font=font_sub, anchor="mm")

    draw_d.rounded_rectangle([980, 640, 1520, 760], radius=30, fill=(15, 61, 46), outline=ACCENT_GREEN, width=4)
    draw_d.text((1250, 700), "ajavp.pt", fill=WHITE, font=font_url, anchor="mm")

    img_d.save(os.path.join(FRAMES_DIR, "cena5_fecho_desktop.png"))
    print("✅ Cenas de encerramento geradas com sucesso!")

def main():
    print("A iniciar captura das cenas alinhadas com a locução...")
    
    # Cena 1 (0s-7s): "Vilar do Pinheiro tem uma nova casa digital! O novo site da AJAVP..."
    capture_url("cena1_hero_mobile.png", "https://ajavp.pt", 1080, 1920)
    capture_url("cena1_hero_desktop.png", "https://ajavp.pt", 1920, 1080)
    
    # Cena 2 (7s-14.5s): "Podes instalá-lo diretamente no teu telemóvel como uma aplicação..."
    # Capturar a zona de destaques / PWA / notícias com scroll suave
    capture_url("cena2_pwa_mobile.png", "https://ajavp.pt", 1080, 1920, scroll_y=450)
    capture_url("cena2_pwa_desktop.png", "https://ajavp.pt", 1920, 1080, scroll_y=350)
    
    # Cena 3 (14.5s-23.5s): "Queres treinar ou trazer os teus filhos? Consulta todas as modalidades..."
    # Capturar a página REAL de modalidades (/modalidades)
    capture_url("cena3_modalidades_mobile.png", "https://ajavp.pt/modalidades", 1080, 1920, scroll_y=250)
    capture_url("cena3_modalidades_desktop.png", "https://ajavp.pt/modalidades", 1920, 1080, scroll_y=200)
    
    # Cena 4 (23.5s-31.5s): "E tornar-te sócio nunca foi tão simples: faz tudo online..."
    # Capturar a zona da ficha de inscrição de sócio em /socios com scroll
    capture_url("cena4_socios_mobile.png", "https://ajavp.pt/socios", 1080, 1920, scroll_y=350)
    capture_url("cena4_socios_desktop.png", "https://ajavp.pt/socios", 1920, 1080, scroll_y=280)
    
    # Cena 5 (31.5s-38s): Fecho com Logótipo destacado e slogan "A Tua Terra de Futuro"
    generate_closing_scene()

if __name__ == "__main__":
    main()

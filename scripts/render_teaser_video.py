import os
import sys
import subprocess
import time
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import imageio_ffmpeg

FFMPEG_BIN = imageio_ffmpeg.get_ffmpeg_exe()
FRAMES_DIR = r"public\assets\video-teaser\frames"
OUTPUT_DIR = r"public\assets\video-teaser"
VOICE_PATH = os.path.join(OUTPUT_DIR, "locucao_raquel.mp3")
BGM_PATH = os.path.join(OUTPUT_DIR, "community_kickoff.mp3")

FPS = 30
DURATION_SEC = 38
TOTAL_FRAMES = FPS * DURATION_SEC

# Cores da Identidade AJAVP
COLOR_BG = (9, 38, 29)
COLOR_CARD = (11, 46, 35, 235)
COLOR_BORDER = (34, 197, 94)
COLOR_GOLD = (245, 158, 11)
COLOR_WHITE = (255, 255, 255)
COLOR_GRAY = (209, 213, 219)

# Definição das 5 Cenas
SCENES = [
    (0.0, 6.5, "cena1_hero_mobile.png", "cena1_hero_desktop.png",
     "NOVO SITE OFICIAL", "Vilar do Pinheiro Vive Aqui", "A tua associacao agora mais perto de ti"),

    (6.5, 14.5, "cena2_pwa_mobile.png", "cena2_pwa_desktop.png",
     "EXPERIENCIA APP", "Instala Diretamente no Telemovel", "PWA ultrarrapida, modo escuro e sem esperas"),

    (14.5, 23.5, "cena3_modalidades_mobile.png", "cena3_modalidades_desktop.png",
     "MODALIDADES & TREINOS", "Descobre Todos os Horarios", "Tenis de Mesa, Atletismo, Futsal e pavilhoes"),

    (23.5, 31.5, "cena4_socios_mobile.png", "cena4_socios_desktop.png",
     "FAZ PARTE DA FAMILIA", "Quero Ser Socio Online", "Ficha digital em menos de 1 minuto"),

    (31.5, 38.0, "cena5_fecho_mobile.png", "cena5_fecho_desktop.png",
     "A TUA TERRA TEM FUTURO", "Entra em ajavp.pt", "Juntos, fazemos o desporto crescer!"),
]

def load_fonts():
    try:
        font_tag = ImageFont.truetype("arialbd.ttf", 32)
        font_title_v = ImageFont.truetype("arialbd.ttf", 52)
        font_sub_v = ImageFont.truetype("arial.ttf", 36)
        font_title_h = ImageFont.truetype("arialbd.ttf", 46)
        font_sub_h = ImageFont.truetype("arial.ttf", 32)
    except:
        font_tag = font_title_v = font_sub_v = font_title_h = font_sub_h = ImageFont.load_default()
    return {
        "tag": font_tag,
        "title_v": font_title_v,
        "sub_v": font_sub_v,
        "title_h": font_title_h,
        "sub_h": font_sub_h,
    }

def render_frame_vertical(frame_idx, base_images, fonts):
    w, h = 1080, 1920
    t = frame_idx / FPS

    current_scene = SCENES[-1]
    for sc in SCENES:
        if sc[0] <= t < sc[1]:
            current_scene = sc
            break

    start_t, end_t, img_v_name, _, tag, title, sub = current_scene
    scene_duration = end_t - start_t
    scene_progress = min(1.0, max(0.0, (t - start_t) / scene_duration))

    base_img = base_images[img_v_name]

    zoom = 1.0 + 0.04 * scene_progress
    crop_w = int(w / zoom)
    crop_h = int(h / zoom)
    x1 = (w - crop_w) // 2
    y1 = int(((h - crop_h) // 2) * (1.0 + 0.1 * scene_progress))
    y1 = min(y1, h - crop_h)

    frame = base_img.crop((x1, y1, x1 + crop_w, y1 + crop_h)).resize((w, h), Image.Resampling.BILINEAR)

    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    if current_scene != SCENES[-1]:
        box_left, box_top, box_right, box_bottom = 60, 1480, 1020, 1820
        draw.rounded_rectangle([box_left, box_top, box_right, box_bottom], radius=28, fill=COLOR_CARD, outline=COLOR_BORDER, width=3)

        draw.rounded_rectangle([box_left + 40, box_top + 35, box_left + 460, box_top + 85], radius=12, fill=(34, 197, 94, 220))
        draw.text((box_left + 60, box_top + 45), tag, fill=COLOR_BG, font=fonts["tag"])

        draw.text((box_left + 40, box_top + 115), title, fill=COLOR_WHITE, font=fonts["title_v"])
        draw.text((box_left + 40, box_top + 215), sub, fill=COLOR_GRAY, font=fonts["sub_v"])

    total_progress = frame_idx / TOTAL_FRAMES
    bar_w = int(w * total_progress)
    draw.rectangle([0, 0, w, 10], fill=(20, 20, 20, 180))
    draw.rectangle([0, 0, bar_w, 10], fill=COLOR_GOLD)

    final_img = Image.alpha_composite(frame.convert("RGBA"), overlay)
    return np.array(final_img.convert("RGB"))

def render_frame_horizontal(frame_idx, base_images, fonts):
    w, h = 1920, 1080
    t = frame_idx / FPS

    current_scene = SCENES[-1]
    for sc in SCENES:
        if sc[0] <= t < sc[1]:
            current_scene = sc
            break

    start_t, end_t, _, img_h_name, tag, title, sub = current_scene
    scene_duration = end_t - start_t
    scene_progress = min(1.0, max(0.0, (t - start_t) / scene_duration))

    base_img = base_images[img_h_name]

    zoom = 1.0 + 0.03 * scene_progress
    crop_w = int(w / zoom)
    crop_h = int(h / zoom)
    x1 = (w - crop_w) // 2
    y1 = (h - crop_h) // 2

    frame = base_img.crop((x1, y1, x1 + crop_w, y1 + crop_h)).resize((w, h), Image.Resampling.BILINEAR)

    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    if current_scene != SCENES[-1]:
        box_left, box_top, box_right, box_bottom = 80, 780, 1050, 1020
        draw.rounded_rectangle([box_left, box_top, box_right, box_bottom], radius=24, fill=COLOR_CARD, outline=COLOR_BORDER, width=3)

        draw.rounded_rectangle([box_left + 30, box_top + 25, box_left + 420, box_top + 70], radius=10, fill=(34, 197, 94, 220))
        draw.text((box_left + 45, box_top + 32), tag, fill=COLOR_BG, font=fonts["tag"])

        draw.text((box_left + 30, box_top + 90), title, fill=COLOR_WHITE, font=fonts["title_h"])
        draw.text((box_left + 30, box_top + 165), sub, fill=COLOR_GRAY, font=fonts["sub_h"])

    total_progress = frame_idx / TOTAL_FRAMES
    bar_w = int(w * total_progress)
    draw.rectangle([0, 0, w, 10], fill=(20, 20, 20, 180))
    draw.rectangle([0, 0, bar_w, 10], fill=COLOR_GOLD)

    final_img = Image.alpha_composite(frame.convert("RGBA"), overlay)
    return np.array(final_img.convert("RGB"))

def render_video(mode="vertical"):
    is_vertical = (mode == "vertical")
    width, height = (1080, 1920) if is_vertical else (1920, 1080)
    out_filename = "ajavp_teaser_9x16.mp4" if is_vertical else "ajavp_teaser_16x9.mp4"
    out_path = os.path.join(OUTPUT_DIR, out_filename)
    log_path = os.path.join(OUTPUT_DIR, f"ffmpeg_{mode}.log")

    print(f"\n==========================================")
    print(f"🎬 A renderizar vídeo com VOZ RAQUEL: {mode.upper()} ({width}x{height})")
    print(f"Destino: {out_path}")
    print(f"==========================================")

    base_images = {}
    for f in os.listdir(FRAMES_DIR):
        if f.endswith(".png"):
            p = os.path.join(FRAMES_DIR, f)
            base_images[f] = Image.open(p).convert("RGBA")
    print(f"Carregadas {len(base_images)} imagens de base.")

    fonts = load_fonts()

    # Comando FFmpeg com Mixagem Dupla:
    # - Entrada 0: Vídeo Raw via STDIN
    # - Entrada 1: Voz Raquel (locucao_raquel.mp3)
    # - Entrada 2: BGM Suno (community_kickoff.mp3)
    ffmpeg_cmd = [
        FFMPEG_BIN,
        "-y",
        "-f", "rawvideo",
        "-vcodec", "rawvideo",
        "-thread_queue_size", "512",
        "-s", f"{width}x{height}",
        "-pix_fmt", "rgb24",
        "-r", str(FPS),
        "-i", "-",                     # Entrada 0
        "-thread_queue_size", "512",
        "-i", VOICE_PATH,              # Entrada 1: Voz
        "-thread_queue_size", "512",
        "-i", BGM_PATH,                # Entrada 2: Música
        "-filter_complex",
        "[1:a]volume=1.15[vocal];"
        f"[2:a]volume=0.20,afade=t=in:st=0:d=1,afade=t=out:st={DURATION_SEC-2.5}:d=2.5[bgm];"
        "[vocal][bgm]amix=inputs=2:duration=first:dropout_transition=2[aout]",
        "-map", "0:v",
        "-map", "[aout]",
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-preset", "ultrafast",
        "-crf", "23",
        "-c:a", "aac",
        "-b:a", "192k",
        "-t", str(DURATION_SEC),
        out_path
    ]

    render_func = render_frame_vertical if is_vertical else render_frame_horizontal
    start_time = time.time()

    with open(log_path, "w") as log_file:
        proc = subprocess.Popen(ffmpeg_cmd, stdin=subprocess.PIPE, stdout=log_file, stderr=log_file)

        try:
            for idx in range(TOTAL_FRAMES):
                frame_arr = render_func(idx, base_images, fonts)
                proc.stdin.write(frame_arr.tobytes())
                if idx % 150 == 0:
                    pct = (idx / TOTAL_FRAMES) * 100
                    elapsed = time.time() - start_time
                    fps_real = (idx + 1) / max(elapsed, 0.001)
                    print(f"[{mode.upper()}] Progresso: {pct:.1f}% ({idx}/{TOTAL_FRAMES}) - {fps_real:.1f} fps")
            proc.stdin.close()
            proc.wait()
        except Exception as e:
            print(f"Erro na renderização: {e}")
            proc.kill()
            return False

    if os.path.exists(out_path):
        size = os.path.getsize(out_path)
        total_time = time.time() - start_time
        print(f"✅ Concluído em {total_time:.1f}s! Ficheiro: {out_path} ({size / (1024*1024):.2f} MB)")
        return True
    else:
        print(f"❌ Falha FFmpeg. Consulta o log em {log_path}")
        return False

def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else "vertical"
    if mode == "both":
        render_video("vertical")
        render_video("horizontal")
    else:
        render_video(mode)

if __name__ == "__main__":
    main()

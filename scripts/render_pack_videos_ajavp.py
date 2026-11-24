import asyncio
import math
import os
import subprocess
import sys
import time
import edge_tts
import imageio_ffmpeg
import numpy as np
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont

FFMPEG_BIN = imageio_ffmpeg.get_ffmpeg_exe()
ROOT_DIR = r"C:\Users\msilveira\Documents\antigravity\radiant-salk"
DARK_FRAMES_DIR = os.path.join(ROOT_DIR, "public", "assets", "video-promo-dark", "frames")
WORK_DIR = os.path.join(ROOT_DIR, "public", "assets", "video-promo-dark", "tmp")
VIDEOS_DIR = os.path.join(ROOT_DIR, "public", "videos")
BGM_PROMO = os.path.join(ROOT_DIR, "public", "assets", "video-teaser", "community_kickoff.mp3")
SUNO_DIR = os.path.join(ROOT_DIR, "public", "assets", "audio", "suno")
GALERIA_DIR = os.path.join(ROOT_DIR, "public", "assets", "images", "galeria")
JIF_IMG_DIR = os.path.join(ROOT_DIR, "public", "assets", "images", "jif")
LOGO_COLOR = os.path.join(ROOT_DIR, "public", "assets", "images", "logo.png")
LOGO_WHITE = r"C:\Users\msilveira\Documents\AJAVP-Gestao\public\branding\logo_white.png"

os.makedirs(WORK_DIR, exist_ok=True)
os.makedirs(VIDEOS_DIR, exist_ok=True)

FPS = 30
VOICE = "pt-PT-RaquelNeural"

# Cores Oficiais AJAVP Dark Mode
BG_DARK = (6, 24, 18)
CARD_DARK = (8, 22, 18, 232)
EMERALD = (16, 185, 129)
EMERALD_BRIGHT = (52, 211, 153)
GOLD = (245, 158, 11)
GOLD_BRIGHT = (253, 224, 71)
WHITE = (255, 255, 255)
SLATE_200 = (226, 232, 240)
SLATE_300 = (203, 213, 225)


def load_fonts():
    bold_path = r"C:\Windows\Fonts\segoeuib.ttf"
    reg_path = r"C:\Windows\Fonts\segoeui.ttf"
    if not os.path.exists(bold_path):
        bold_path = r"C:\Windows\Fonts\arialbd.ttf"
        reg_path = r"C:\Windows\Fonts\arial.ttf"
    return {
        "brand_title": ImageFont.truetype(bold_path, 26),
        "brand_sub": ImageFont.truetype(bold_path, 17),
        "tag": ImageFont.truetype(bold_path, 24),
        "title_v": ImageFont.truetype(bold_path, 48),
        "sub_v": ImageFont.truetype(reg_path, 31),
        "caption_v": ImageFont.truetype(bold_path, 34),
        "title_h": ImageFont.truetype(bold_path, 42),
        "sub_h": ImageFont.truetype(reg_path, 28),
        "caption_h": ImageFont.truetype(bold_path, 30),
        "close_slogan": ImageFont.truetype(bold_path, 58),
        "close_org": ImageFont.truetype(bold_path, 32),
        "close_meta": ImageFont.truetype(reg_path, 27),
        "close_url": ImageFont.truetype(bold_path, 52),
        "close_badge": ImageFont.truetype(bold_path, 28),
    }


def get_audio_duration(path):
    res = subprocess.run([FFMPEG_BIN, "-i", path], stderr=subprocess.PIPE, text=True)
    for line in res.stderr.splitlines():
        if "Duration:" in line:
            part = line.split("Duration:")[1].split(",")[0].strip()
            h, m, s = part.split(":")
            return int(h) * 3600 + int(m) * 60 + float(s)
    return 0.0


def wrap_lines(draw, text, font, max_width):
    words = text.split()
    lines = []
    cur = []
    for w in words:
        test = " ".join(cur + [w])
        bbox = draw.textbbox((0, 0), test, font=font)
        if bbox[2] - bbox[0] <= max_width or not cur:
            cur.append(w)
        else:
            lines.append(" ".join(cur))
            cur = [w]
    if cur:
        lines.append(" ".join(cur))
    return lines


def smart_cover_crop(img, target_w, target_h, focal_y=0.38, zoom=1.0):
    iw, ih = img.size
    scale = max(target_w / iw, target_h / ih) * zoom
    nw = int(round(iw * scale))
    nh = int(round(ih * scale))
    resized = img.resize((nw, nh), Image.Resampling.BILINEAR)
    x1 = max(0, (nw - target_w) // 2)
    y1 = int(max(0, min(nh - target_h, (nh - target_h) * focal_y)))
    return resized.crop((x1, y1, x1 + target_w, y1 + target_h))


def round_corners(img, radius):
    mask = Image.new("L", img.size, 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle([0, 0, img.size[0], img.size[1]], radius=radius, fill=255)
    out = img.convert("RGBA")
    out.putalpha(mask)
    return out


def make_closing_card(w, h, fonts, extra_banner=None):
    img = Image.new("RGBA", (w, h), BG_DARK + (255,))
    # Subtle radial-like gradient glow overlay
    glow = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    cx, cy = (w // 2, int(h * 0.34)) if h > w else (int(w * 0.25), h // 2)
    for r, alpha in [(520, 18), (380, 26), (260, 34)]:
        gd.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(16, 185, 129, alpha))
    glow = glow.filter(ImageFilter.GaussianBlur(40))
    img = Image.alpha_composite(img, glow)
    draw = ImageDraw.Draw(img)

    logo = Image.open(LOGO_COLOR).convert("RGBA")
    lw, lh = logo.size

    if h > w:  # 1080x1920
        bx, by, br = 540, 620, 235
        draw.ellipse([bx - br - 12, by - br - 12, bx + br + 12, by + br + 12], fill=(4, 15, 11, 255))
        draw.ellipse([bx - br, by - br, bx + br, by + br], fill=WHITE, outline=GOLD, width=8)
        logo_w = 370
        logo_h = int(logo_w * lh / lw)
        logo_r = logo.resize((logo_w, logo_h), Image.Resampling.LANCZOS)
        img.paste(logo_r, (bx - logo_w // 2, by - logo_h // 2), logo_r)

        if extra_banner:
            draw.rounded_rectangle([140, 210, 940, 290], radius=40, fill=(217, 119, 6, 235), outline=GOLD_BRIGHT, width=3)
            draw.text((540, 250), extra_banner, fill=WHITE, font=fonts["close_badge"], anchor="mm")

        draw.text((540, 975), "A Tua Terra Tem Futuro!", fill=GOLD, font=fonts["close_slogan"], anchor="mm")
        draw.text((540, 1085), "Associação Jovens e Adultos", fill=WHITE, font=fonts["close_org"], anchor="mm")
        draw.text((540, 1135), "de Vilar do Pinheiro", fill=EMERALD_BRIGHT, font=fonts["close_org"], anchor="mm")
        draw.text((540, 1215), "Fundada em 2025 • geral@ajavp.pt", fill=SLATE_300, font=fonts["close_meta"], anchor="mm")

        draw.rounded_rectangle([240, 1320, 840, 1450], radius=36, fill=(12, 54, 40, 255), outline=EMERALD, width=5)
        draw.text((540, 1385), "ajavp.pt", fill=WHITE, font=fonts["close_url"], anchor="mm")
    else:  # 1920x1080
        bx, by, br = 450, 540, 235
        draw.ellipse([bx - br - 10, by - br - 10, bx + br + 10, by + br + 10], fill=(4, 15, 11, 255))
        draw.ellipse([bx - br, by - br, bx + br, by + br], fill=WHITE, outline=GOLD, width=8)
        logo_w = 360
        logo_h = int(logo_w * lh / lw)
        logo_r = logo.resize((logo_w, logo_h), Image.Resampling.LANCZOS)
        img.paste(logo_r, (bx - logo_w // 2, by - logo_h // 2), logo_r)

        rx = 1280
        draw.text((rx, 330), "A Tua Terra Tem Futuro!", fill=GOLD, font=fonts["close_slogan"], anchor="mm")
        draw.text((rx, 435), "Associação Jovens e Adultos de Vilar do Pinheiro", fill=WHITE, font=fonts["close_org"], anchor="mm")
        draw.text((rx, 495), "Fundada em 2025 • geral@ajavp.pt", fill=SLATE_300, font=fonts["close_meta"], anchor="mm")
        draw.rounded_rectangle([990, 595, 1570, 720], radius=32, fill=(12, 54, 40, 255), outline=EMERALD, width=5)
        draw.text((rx, 657), "ajavp.pt", fill=WHITE, font=fonts["close_url"], anchor="mm")

    return img.convert("RGB")


# ==============================================================================
# PART 1: PROMO SITE DARK MODE (VOICEOVER + SYNCED CAPTIONS + 9:16 & 16:9)
# ==============================================================================
PROMO_SCENES = [
    {
        "img_v": "dark_hero_mobile.png",
        "img_h": "dark_hero_desktop.png",
        "tag": "MODO ESCURO OFICIAL",
        "title": "A Nossa Casa Digital em Dark Mode",
        "speech": "O desporto de Vilar do Pinheiro tem uma casa digital à altura da nossa ambição — agora em Modo Escuro!",
    },
    {
        "img_v": "dark_modalidades_mobile.png",
        "img_h": "dark_modalidades_desktop.png",
        "tag": "MODALIDADES & TREINOS",
        "title": "Futsal, Atletismo, Ténis de Mesa e Duatlo",
        "speech": "Descobre todas as nossas modalidades: Futsal, Atletismo, Ténis de Mesa, Duatlo BTT e Badminton, com horários e escalões sempre atualizados.",
    },
    {
        "img_v": "dark_noticias_mobile.png",
        "img_h": "dark_noticias_desktop.png",
        "tag": "NOTÍCIAS EM TEMPO REAL",
        "title": "Cada Conquista e Crónica AJAVP",
        "speech": "Acompanha de perto cada conquista, cada crónica e todas as novidades da nossa associação em tempo real.",
    },
    {
        "img_v": "dark_jif_mobile.png",
        "img_h": "dark_jif_desktop.png",
        "tag": "CALENDÁRIO & ROTAS GPS",
        "title": "XL Jogos Inter-Freguesias & Duatlo Bagunte",
        "speech": "Consulta o calendário completo dos 40.ºs Jogos Inter-Freguesias, rotas GPS para cada recinto",
    },
    {
        "img_v": "dark_classificacao_mobile.png",
        "img_h": "dark_classificacao_desktop.png",
        "tag": "CLASSIFICAÇÃO & MEDALHEIRO",
        "title": "Vilar do Pinheiro no Topo dos JIF",
        "speech": "e a classificação em direto de Vilar do Pinheiro!",
    },
    {
        "img_v": "__CLOSE__",
        "img_h": "__CLOSE__",
        "tag": "AJAVP • VILAR DO PINHEIRO",
        "title": "A Tua Terra Tem Futuro!",
        "speech": "Entra já em ajavp ponto pt. Associação Jovens e Adultos de Vilar do Pinheiro — A Tua Terra Tem Futuro!",
    },
]


async def build_promo_voice_and_timeline():
    """Generates each scene's PT-PT voiceover separately so scene boundaries and dynamic subtitle chunks are exact."""
    scene_wavs = []
    timeline = []
    cursor_t = 0.25  # 250ms initial breath

    # Silence pad files
    silence_lead = os.path.join(WORK_DIR, "sil_lead.wav")
    silence_gap = os.path.join(WORK_DIR, "sil_gap.wav")
    subprocess.run([FFMPEG_BIN, "-y", "-f", "lavfi", "-i", "anullsrc=r=24000:cl=mono", "-t", "0.25", silence_lead], capture_output=True)
    subprocess.run([FFMPEG_BIN, "-y", "-f", "lavfi", "-i", "anullsrc=r=24000:cl=mono", "-t", "0.28", silence_gap], capture_output=True)

    concat_inputs = [silence_lead]

    for idx, sc in enumerate(PROMO_SCENES):
        mp3_p = os.path.join(WORK_DIR, f"promo_sc_{idx}.mp3")
        wav_p = os.path.join(WORK_DIR, f"promo_sc_{idx}.wav")

        comm = edge_tts.Communicate(sc["speech"], VOICE, rate="+6%", pitch="+0Hz")
        word_events = []
        audio_bytes = bytearray()
        async for chunk in comm.stream():
            if chunk["type"] == "audio":
                audio_bytes.extend(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                word_events.append({
                    "text": chunk["text"],
                    "start": chunk["offset"] / 10_000_000.0,
                    "end": (chunk["offset"] + chunk["duration"]) / 10_000_000.0,
                })

        with open(mp3_p, "wb") as f:
            f.write(audio_bytes)
        subprocess.run([FFMPEG_BIN, "-y", "-i", mp3_p, "-ar", "24000", "-ac", "1", wav_p], capture_output=True)
        dur = get_audio_duration(wav_p)

        # Build subtitle chunks (~5-7 words per chunk) aligned to WordBoundary timestamps
        sub_chunks = []
        display_speech = sc["speech"].replace("ajavp ponto pt", "ajavp.pt").replace("40.ºs", "40.ºs")
        if word_events:
            chunk_size = 6
            for i in range(0, len(word_events), chunk_size):
                grp = word_events[i:i + chunk_size]
                txt = " ".join(w["text"] for w in grp).replace("ajavp ponto pt", "ajavp.pt")
                st = cursor_t + grp[0]["start"]
                en = cursor_t + grp[-1]["end"] + 0.15
                sub_chunks.append((st, en, txt))
        else:
            sub_chunks.append((cursor_t, cursor_t + dur, display_speech))

        end_t = cursor_t + dur + (0.28 if idx < len(PROMO_SCENES) - 1 else 1.40)
        timeline.append({
            "start": 0.0 if idx == 0 else cursor_t - 0.10,
            "end": end_t,
            "img_v": sc["img_v"],
            "img_h": sc["img_h"],
            "tag": sc["tag"],
            "title": sc["title"],
            "sub_chunks": sub_chunks,
        })

        concat_inputs.append(wav_p)
        if idx < len(PROMO_SCENES) - 1:
            concat_inputs.append(silence_gap)
            cursor_t += dur + 0.28
        else:
            silence_tail = os.path.join(WORK_DIR, "sil_tail.wav")
            subprocess.run([FFMPEG_BIN, "-y", "-f", "lavfi", "-i", "anullsrc=r=24000:cl=mono", "-t", "1.40", silence_tail], capture_output=True)
            concat_inputs.append(silence_tail)
            cursor_t += dur + 1.40

    list_txt = os.path.join(WORK_DIR, "voice_concat.txt")
    with open(list_txt, "w", encoding="utf-8") as f:
        for p in concat_inputs:
            f.write(f"file '{p.replace(chr(92), '/')}'\n")

    final_voice = os.path.join(WORK_DIR, "promo_voice_full.wav")
    subprocess.run([FFMPEG_BIN, "-y", "-f", "concat", "-safe", "0", "-i", list_txt, "-c", "copy", final_voice], capture_output=True)
    total_dur = get_audio_duration(final_voice)
    timeline[-1]["end"] = total_dur
    print(f"Promo voiceover total duration: {total_dur:.2f}s ({len(timeline)} cenas)")
    return final_voice, total_dur, timeline


def render_promo_video(mode, voice_wav, total_dur, timeline, fonts):
    is_v = (mode == "vertical")
    W, H = (1080, 1920) if is_v else (1920, 1080)
    out_name = "ajavp_promo_site_dark_9x16.mp4" if is_v else "ajavp_promo_site_dark_16x9.mp4"
    out_path = os.path.join(VIDEOS_DIR, out_name)
    total_frames = int(math.ceil(total_dur * FPS))

    imgs = {}
    for sc in timeline:
        key = sc["img_v"] if is_v else sc["img_h"]
        if key == "__CLOSE__":
            imgs[key] = make_closing_card(W, H, fonts)
        else:
            p = os.path.join(DARK_FRAMES_DIR, key)
            imgs[key] = Image.open(p).convert("RGB")

    def draw_scene_frame(sc, t):
        key = sc["img_v"] if is_v else sc["img_h"]
        base = imgs[key]
        if key == "__CLOSE__":
            frame = base.copy()
        else:
            prog = min(1.0, max(0.0, (t - sc["start"]) / max(0.1, sc["end"] - sc["start"])))
            zoom = 1.0 + 0.045 * prog
            frame = smart_cover_crop(base, W, H, focal_y=0.12 * prog, zoom=zoom)

        overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        draw = ImageDraw.Draw(overlay)

        if key != "__CLOSE__":
            if is_v:
                box = [52, 1400, 1028, 1845]
                draw.rounded_rectangle(box, radius=28, fill=CARD_DARK, outline=EMERALD, width=3)
                # Pill tag
                tw = draw.textbbox((0, 0), sc["tag"], font=fonts["tag"])[2] + 44
                draw.rounded_rectangle([88, 1432, 88 + tw, 1480], radius=16, fill=(16, 185, 129, 240))
                draw.text((88 + tw // 2, 1456), sc["tag"], fill=BG_DARK, font=fonts["tag"], anchor="mm")
                # Scene Title
                t_lines = wrap_lines(draw, sc["title"], fonts["title_v"], 860)[:2]
                ty = 1502
                for tl in t_lines:
                    draw.text((88, ty), tl, fill=WHITE, font=fonts["title_v"])
                    ty += 56
                # Divider
                draw.line([88, 1628, 992, 1628], fill=(51, 65, 85, 220), width=2)
                # Active dynamic caption
                active_cap = ""
                for st, en, ctxt in sc["sub_chunks"]:
                    if st - 0.1 <= t <= en + 0.2:
                        active_cap = ctxt
                        break
                if not active_cap and sc["sub_chunks"]:
                    active_cap = sc["sub_chunks"][-1][2]
                c_lines = wrap_lines(draw, active_cap, fonts["caption_v"], 880)[:2]
                cy = 1656
                for cl in c_lines:
                    draw.text((540, cy), cl, fill=GOLD_BRIGHT, font=fonts["caption_v"], anchor="ma")
                    cy += 44
                draw.text((540, 1798), "AJAVP.PT  •  MODO ESCURO  •  A TUA TERRA TEM FUTURO", fill=EMERALD_BRIGHT, font=fonts["brand_sub"], anchor="mm")
            else:
                box = [64, 735, 1260, 1025]
                draw.rounded_rectangle(box, radius=24, fill=CARD_DARK, outline=EMERALD, width=3)
                tw = draw.textbbox((0, 0), sc["tag"], font=fonts["tag"])[2] + 40
                draw.rounded_rectangle([96, 762, 96 + tw, 804], radius=14, fill=(16, 185, 129, 240))
                draw.text((96 + tw // 2, 783), sc["tag"], fill=BG_DARK, font=fonts["tag"], anchor="mm")
                draw.text((96, 822), sc["title"], fill=WHITE, font=fonts["title_h"])
                draw.line([96, 884, 1220, 884], fill=(51, 65, 85, 220), width=2)
                active_cap = ""
                for st, en, ctxt in sc["sub_chunks"]:
                    if st - 0.1 <= t <= en + 0.2:
                        active_cap = ctxt
                        break
                if not active_cap and sc["sub_chunks"]:
                    active_cap = sc["sub_chunks"][-1][2]
                c_lines = wrap_lines(draw, active_cap, fonts["caption_h"], 1120)[:2]
                cy = 905
                for cl in c_lines:
                    draw.text((96, cy), cl, fill=GOLD_BRIGHT, font=fonts["caption_h"])
                    cy += 40
        else:
            # Show dynamic caption pill at bottom on closing card too
            active_cap = ""
            for st, en, ctxt in sc["sub_chunks"]:
                if st - 0.1 <= t <= en + 0.3:
                    active_cap = ctxt
                    break
            if active_cap:
                cy = 1690 if is_v else 960
                c_lines = wrap_lines(draw, active_cap, fonts["caption_v"] if is_v else fonts["caption_h"], 900)[:2]
                bw = 940 if is_v else 1100
                draw.rounded_rectangle([W // 2 - bw // 2, cy - 22, W // 2 + bw // 2, cy + len(c_lines) * 44 + 14], radius=20, fill=(4, 18, 13, 230), outline=GOLD, width=2)
                for idx_l, cl in enumerate(c_lines):
                    draw.text((W // 2, cy + idx_l * 42), cl, fill=GOLD_BRIGHT, font=fonts["caption_v"] if is_v else fonts["caption_h"], anchor="ma")

        return Image.alpha_composite(frame.convert("RGBA"), overlay)

    cmd = [
        FFMPEG_BIN, "-y",
        "-f", "rawvideo", "-vcodec", "rawvideo", "-thread_queue_size", "512",
        "-s", f"{W}x{H}", "-pix_fmt", "rgb24", "-r", str(FPS), "-i", "-",
        "-thread_queue_size", "512", "-i", voice_wav,
        "-thread_queue_size", "512", "-i", BGM_PROMO,
        "-filter_complex",
        f"[1:a]volume=1.18[v];[2:a]volume=0.17,afade=t=in:st=0:d=1.0,afade=t=out:st={max(0.5, total_dur-2.5):.2f}:d=2.5[b];"
        "[v][b]amix=inputs=2:duration=first:dropout_transition=2[aout]",
        "-map", "0:v", "-map", "[aout]",
        "-c:v", "libx264", "-pix_fmt", "yuv420p", "-preset", "fast", "-crf", "22", "-movflags", "+faststart",
        "-c:a", "aac", "-b:a", "192k", "-t", f"{total_dur:.2f}",
        out_path,
    ]

    print(f"A renderizar {out_name} ({W}x{H}, {total_dur:.2f}s, {total_frames} frames)...", flush=True)
    t0 = time.time()
    log_path = os.path.join(WORK_DIR, f"{out_name}.ffmpeg.log")
    with open(log_path, "w", encoding="utf-8") as log_file:
        proc = subprocess.Popen(cmd, stdin=subprocess.PIPE, stdout=log_file, stderr=log_file)
        xfade = 0.35

        for f_idx in range(total_frames):
            t = f_idx / FPS
            sc_idx = len(timeline) - 1
            for i, sc in enumerate(timeline):
                if sc["start"] <= t < sc["end"]:
                    sc_idx = i
                    break

            cur_sc = timeline[sc_idx]
            frame_rgba = draw_scene_frame(cur_sc, t)

            # Crossfade near boundary with previous scene
            if sc_idx > 0:
                since_start = t - cur_sc["start"]
                if 0.0 <= since_start < xfade:
                    prev_rgba = draw_scene_frame(timeline[sc_idx - 1], t)
                    alpha = since_start / xfade
                    frame_rgba = Image.blend(prev_rgba, frame_rgba, alpha)

            # Top gold progress bar
            pdraw = ImageDraw.Draw(frame_rgba)
            bar_w = int(W * (f_idx / max(1, total_frames - 1)))
            pdraw.rectangle([0, 0, W, 10], fill=(15, 23, 42, 200))
            pdraw.rectangle([0, 0, bar_w, 10], fill=GOLD)

            proc.stdin.write(frame_rgba.convert("RGB").tobytes())
            if f_idx % 150 == 0:
                print(f"  [{out_name}] frame {f_idx}/{total_frames}", flush=True)

        proc.stdin.close()
        rc = proc.wait()
    if rc != 0:
        err = open(log_path, "r", encoding="utf-8", errors="ignore").read()[-800:]
        raise RuntimeError(f"FFmpeg falhou em {out_name}: {err}")
    sz = os.path.getsize(out_path) / (1024 * 1024)
    print(f" -> Concluido {out_name}: {sz:.2f} MB em {time.time()-t0:.1f}s", flush=True)


# ==============================================================================
# PART 2: 3 SUNO REELS (9:16, 1080x1920)
# ==============================================================================
REELS_CONFIG = [
    {
        "out_name": "ajavp_reel_mancha_verde_pista_pavilhao_9x16.mp4",
        "audio_file": os.path.join(SUNO_DIR, "suno_01_verde_no_peito_vibe_no_ar.mp3"),
        "audio_ss": 62.0,
        "duration": 24.0,
        "header_pill": "MANCHA VERDE • XL JIF",
        "close_banner": None,
        "slides": [
            (os.path.join(GALERIA_DIR, "corta_mato_equipa_2026.webp"), "CORTA-MATO XL JIF", "1.º Lugar Geral Concelhio", "34 pontos e vitória coletiva na abertura dos Jogos", 0.35),
            (os.path.join(JIF_IMG_DIR, "jif-atletas-medalhas.webp"), "ESFORÇO & RAÇA", "Mais de 30 Atletas na Pista", "Dos mais novos aos veteranos, todos a dar tudo", 0.30),
            (os.path.join(GALERIA_DIR, "tenis-mesa", "tenis_mesa_2026_podio_sub11_ouro_prata_bronze.webp"), "TÉNIS DE MESA", "Pódio 100% AJAVP em Sub-11", "Ouro, Prata e Bronze com as cores de Vilar do Pinheiro", 0.28),
            (os.path.join(GALERIA_DIR, "tenis-mesa", "tenis_mesa_2026_podio_sub16_campeao_vice.webp"), "SUB-16 MASCULINOS", "Final 100% Vilar do Pinheiro", "Trabalho de equipa e foco até ao último ponto", 0.28),
            (os.path.join(GALERIA_DIR, "tenis-mesa", "tenis_mesa_2026_podio_livre_masculino_ouro.webp"), "ESCALÃO LIVRE", "Campeão Individual Concelhio", "1.º Lugar Coletivo no Encontro com 14 pontos", 0.25),
            (os.path.join(GALERIA_DIR, "tenis-mesa", "tenis_mesa_2026_medalhados_tarde_ajavp.webp"), "15 MEDALHAS CONCELHIAS", "Verde no Peito, Vibe no Ar!", "História escrita em primeiro lugar pela nossa terra", 0.32),
        ],
        "close_dur": 3.5,
    },
    {
        "out_name": "ajavp_reel_futsal_formacao_fairplay_9x16.mp4",
        "audio_file": os.path.join(SUNO_DIR, "suno_02_vamos_treinar_vem_e_traz_um_amigo.mp3"),
        "audio_ss": 55.0,
        "duration": 26.0,
        "header_pill": "FORMAÇÃO • FUTSAL",
        "close_banner": "GRÁTIS ATÉ AOS 18 ANOS",
        "slides": [
            (os.path.join(JIF_IMG_DIR, "jif-fairplay-equipa.webp"), "FAIR-PLAY & VALORES", "Não Só os Resultados Contam", "Formamos atletas e cidadãos dentro e fora do campo", 0.35),
            (os.path.join(GALERIA_DIR, "sub7.webp"), "ESCALÃO SUB-7", "O Futuro Começa Aqui", "Alegria, amizade e os primeiros passos na quadra", 0.35),
            (os.path.join(GALERIA_DIR, "sub7banco.webp"), "ESPÍRITO DE EQUIPA", "Unidos em Todos os Jogos", "No banco ou em campo, apoiamos como uma família", 0.35),
            (os.path.join(GALERIA_DIR, "Sub-9e11.webp"), "SUB-9 & SUB-11", "Raça, Entrega e União", "Treinar faça chuva ou sol com vontade de vencer", 0.35),
            (os.path.join(GALERIA_DIR, "sub11.webp"), "FUTSAL XL JIF", "Vem e Traz um Amigo!", "Na AJAVP a porta está sempre aberta à juventude", 0.35),
            (os.path.join(GALERIA_DIR, "sub13.webp"), "FORMAÇÃO AJAVP", "Inscrições Abertas em ajavp.pt", "Grátis até aos 18 anos • Vilar do Pinheiro", 0.35),
        ],
        "close_dur": 3.8,
    },
    {
        "out_name": "ajavp_reel_duatlo_bagunte_folego_9x16.mp4",
        "audio_file": os.path.join(SUNO_DIR, "suno_03_a_nossa_terra_tem_futuro.mp3"),
        "audio_ss": 53.0,
        "duration": 24.0,
        "header_pill": "DUATLO • 5 DEZ • BAGUNTE",
        "close_banner": "DUATLO BAGUNTE • 5 DEZ • 09H00",
        "slides": [
            (os.path.join(GALERIA_DIR, "foto_17.webp"), "DUATLO XL JIF • 5 DEZ", "Não Podemos Perder o Fôlego!", "Corrida e BTT em Bagunte • Cada atleta conta!", 0.32),
            (os.path.join(GALERIA_DIR, "foto_15.webp"), "CORRIDA + CICLISMO BTT", "Prepara a Bicicleta e Capacete", "Levar o mesmo dorsal oficial recebido no Corta-Mato", 0.35),
            (os.path.join(GALERIA_DIR, "prova_25_abril_2025_comitiva.webp"), "SUB-11 A VETERANOS", "Cada Atleta Soma Pontos", "Do pódio à superação pessoal, todos defendem a terra", 0.35),
            (os.path.join(GALERIA_DIR, "prova_25_abril_2025_grupo.webp"), "LOCAL CONFIRMADO", "Sábado, 5 Dez • 09h00 • Bagunte", "Vem apoiar ou pedalar com a Mancha Verde!", 0.35),
            (os.path.join(GALERIA_DIR, "corta_mato_equipa_2026.webp"), "A NOSSA TERRA TEM FUTURO", "Juntos Vamos Mais Longe!", "Inscreve-te já em ajavp.pt ou na Direção", 0.35),
        ],
        "close_dur": 4.0,
    },
]


def render_reel(cfg, fonts):
    W, H = 1080, 1920
    out_path = os.path.join(VIDEOS_DIR, cfg["out_name"])
    total_dur = cfg["duration"]
    total_frames = int(round(total_dur * FPS))

    logo_w_img = Image.open(LOGO_WHITE).convert("RGBA").resize((76, 76), Image.Resampling.LANCZOS)
    close_card = make_closing_card(W, H, fonts, extra_banner=cfg["close_banner"])

    slides = cfg["slides"]
    n_slides = len(slides)
    slides_dur = total_dur - cfg["close_dur"]
    per_slide = slides_dur / n_slides

    timeline = []
    t_cur = 0.0
    prepared = []
    for idx, (img_path, tag, title, sub, focal_y) in enumerate(slides):
        raw = Image.open(img_path).convert("RGB")
        # Pre-generate dark blurred backdrop once per slide
        bg = smart_cover_crop(raw, W, H, focal_y=0.5, zoom=1.05).filter(ImageFilter.GaussianBlur(28))
        bg = ImageEnhance.Brightness(bg).enhance(0.28).convert("RGBA")
        prepared.append({"raw": raw, "bg": bg, "tag": tag, "title": title, "sub": sub, "focal_y": focal_y, "is_close": False})
        timeline.append((t_cur, t_cur + per_slide, idx))
        t_cur += per_slide

    prepared.append({"is_close": True, "close": close_card})
    timeline.append((t_cur, total_dur, n_slides))

    def build_slide_frame(s_idx, t_rel, dur_s):
        item = prepared[s_idx]
        if item["is_close"]:
            return item["close"].copy().convert("RGBA")

        prog = min(1.0, max(0.0, t_rel / max(0.1, dur_s)))
        canvas = item["bg"].copy()

        # Photo card inside canvas
        pw, ph = 980, 860
        px, py = (W - pw) // 2, 235
        zoom = 1.0 + 0.05 * prog
        photo_crop = smart_cover_crop(item["raw"], pw, ph, focal_y=item["focal_y"], zoom=zoom)
        photo_crop = ImageEnhance.Color(ImageEnhance.Brightness(photo_crop).enhance(1.04)).enhance(1.08)
        photo_rounded = round_corners(photo_crop, 32)
        canvas.paste(photo_rounded, (px, py), photo_rounded)

        overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        draw = ImageDraw.Draw(overlay)

        # Header band
        draw.rectangle([0, 0, W, 190], fill=(4, 15, 11, 225))
        overlay.paste(logo_w_img, (50, 58), logo_w_img)
        draw.text((146, 72), "ASSOCIAÇÃO JOVENS E ADULTOS", fill=WHITE, font=fonts["brand_title"])
        draw.text((146, 108), "VILAR DO PINHEIRO • XL JOGOS INTER-FREGUESIAS", fill=EMERALD_BRIGHT, font=fonts["brand_sub"])

        # Emerald border around photo
        draw.rounded_rectangle([px - 3, py - 3, px + pw + 3, py + ph + 3], radius=34, outline=EMERALD, width=4)

        # Top pill above photo
        pill_w = draw.textbbox((0, 0), cfg["header_pill"], font=fonts["tag"])[2] + 52
        draw.rounded_rectangle([540 - pill_w // 2, 168, 540 + pill_w // 2, 212], radius=22, fill=GOLD, outline=WHITE, width=2)
        draw.text((540, 190), cfg["header_pill"], fill=(15, 23, 42), font=fonts["tag"], anchor="mm")

        # Lower-third editorial card
        card_box = [50, 1150, 1030, 1680]
        draw.rounded_rectangle(card_box, radius=32, fill=CARD_DARK, outline=EMERALD, width=3)
        draw.rounded_rectangle([50, 1150, 66, 1680], radius=8, fill=GOLD)

        # Tag inside card
        tw = draw.textbbox((0, 0), item["tag"], font=fonts["tag"])[2] + 44
        draw.rounded_rectangle([94, 1192, 94 + tw, 1242], radius=16, fill=(16, 185, 129, 240))
        draw.text((94 + tw // 2, 1217), item["tag"], fill=BG_DARK, font=fonts["tag"], anchor="mm")

        # Headline
        t_lines = wrap_lines(draw, item["title"], fonts["title_v"], 880)[:2]
        ty = 1272
        for tl in t_lines:
            draw.text((94, ty), tl, fill=WHITE, font=fonts["title_v"])
            ty += 60

        draw.line([94, 1418, 986, 1418], fill=(51, 65, 85, 220), width=2)

        # Subtitle / effort message
        s_lines = wrap_lines(draw, item["sub"], fonts["sub_v"], 880)[:2]
        sy = 1448
        for sl in s_lines:
            draw.text((94, sy), sl, fill=SLATE_200, font=fonts["sub_v"])
            sy += 44

        # Footer CTA bar inside card
        draw.text((94, 1612), "A TUA TERRA TEM FUTURO!  •  AJAVP.PT", fill=GOLD_BRIGHT, font=fonts["brand_title"])

        return Image.alpha_composite(canvas, overlay)

    cmd = [
        FFMPEG_BIN, "-y",
        "-f", "rawvideo", "-vcodec", "rawvideo", "-thread_queue_size", "512",
        "-s", f"{W}x{H}", "-pix_fmt", "rgb24", "-r", str(FPS), "-i", "-",
        "-ss", str(cfg["audio_ss"]), "-t", str(total_dur), "-i", cfg["audio_file"],
        "-filter_complex", f"[1:a]volume=0.95,afade=t=in:st=0:d=0.6,afade=t=out:st={total_dur-2.0:.2f}:d=2.0[aout]",
        "-map", "0:v", "-map", "[aout]",
        "-c:v", "libx264", "-pix_fmt", "yuv420p", "-preset", "fast", "-crf", "22", "-movflags", "+faststart",
        "-c:a", "aac", "-b:a", "192k", "-t", str(total_dur),
        out_path,
    ]

    print(f"A renderizar Reel {cfg['out_name']} ({total_dur}s, {total_frames} frames)...", flush=True)
    t0 = time.time()
    log_path = os.path.join(WORK_DIR, f"{cfg['out_name']}.ffmpeg.log")
    with open(log_path, "w", encoding="utf-8") as log_file:
        proc = subprocess.Popen(cmd, stdin=subprocess.PIPE, stdout=log_file, stderr=log_file)
        xfade = 0.32

        for f_idx in range(total_frames):
            t = f_idx / FPS
            cur_idx = len(timeline) - 1
            cur_st, cur_en = timeline[-1][0], timeline[-1][1]
            for st, en, sidx in timeline:
                if st <= t < en:
                    cur_idx, cur_st, cur_en = sidx, st, en
                    break

            frame_rgba = build_slide_frame(cur_idx, t - cur_st, cur_en - cur_st)

            if cur_idx > 0 and (t - cur_st) < xfade:
                pst, pen, pidx = timeline[cur_idx - 1]
                prev_rgba = build_slide_frame(pidx, t - pst, pen - pst)
                alpha = (t - cur_st) / xfade
                frame_rgba = Image.blend(prev_rgba, frame_rgba, alpha)

            # Gold progress bar
            pdraw = ImageDraw.Draw(frame_rgba)
            bar_w = int(W * (f_idx / max(1, total_frames - 1)))
            pdraw.rectangle([0, 0, W, 10], fill=(15, 23, 42, 200))
            pdraw.rectangle([0, 0, bar_w, 10], fill=GOLD)

            proc.stdin.write(frame_rgba.convert("RGB").tobytes())
            if f_idx % 150 == 0:
                print(f"  [{cfg['out_name']}] frame {f_idx}/{total_frames}", flush=True)

        proc.stdin.close()
        rc = proc.wait()
    if rc != 0:
        err = open(log_path, "r", encoding="utf-8", errors="ignore").read()[-800:]
        raise RuntimeError(f"FFmpeg falhou em {cfg['out_name']}: {err}")
    sz = os.path.getsize(out_path) / (1024 * 1024)
    print(f" -> Concluido {cfg['out_name']}: {sz:.2f} MB em {time.time()-t0:.1f}s", flush=True)


def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else "all"
    fonts = load_fonts()

    if mode in ("all", "promo"):
        voice_wav, total_dur, timeline = asyncio.run(build_promo_voice_and_timeline())
        render_promo_video("vertical", voice_wav, total_dur, timeline, fonts)
        render_promo_video("horizontal", voice_wav, total_dur, timeline, fonts)

    if mode in ("all", "reels"):
        for cfg in REELS_CONFIG:
            render_reel(cfg, fonts)


if __name__ == "__main__":
    main()

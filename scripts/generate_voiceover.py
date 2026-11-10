import asyncio
import os
import subprocess
import edge_tts
import imageio_ffmpeg

FFMPEG_BIN = imageio_ffmpeg.get_ffmpeg_exe()
OUTPUT_DIR = r"public\assets\video-teaser"
FINAL_VOICE_PATH = os.path.join(OUTPUT_DIR, "locucao_raquel.mp3")

VOICE = "pt-PT-RaquelNeural"

FULL_TEXT = """
Vilar do Pinheiro tem uma nova casa digital! O novo site da A-J-A-V-P já está online e foi feito a pensar em ti.
Podes instalá-lo diretamente no teu telemóvel como uma aplicação, ativar o modo escuro e acompanhar tudo sem esperas.
Queres treinar ou trazer os teus filhos? Consulta todas as modalidades, os escalões e os horários de treino nos nossos pavilhões.
E tornar-te sócio nunca foi tão simples: faz tudo online em menos de um minuto e apoia a nossa terra!
Entra já em ajavp.pt. Juntos, fazemos o desporto crescer!
""".strip()

async def generate_full_voiceover():
    print(f"A gerar narração contínua completa com a voz '{VOICE}'...")
    communicate = edge_tts.Communicate(FULL_TEXT, VOICE, rate="+4%", pitch="+0Hz")
    await communicate.save(FINAL_VOICE_PATH)

def verify_audio():
    cmd = [FFMPEG_BIN, "-i", FINAL_VOICE_PATH]
    p = subprocess.run(cmd, stderr=subprocess.PIPE, text=True)
    for line in p.stderr.split("\n"):
        if "Duration:" in line:
            print(f"✅ Locução Raquel gerada com sucesso: {line.strip()}")

def main():
    asyncio.run(generate_full_voiceover())
    verify_audio()

if __name__ == "__main__":
    main()

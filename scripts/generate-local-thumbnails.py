#!/usr/bin/env python3
"""
Gera thumbnails para apps locais rodando npm run dev ou servidor estático.
Uso: python3 scripts/generate-local-thumbnails.py
"""
import os
import subprocess
import time
import glob
import signal
from PIL import Image

THUMB_DIR = "public/thumbnails"
os.makedirs(THUMB_DIR, exist_ok=True)

APPS = [
    {
        "slug": "calculadora-react",
        "dir": "/home/jhin/calculadora-react",
        "cmd": ["npm", "run", "dev", "--", "--host", "127.0.0.1", "--port", "3101"],
        "url": "http://127.0.0.1:3101/",
        "wait": 6,
    },
    {
        "slug": "jogo-da-velha",
        "dir": "/home/jhin/Documentos/PROJETOS_PARA_TESTAR_LUNA/jogo-da-velha",
        "cmd": ["npm", "run", "dev", "--", "--host", "127.0.0.1", "--port", "3102"],
        "url": "http://127.0.0.1:3102/",
        "wait": 6,
    },
    {
        "slug": "campo-minado-neon",
        "dir": "/home/jhin/luna/minesweeper",
        "cmd": ["npm", "run", "dev", "--", "--host", "127.0.0.1", "--port", "3103"],
        "url": "http://127.0.0.1:3103/",
        "wait": 6,
    },
    {
        "slug": "snake-game",
        "dir": "/home/jhin/Documentos/PROJETOS_PARA_TESTAR_LUNA/snake-game",
        "cmd": ["python3", "-m", "http.server", "3104", "--bind", "127.0.0.1"],
        "url": "http://127.0.0.1:3104/",
        "wait": 3,
    },
    {
        "slug": "tetris-luna",
        "dir": "/home/jhin/Documentos/PROJETOS_PARA_TESTAR_LUNA/tetris",
        "cmd": ["python3", "-m", "http.server", "3105", "--bind", "127.0.0.1"],
        "url": "http://127.0.0.1:3105/",
        "wait": 3,
    },
]


def screenshot(url, output):
    subprocess.run(
        [
            "google-chrome",
            "--headless",
            "--disable-gpu",
            "--no-sandbox",
            "--hide-scrollbars",
            "--window-size=1280,720",
            f"--screenshot={output}",
            url,
        ],
        check=True,
        capture_output=True,
    )


def convert_to_jpg(png_path, slug):
    jpg_path = os.path.join(THUMB_DIR, f"{slug}.jpg")
    img = Image.open(png_path)
    img = img.convert("RGB")
    img.save(jpg_path, "JPEG", quality=90)
    os.remove(png_path)
    return jpg_path


def main():
    for app in APPS:
        slug = app["slug"]
        jpg_path = os.path.join(THUMB_DIR, f"{slug}.jpg")
        if os.path.exists(jpg_path) and os.path.getsize(jpg_path) > 10000:
            print(f"[skip] {slug} já existe")
            continue

        print(f"[start] {slug}...")
        proc = subprocess.Popen(
            app["cmd"],
            cwd=app["dir"],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            start_new_session=True,
        )
        try:
            time.sleep(app["wait"])
            png_path = f"/tmp/thumb-{slug}.png"
            screenshot(app["url"], png_path)
            jpg_path = convert_to_jpg(png_path, slug)
            print(f"[ok] {slug} -> {jpg_path}")
        except Exception as e:
            print(f"[erro] {slug}: {e}")
        finally:
            os.killpg(os.getpgid(proc.pid), signal.SIGTERM)
            try:
                proc.wait(timeout=3)
            except subprocess.TimeoutExpired:
                os.killpg(os.getpgid(proc.pid), signal.SIGKILL)


if __name__ == "__main__":
    main()

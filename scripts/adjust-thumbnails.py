#!/usr/bin/env python3
"""
Reaplica crop/posicao/zoom nas thumbnails ja geradas usando scripts/thumbnail-config.json.
Preserva o conteudo existente e so reposiciona.
"""
import json
import os
from PIL import Image

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONFIG_PATH = os.path.join(BASE_DIR, "scripts", "thumbnail-config.json")
THUMB_DIR = os.path.join(BASE_DIR, "public", "thumbnails")
SOURCE_DIR = os.path.join(THUMB_DIR, "_sources")
TARGET_W, TARGET_H = 1280, 720


def load_config():
    with open(CONFIG_PATH) as f:
        return json.load(f)


def get_config(slug, app_type, cfg):
    result = dict(cfg["default"])
    if app_type in cfg.get("byType", {}):
        result.update(cfg["byType"][app_type])
    if slug in cfg.get("bySlug", {}):
        # pula campos de anotacao
        overrides = {k: v for k, v in cfg["bySlug"][slug].items() if not k.startswith("_") and k != "note"}
        result.update(overrides)
    return result


def apply_crop(img, cfg):
    zoom = float(cfg.get("zoom", 1.0))
    v_align = cfg.get("v_align", "top")
    h_align = cfg.get("h_align", "center")
    offset_y = float(cfg.get("offset_y_percent", 0))
    offset_x = float(cfg.get("offset_x_percent", 0))

    img_w, img_h = img.size

    # Aplica zoom: redimensiona a imagem original
    if zoom != 1.0:
        new_w = int(img_w * zoom)
        new_h = int(img_h * zoom)
        img = img.resize((new_w, new_h), Image.LANCZOS)
        img_w, img_h = img.size

    target_ratio = TARGET_W / TARGET_H
    img_ratio = img_w / img_h

    if img_ratio > target_ratio:
        # imagem mais larga: ajusta altura, corta laterais
        crop_h = img_h
        crop_w = int(crop_h * target_ratio)
    else:
        # imagem mais alta: ajusta largura, corta vertical
        crop_w = img_w
        crop_h = int(crop_w / target_ratio)

    # Alinhamento vertical
    if v_align == "top":
        top = 0
    elif v_align == "bottom":
        top = img_h - crop_h
    else:  # center
        top = (img_h - crop_h) // 2

    # Alinhamento horizontal
    if h_align == "left":
        left = 0
    elif h_align == "right":
        left = img_w - crop_w
    else:  # center
        left = (img_w - crop_w) // 2

    # Aplica offsets percentuais (limitado para nao sair da imagem)
    max_offset_y = img_h - crop_h - top if offset_y > 0 else top
    max_offset_x = img_w - crop_w - left if offset_x > 0 else left

    top = int(top + (offset_y / 100) * img_h)
    left = int(left + (offset_x / 100) * img_w)

    # Clamp
    top = max(0, min(top, img_h - crop_h))
    left = max(0, min(left, img_w - crop_w))

    return img.crop((left, top, left + crop_w, top + crop_h)).resize((TARGET_W, TARGET_H), Image.LANCZOS)


def main():
    cfg = load_config()

    # Carrega tipos dos apps do mock-data
    app_types = {}
    mock_path = os.path.join(BASE_DIR, "src", "lib", "mock-data.ts")
    with open(mock_path) as f:
        text = f.read()
    import re
    for m in re.finditer(r'makeApp\(\s*"[^"]+",\s*"([^"]+)"\s*,\s*"[^"]+"\s*,\s*"[^"]+"\s*,\s*"[^"]+"\s*,\s*"[^"]+"\s*,\s*"([^"]+)"', text):
        app_types[m.group(1)] = m.group(2)

    source_dir = SOURCE_DIR if os.path.isdir(SOURCE_DIR) else THUMB_DIR
    files = sorted([f for f in os.listdir(source_dir) if f.endswith(".jpg") and not f.startswith("_")])
    for fname in files:
        slug = fname[:-4]
        app_type = app_types.get(slug, "sistema")
        thumb_cfg = get_config(slug, app_type, cfg)

        src_path = os.path.join(source_dir, fname)
        dst_path = os.path.join(THUMB_DIR, fname)
        img = Image.open(src_path)
        new_img = apply_crop(img, thumb_cfg)
        new_img = new_img.convert("RGB")
        new_img.save(dst_path, "JPEG", quality=90)
        print(f"[ok] {slug}: v={thumb_cfg['v_align']} h={thumb_cfg['h_align']} zoom={thumb_cfg['zoom']} y={thumb_cfg.get('offset_y_percent', 0)} x={thumb_cfg.get('offset_x_percent', 0)}")


if __name__ == "__main__":
    main()

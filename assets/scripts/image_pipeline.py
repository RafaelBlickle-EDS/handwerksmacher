#!/usr/bin/env python3
"""
Simple image pipeline: generate thumbnails and WebP variants from originals.
Usage:
  pip install -r assets/scripts/requirements.txt
  python3 assets/scripts/image_pipeline.py

Outputs to:
  assets/images/thumbs/  (600px max)
  assets/images/webp/    (original size as .webp)

Note: preserves existing filenames, creates output dirs if missing.
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent / 'images'
ORIG = ROOT / 'originals'
THUMBS = ROOT / 'thumbs'
WEBP = ROOT / 'webp'
THUMBS.mkdir(parents=True, exist_ok=True)
WEBP.mkdir(parents=True, exist_ok=True)

def make_thumb(p: Path, maxw=600):
    try:
        im = Image.open(p)
        im.convert('RGB')
        w,h = im.size
        if w > maxw:
            nh = int(h * (maxw / w))
            im = im.resize((maxw, nh), Image.LANCZOS)
        out = THUMBS / (p.stem + '-' + str(maxw) + p.suffix)
        im.save(out, quality=85)
        print('thumb ->', out)
    except Exception as e:
        print('thumb fail', p, e)

def make_webp(p: Path):
    try:
        im = Image.open(p)
        rgb = im.convert('RGB')
        out = WEBP / (p.stem + '.webp')
        rgb.save(out, 'WEBP', quality=85)
        print('webp ->', out)
    except Exception as e:
        print('webp fail', p, e)

if __name__ == '__main__':
    imgs = list(ORIG.glob('*'))
    print('Found', len(imgs), 'originals')
    for p in imgs:
        if p.suffix.lower() in ['.svg']:
            # skip svg conversion
            continue
        make_thumb(p)
        make_webp(p)

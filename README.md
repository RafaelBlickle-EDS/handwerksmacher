Tröster Haustechnik — Local dev & image pipeline

Local server

```bash
python3 -m http.server 8001 --bind 127.0.0.1
# then open http://127.0.0.1:8001/
```

Create thumbnails and WebP images (requires Python and Pillow):

```bash
python3 -m pip install -r assets/scripts/requirements.txt
python3 assets/scripts/image_pipeline.py
```

Screenshots (uses Playwright/Chromium locally if you want automated captures). Alternatively, use the built-in screenshots created by the dev agent when previewing locally.

Lightbox controls: click image → opens overlay; use `ESC` to close; use left/right arrows or the on-screen arrows to navigate.

ToDo / Next steps
- Replace raster logo with hand-crafted SVG if needed.
- Optionally convert thumbnails to modern formats on build (e.g. WebP/AVIF) in pipeline above.

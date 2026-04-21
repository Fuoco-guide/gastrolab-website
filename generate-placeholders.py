#!/usr/bin/env python3
"""
Generate dark placeholder images for The Gastro Lab website.
No external dependencies — pure Python stdlib only.
Run: python3 generate-placeholders.py
"""

import struct, zlib, os

def write_png(path, w, h, r, g, b):
    """Write a solid-colour PNG. Names end in .jpg — browsers read magic bytes, not extensions."""
    def chunk(t, d):
        c = t + d
        return struct.pack('>I', len(d)) + c + struct.pack('>I', zlib.crc32(c) & 0xffffffff)
    sig  = b'\x89PNG\r\n\x1a\n'
    ihdr = chunk(b'IHDR', struct.pack('>IIBBBBB', w, h, 8, 2, 0, 0, 0))
    row  = b'\x00' + bytes([r, g, b] * w)
    idat = chunk(b'IDAT', zlib.compress(row * h, 9))
    iend = chunk(b'IEND', b'')
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'wb') as f:
        f.write(sig + ihdr + idat + iend)

# (path, width, height, R, G, B)  — all values are dark, warm tones
IMAGES = [
    ('images/hero.jpg',           1920, 1080,  18, 13,  9),
    ('images/services-hero.jpg',  1920, 1080,  15, 11,  8),
    ('images/about-hero.jpg',     1920,  900,  20, 15, 10),
    ('images/about-portrait.jpg',  800, 1067,  26, 19, 13),
    ('images/gallery-1.jpg',       600,  840,  22, 16, 11),
    ('images/gallery-2.jpg',       600,  840,  31, 22, 14),
    ('images/gallery-3.jpg',       600,  840,  19, 14, 10),
    ('images/gallery-4.jpg',       600,  840,  28, 20, 13),
    ('images/gallery-5.jpg',       600,  840,  24, 17, 11),
    ('images/gallery-6.jpg',       600,  840,  17, 13,  9),
    ('images/gallery-7.jpg',       600,  840,  34, 25, 16),
    ('images/gallery-8.jpg',       600,  840,  21, 15, 10),
    ('images/blog-1.jpg',          800,  520,  25, 18, 12),
    ('images/blog-2.jpg',          800,  520,  20, 15, 10),
    ('images/blog-3.jpg',          800,  520,  30, 21, 14),
    ('images/service-1.jpg',       800, 1000,  23, 17, 11),
    ('images/service-2.jpg',       800, 1000,  28, 20, 13),
    ('images/service-3.jpg',       800, 1000,  20, 15,  9),
    ('images/service-4.jpg',       800, 1000,  32, 24, 15),
]

if __name__ == '__main__':
    print('Generating placeholder images…')
    for path, w, h, r, g, b in IMAGES:
        write_png(path, w, h, r, g, b)
        print(f'  {path}  ({w}×{h})')
    print(f'\n✓  {len(IMAGES)} images created in images/')

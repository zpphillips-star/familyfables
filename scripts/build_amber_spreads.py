"""
Build 18 Amber spread images from the text PDF source pages.
Pairs: (6,7), (8,9), (10,11), (12,13), (14,15), (16,17),
       (18,19), (20,21), (22,23), (24,25), (26,27), (28,29),
       (30,31), (32,33), (34,35), (36,37), (38,39), (40,41)
"""
from PIL import Image
import os

src = r'C:\Users\zaphilli\source\repos\ff-work\public\images\reader\amber-dragon-keeper\source-pages'
out = r'C:\Users\zaphilli\source\repos\ff-work\public\images\reader\amber-dragon-keeper'

pairs = [
    (6,7), (8,9), (10,11), (12,13), (14,15), (16,17),
    (18,19), (20,21), (22,23), (24,25), (26,27), (28,29),
    (30,31), (32,33), (34,35), (36,37), (38,39), (40,41),
]

for spread_num, (left, right) in enumerate(pairs, 1):
    l_path = os.path.join(src, f'p{left:02d}.jpg')
    r_path = os.path.join(src, f'p{right:02d}.jpg')
    
    img_l = Image.open(l_path)
    img_r = Image.open(r_path)
    
    # Ensure same height
    w, h = img_l.size
    if img_r.size[1] != h:
        img_r = img_r.resize((img_r.size[0], h), Image.LANCZOS)
    
    spread = Image.new('RGB', (img_l.width + img_r.width, h))
    spread.paste(img_l, (0, 0))
    spread.paste(img_r, (img_l.width, 0))
    
    out_path = os.path.join(out, f'page-{spread_num:02d}.jpg')
    spread.save(out_path, 'JPEG', quality=92)
    print(f'Spread {spread_num:02d}: p{left:02d}+p{right:02d} → {out_path}')

print('Done — 18 spreads generated.')

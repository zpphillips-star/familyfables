from rembg import remove, new_session
from PIL import Image
import io, os

src      = r"C:\Users\zaphilli\OneDrive\Family Fables\FF COPY\Books\Dream Ideas\1779127961030.png"
dst_proj = r"C:\Users\zaphilli\projects\familyfables\public\images\characters\dream-ideas-hero-nobg.png"
dst_od   = r"C:\Users\zaphilli\OneDrive\Family Fables\FF COPY\Books\Dream Ideas\1779127961030-nobg.png"

with open(src, "rb") as f:
    raw = f.read()

# isnet-general-use: best model for illustrated/artistic subjects
session = new_session("isnet-general-use")
result  = remove(raw, session=session)

img = Image.open(io.BytesIO(result)).convert("RGBA")
img.save(dst_proj, dpi=(300, 300))
img.save(dst_od,   dpi=(300, 300))

print(f"Done — {img.size[0]}x{img.size[1]}px @ 300 DPI, transparent background")
print(f"Project:  {dst_proj}")
print(f"OneDrive: {dst_od}")


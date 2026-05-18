from rembg import remove, new_session
from PIL import Image
import io

src = r"C:\Users\zaphilli\OneDrive\Family Fables\FF COPY\Books\Dream Ideas\dreamideasheroimage.png"
dst_project = r"C:\Users\zaphilli\projects\familyfables\public\images\characters\dream-ideas-hero-nobg.png"
dst_onedrive = r"C:\Users\zaphilli\OneDrive\Family Fables\FF COPY\Books\Dream Ideas\dreamideasheroimage-nobg-300dpi.png"

with open(src, "rb") as f:
    img_bytes = f.read()

# isnet-general-use is better than u2net at preserving complex objects like the blue pillow
session = new_session("isnet-general-use")
result_bytes = remove(
    img_bytes,
    session=session,
    alpha_matting=True,
    alpha_matting_foreground_threshold=240,
    alpha_matting_background_threshold=10,
    alpha_matting_erode_size=10,
)

result_img = Image.open(io.BytesIO(result_bytes)).convert("RGBA")
result_img.save(dst_project, dpi=(300, 300))
result_img.save(dst_onedrive, dpi=(300, 300))

print(f"Done — {result_img.size[0]}x{result_img.size[1]}px @ 300 DPI")
print(f"Project:  {dst_project}")
print(f"OneDrive: {dst_onedrive}")

from PIL import Image

src = r"C:\Users\zaphilli\OneDrive\Family Fables\FF COPY\Books\Dream Ideas\dreamideasheroimage.png"
dst_project = r"C:\Users\zaphilli\projects\familyfables\public\images\characters\dream-ideas-hero-nobg.png"
dst_onedrive = r"C:\Users\zaphilli\OneDrive\Family Fables\FF COPY\Books\Dream Ideas\dreamideasheroimage-300dpi.png"

# Original already has transparent background — just set 300 DPI metadata
img = Image.open(src).convert("RGBA")
img.save(dst_project, dpi=(300, 300))
img.save(dst_onedrive, dpi=(300, 300))

print(f"Done — {img.size[0]}x{img.size[1]}px @ 300 DPI (original transparency preserved)")
print(f"Project:  {dst_project}")
print(f"OneDrive: {dst_onedrive}")

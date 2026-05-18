from PIL import Image
import numpy as np
from scipy import ndimage

src = r"C:\Users\zaphilli\OneDrive\Family Fables\FF COPY\Books\Dream Ideas\dreamideasheroimage.png"
dst_project = r"C:\Users\zaphilli\projects\familyfables\public\images\characters\dream-ideas-hero-nobg.png"
dst_onedrive = r"C:\Users\zaphilli\OneDrive\Family Fables\FF COPY\Books\Dream Ideas\dreamideasheroimage-300dpi.png"

img = Image.open(src).convert("RGBA")
data = np.array(img)

r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]

# Identify pixels that are "white-ish" background (all channels > 220)
white_mask = (r > 220) & (g > 220) & (b > 220)

# Seed from all 4 corners — flood-fill the connected white region from outside in
# This ensures we ONLY remove background white, not white on the rabbit itself
seed = np.zeros(white_mask.shape, dtype=bool)
seed[0, 0] = seed[0, -1] = seed[-1, 0] = seed[-1, -1] = True

# Flood fill: grow connected region from seeds through white pixels
bg_mask = ndimage.binary_propagation(seed, mask=white_mask)

# Slight expansion to clean up any fringe pixels at the edge
bg_mask = ndimage.binary_dilation(bg_mask, iterations=1)

# Set background pixels to fully transparent
data[bg_mask, 3] = 0

result = Image.fromarray(data, "RGBA")
result.save(dst_project, dpi=(300, 300))
result.save(dst_onedrive, dpi=(300, 300))

removed = bg_mask.sum()
total = bg_mask.size
print(f"Done — removed {removed:,} background pixels ({removed/total*100:.1f}% of image)")
print(f"Image size: {result.size[0]}x{result.size[1]} @ 300 DPI")


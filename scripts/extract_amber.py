import fitz
import os

pdf_path = r'C:\Users\zaphilli\OneDrive\Family Fables\FF COPY\Books\Amber the Dragon Keeper\Final Pages\AmberDragonKeeper Copyright.pdf'
out_dir = r'C:\Users\zaphilli\source\repos\ff-work\public\images\reader\amber-dragon-keeper\source-pages'
os.makedirs(out_dir, exist_ok=True)

doc = fitz.open(pdf_path)
print(f'Total pages: {len(doc)}')
for i in range(len(doc)):
    mat = fitz.Matrix(2.0, 2.0)
    pix = doc[i].get_pixmap(matrix=mat)
    out_path = os.path.join(out_dir, f'p{i+1:02d}.jpg')
    pix.save(out_path)
    text = doc[i].get_text().strip()[:60]
    print(f'  p{i+1:02d}: {repr(text) if text else "(no text)"}')
doc.close()
print('Done.')

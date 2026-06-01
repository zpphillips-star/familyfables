import os
import fal_client
from PIL import Image
import io
import urllib.request
import time

os.environ["FAL_KEY"] = "ad7875c7-51ef-40ab-a760-6363ce38a850:c04c7d353048e834f1bd5fbb32477df5"

SOURCE_ROOT = r"C:\Users\zaphilli\Documents\projects\familyfables-site\public\images\reader"
OUTPUT_ROOT = r"C:\Users\zaphilli\Documents\projects\familyfables-site\public\coloring-pages"

PROMPT = "Convert to a children's coloring book page. Pure black ink outlines on a pure white background only. Remove all color, all shading, all texture, all background fills. Every character and object as clean single-stroke outlines only. No gray. No color. No texture. White background, black lines."

BOOKS = {
    "brian-the-ghost": ["page-006.jpg", "page-012.jpg", "page-014.jpg", "page-015.jpg", "page-032.jpg"],
    "dream-ideas": ["page-04.jpg", "page-05.jpg", "page-12.jpg", "page-13.jpg", "page-14.jpg"],
    "finding-hampton": ["page-07.jpg", "page-08.jpg", "page-10.jpg", "page-24.jpg", "page-26.jpg"],
    "frog-a-dog": ["page-05.jpg", "page-08.jpg", "page-09.jpg", "page-11.jpg", "page-15.jpg"],
    "gilroys-gobble": ["page-006.jpg", "page-008.jpg", "page-023.jpg", "page-029.jpg", "page-031.jpg"],
    "ollie-come-home": ["page-007.jpg", "page-019.jpg", "page-026.jpg", "page-030.jpg", "page-033.jpg"],
    "one-tom-turkey": ["page-004.jpg", "page-006.jpg", "page-008.jpg", "page-009.jpg", "page-012.jpg"],
    "poo-poo-face": ["page-005.jpg", "page-008.jpg", "page-011.jpg", "page-013.jpg", "page-015.jpg"],
    "the-shut-in-button": ["page-011.jpg", "page-018.jpg", "page-023.jpg", "page-035.jpg", "page-045.jpg"],
    "what-a-doodle-do": ["page-015.jpg", "page-020.jpg", "page-022.jpg", "page-029.jpg", "page-032.jpg"],
}

def process_page(input_path, output_path, page_num, book):
    if os.path.exists(output_path):
        print(f"  ⏭️  Already exists, skipping: {output_path}")
        return True
    
    print(f"  🎨 Processing: {input_path}")
    
    # Step 1: Load and resize to 1024x1024
    img = Image.open(input_path)
    img = img.resize((1024, 1024), Image.LANCZOS)
    temp_path = input_path + "_temp_1024.jpg"
    img.save(temp_path, "JPEG", quality=90)
    
    # Step 2: Upload
    image_url = fal_client.upload_file(temp_path)
    os.remove(temp_path)
    print(f"  📤 Uploaded: {image_url}")
    
    # Step 3: Call GPT Image 2 Edit (image-to-image editing)
    args = {"prompt": PROMPT, "image_urls": [image_url], "quality": "medium", "image_size": "square_hd"}
    try:
        result = fal_client.subscribe("openai/gpt-image-2/edit", arguments=args)
    except Exception as e1:
        print(f"  ⚠️  subscribe failed ({e1}), trying run...")
        try:
            result = fal_client.run("openai/gpt-image-2/edit", arguments=args)
        except Exception as e2:
            print(f"  ❌ Both failed: {e2}")
            return False
    
    # Step 4: Download result
    output_url = result["images"][0]["url"]
    print(f"  📥 Downloading from: {output_url}")
    with urllib.request.urlopen(output_url) as response:
        result_img = Image.open(io.BytesIO(response.read()))
        result_img = result_img.copy()
    
    # Steps 4-8: Post-process
    result_img = result_img.convert("L")
    result_img = result_img.resize((2550, 2550), Image.LANCZOS)
    result_img = result_img.point(lambda x: 0 if x < 200 else 255)
    result_img = result_img.point(lambda x: 255 if x > 220 else x)
    
    # Step 9: Save
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    result_img.save(output_path, dpi=(300, 300))
    print(f"  ✅ Saved: {output_path}")
    return True

errors = []
for book, pages in BOOKS.items():
    print(f"\n📚 Processing book: {book}")
    for i, src_file in enumerate(pages, 1):
        input_path = os.path.join(SOURCE_ROOT, book, src_file)
        output_path = os.path.join(OUTPUT_ROOT, book, f"page-{i:02d}.png")
        
        if os.path.exists(output_path):
            print(f"  ⏭️  page-{i:02d}.png already exists, skipping")
            continue
        
        try:
            success = process_page(input_path, output_path, i, book)
            if not success:
                errors.append(f"{book}/{src_file}")
        except Exception as e:
            print(f"  ❌ ERROR on {book}/{src_file}: {e}")
            errors.append(f"{book}/{src_file}: {e}")
        
        time.sleep(10)

print(f"\n\n✅ DONE!")
if errors:
    print(f"❌ Errors ({len(errors)}):")
    for e in errors:
        print(f"  - {e}")
else:
    print("No errors!")

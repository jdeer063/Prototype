from rembg import remove
from PIL import Image
import os

images = [
    "nike_air_max_solo_v1_1774746144920.png",
    "lebron_21_orange_v1_1774746209076.png",
    "adidas_superstar_classic_v1_1774746288243.png",
    "shoebedoo_logo_transparent_v1_1774746100465.png"
]

for img_path in images:
    if not os.path.exists(img_path):
        print(f"Skipping {img_path}, not found.")
        continue
    
    out_name = f"iso_{img_path}"
    print(f"Processing {img_path} -> {out_name}")
    try:
        input_img = Image.open(img_path)
        output_img = remove(input_img).convert("RGBA")
        output_img.save(out_name)
        print("Success!")
    except Exception as e:
        print(f"Error: {e}")

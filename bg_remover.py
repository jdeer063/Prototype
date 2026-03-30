from rembg import remove
from PIL import Image
import os

def process_image(input_path, output_path):
    print(f"Processing {input_path} -> {output_path}...")
    try:
        if not os.path.exists(input_path):
            print(f"File not found: {input_path}")
            return
        input = Image.open(input_path)
        output = remove(input)
        # convert to RGBA if not already
        output = output.convert("RGBA")
        output.save(output_path)
        print("Success!")
    except Exception as e:
        print(f"Failed {input_path}: {e}")

images = [
    "court_vision_1774860908864.png",
    "chuck_70_1774860960404.png",
    "classic_loafer_1774860992874.png",
    "timberland_pro_1774861014928.png",
    "elegant_stilettos_1774861038439.png",
    "assets/court-vision.jpg",
    "assets/chuck-70.png",
    "assets/classic-loafer.jpg",
    "assets/timberland-pro.jpg",
    "assets/stilitoes.jpg",
    "assets/strappy-sandals.jpg",
    "assets/old-school.jpg",
    "assets/merrell-moab-3.jpg",
    "assets/classic-clog.jpg",
    "assets/ball.jpg"
]

for img in images:
    if "assets/" in img:
        out_name = img.replace(".jpg", ".png").replace("assets/", "iso_")
        if out_name.endswith(".png.png"): out_name = out_name.replace(".png.png", ".png")
    else:
        out_name = "iso_" + img
    
    # Process both generated images and original assets if they exist
    process_image(img, out_name)

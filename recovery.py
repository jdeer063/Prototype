import os

def fix_file(filepath):
    print(f"Fixing {filepath}...")
    try:
        with open(filepath, 'rb') as f:
            data = f.read()
        
        # This is a common pattern for mojibake recovery
        # 1. Take the corrupted UTF-8 bytes
        # 2. Treat them as CP1252 bytes and encode them (this gets the original UTF-8 bytes)
        # 3. Decode as UTF-8
        # However, some parts might be already UTF-8. 
        # So we do a safe replacement of common patterns.
        
        # Mappings of corrupted byte sequences to correct ones
        # Use hex to be sure
        replacements = [
            (b'\xc3\xb0\xc5\xb8\xc2\xa0', '🏠'.encode('utf8')), # Home
            (b'\xc3\xb0\xc5\xb8\xc2\x9b\xc2\x92', '🛒'.encode('utf8')), # Cart
            (b'\xc3\xb0\xc5\xb8\xc2\x94\xc2\x9d', '🔍'.encode('utf8')), # Explore
            (b'\xc3\xb0\xc5\xb8\xc2\x93\xc2\xa6', '📦'.encode('utf8')), # Orders
            (b'\xc3\xb0\xc5\xb8\xc2\x91\xc2\xa4', '👤'.encode('utf8')), # Me
            (b'\xc3\xa2\xc2\x82\xc2\xb1', '₱'.encode('utf8')), # Peso
            (b'\xc3\xb0\xc5\xb8\xc2\x94\xc2\x8d', '🔍'.encode('utf8')), # Search
            (b'\xc3\xb0\xc5\xb8\xc2\x93\xc2\xb7', '📷'.encode('utf8')), # Camera
            (b'\xc3\xb0\xc5\xb8\xc2\xa8\xc2\x94', '🔔'.encode('utf8')), # Notify
            (b'\xc3\xb0\xc5\xb8\xc2\x92\xc2\xac', '💬'.encode('utf8')), # Message
        ]
        
        for old, new in replacements:
            data = data.replace(old, new)
            
        with open(filepath, 'wb') as f:
            f.write(data)
        print("Done.")
    except Exception as e:
        print(f"Error: {e}")

fix_file(r'c:\Users\ACER\Downloads\PROTOTYPE\index.html')
fix_file(r'c:\Users\ACER\Downloads\PROTOTYPE\scripts.js')
fix_file(r'c:\Users\ACER\Downloads\PROTOTYPE\styles.css')

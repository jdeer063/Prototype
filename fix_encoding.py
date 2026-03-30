import sys
import shutil

def fix_mojibake(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    if content.startswith('\ufeff'):
        content = content[1:]

    # Build a translation table decoding hybrid cp1252 / latin-1
    # For every char c, if c is in cp1252, we use cp1252 byte.
    # If not, we fall back to latin-1 byte.
    res_bytes = bytearray()
    for char in content:
        try:
            res_bytes += char.encode('cp1252')
        except UnicodeEncodeError:
            try:
                # If cp1252 fails, maybe it's a latin-1 control char that leaked through
                # like U+0090 -> \x90
                res_bytes += char.encode('latin-1')
            except UnicodeEncodeError:
                # If it's totally unmappable back to 1 byte, we just leave it alone?
                # This might happen if there are real UTF-8 characters that were added later.
                # In this case, we'll try to just append the utf-8 bytes. But this breaks the flow.
                # Actually, if there's a real unicode character added after corruption, it shouldn't
                # be decoded. For now, let's just use utf-8 bytes.
                res_bytes += char.encode('utf-8')

    try:
        # Decode the recovered bytes as utf-8
        fixed_string = res_bytes.decode('utf-8')
        
        # Backup original
        shutil.copy(filename, filename + '.bak')
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(fixed_string)
        print("Success for " + filename)
    except Exception as e:
        print("Error during final decode in " + filename + ":", e)

fix_mojibake(r'c:\Users\ACER\Downloads\PROTOTYPE\index.html')
fix_mojibake(r'c:\Users\ACER\Downloads\PROTOTYPE\scripts.js')
fix_mojibake(r'c:\Users\ACER\Downloads\PROTOTYPE\styles.css')

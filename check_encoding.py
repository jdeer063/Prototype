import sys

def check_file(path):
    try:
        with open(path, 'rb') as f:
            content = f.read()
            print(f"File size: {len(content)} bytes")
            # Look for pd-emoji and print surrounding bytes
            idx = content.find(b'id="pd-emoji"')
            if idx != -1:
                print(f"Found 'pd-emoji' at index {idx}")
                start = max(0, idx - 100)
                end = min(len(content), idx + 100)
                print(f"Context: {content[start:end]}")
            else:
                print("'pd-emoji' not found in raw bytes")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_file(r'c:\Users\ACER\Downloads\PROTOTYPE\index.html')

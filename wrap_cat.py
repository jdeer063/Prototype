with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

header_str = """<!-- Category section wrapper -->
              <div class="cat-section-wrap">
                <div class="cat-section-title">
                  <span style="font-size:18px">✨</span> Categories of Shoes
                </div>
                <div class="cat-scroll-wrap">"""

html = html.replace('<!-- Category icons -->\n              <div class="cat-scroll-wrap">', header_str)
html = html.replace('<!-- Free Delivery Banner -->', '</div>\n              <!-- Free Delivery Banner -->')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

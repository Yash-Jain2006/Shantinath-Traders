import re

with open(r'd:\Shop\frontend\src\data\products.js', 'r', encoding='utf-8') as f:
    content = f.read()

def repl(m):
    pid = m.group(1)
    return f'id: "{pid}",\n    image: "/images/products/{pid}.jpg",'

new_content = re.sub(r'id:\s*["\']([^"\']+)["\'],', repl, content)

with open(r'd:\Shop\frontend\src\data\products.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Updated frontend/src/data/products.js successfully!")


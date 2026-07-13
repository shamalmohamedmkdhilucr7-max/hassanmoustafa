import re
with open('index.html', 'r', encoding='utf-8') as f:
    index_content = f.read()

match = re.search(r'(<!-- Chinese Vehicles -->.*?</div>\s*</div>)', index_content, re.DOTALL)
if match:
    print(match.group(1))

with open('spare-parts.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()
for i, line in enumerate(lines):
    if '<!--' in line or '</section>' in line or '<footer' in line:
        print(f"{i+1}: {line.strip()}")

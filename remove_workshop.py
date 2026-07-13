with open('spare-parts.html', 'r', encoding='utf-8') as f:
    content = f.read()

target = '                    <span class="text-[9px] text-on-surface-variant font-mono mt-1">Workshop</span>\n'
if target in content:
    content = content.replace(target, '')
    with open('spare-parts.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Success")
else:
    # Try alternative spacing just in case
    import re
    content = re.sub(r'\s*<span class="text-\[9px\] text-on-surface-variant font-mono mt-1">Workshop</span>', '', content)
    with open('spare-parts.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Success via regex")

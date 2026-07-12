import os
import re

directory = '.'
html_files = [f for f in os.listdir(directory) if f.endswith('.html')]

for file_name in html_files:
    filepath = os.path.join(directory, file_name)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Fix the duplicate phone lines in footer blocks
    new_content = re.sub(r'(\+971 52 244 1866\s*)<br>(\s*\+971 52 244 1866)', r'\1', content)
    
    # Fix the duplicate contact tel links in contact.html
    new_content = re.sub(
        r'<a href="tel:\+971522441866"[^>]*>\+971 52 244 1866</a>\s*<br>\s*<a href="tel:\+971 52 244 1866"[^>]*>\+971 52 244 1866</a>',
        r'<a href="tel:+971522441866" class="hover:text-white transition-colors">+971 52 244 1866</a>',
        new_content
    )
        
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed {file_name}")

print("Done.")

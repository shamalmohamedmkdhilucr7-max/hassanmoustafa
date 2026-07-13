with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Restore mix-blend-screen and scale-[1.7] for ROX in index.html
old_rox = '<img src="assets/images/brands/rox.jpg" alt="ROX" class="h-10 w-20 object-contain mx-auto mb-2 filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity">'
new_rox = '<img src="assets/images/brands/rox.jpg" alt="ROX" class="h-10 w-20 object-contain mx-auto mb-2 mix-blend-screen opacity-80 group-hover:opacity-100 transition-all duration-300 transform scale-[1.7] group-hover:scale-[1.8]">'

if old_rox in content:
    content = content.replace(old_rox, new_rox)
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Fixed ROX in index.html")
else:
    print("Could not find old ROX string")

import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace ROX logo path
content = content.replace('assets/images/brands/rox.png', 'assets/images/brands/rox.jpg')

# Make all logos the same size (bounding box instead of just h-8)
# Replace `h-8 w-auto` with `h-10 w-[80px]` or similar.
# The current class: class="h-8 w-auto object-contain mx-auto mb-2 filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity"
content = content.replace(
    'class="h-8 w-auto object-contain',
    'class="h-10 w-20 object-contain'
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")

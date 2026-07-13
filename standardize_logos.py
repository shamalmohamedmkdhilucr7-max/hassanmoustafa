import re

with open('spare-parts.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace every <img src="assets/images/brands/..." with a version that uses .brand-logo
# We strip h-XX, w-auto/w-XX, object-contain, mx-auto, mb-3.5 from the class
# and replace with brand-logo (the CSS class handles all sizing)
# We preserve filter, opacity, transition, mix-blend-mode classes

def standardize_logo(match):
    full_tag = match.group(0)

    # Extract existing class value
    class_match = re.search(r'class="([^"]*)"', full_tag)
    if not class_match:
        return full_tag

    classes = class_match.group(1).split()

    # Remove sizing-related classes (handled by .brand-logo CSS)
    remove_prefixes = ('h-', 'w-', 'object-contain', 'mx-auto', 'mb-')
    kept = [c for c in classes if not any(c.startswith(p) for p in remove_prefixes)]

    # Add brand-logo as the first class
    new_class = 'brand-logo ' + ' '.join(kept)
    new_class = new_class.strip()

    # Also remove inline style that sets display (not needed)
    new_tag = re.sub(r'class="[^"]*"', f'class="{new_class}"', full_tag)
    return new_tag

# Apply only to brand logo imgs (not other images on the page)
content = re.sub(
    r'<img src="assets/images/brands/[^"]+\.(?:png|jpg|svg)"[^>]+>',
    standardize_logo,
    content
)

with open('spare-parts.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")

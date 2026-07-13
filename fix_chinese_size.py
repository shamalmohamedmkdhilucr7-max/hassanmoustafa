import re

with open('spare-parts.html', 'r', encoding='utf-8') as f:
    content = f.read()

# The Chinese Brands section block — find and update all 7 cards.
# Current Chinese card img class: h-10 w-20 object-contain mx-auto mb-2 filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity
# Target (matching other cards):  h-12 w-auto object-contain mx-auto mb-3.5 filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity

# Current Chinese card name span:  font-display font-bold text-white text-[10px] block uppercase tracking-wider
# Target (matching other cards):   font-display font-bold text-white text-xs block

# ROX has a special class (mix-blend-screen scale), so handle it separately.

# Step 1: Fix the 6 normal Chinese brand logos
content = content.replace(
    'h-10 w-20 object-contain mx-auto mb-2 filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity',
    'h-12 w-auto object-contain mx-auto mb-3.5 filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity'
)

# Step 2: Fix the ROX logo (mix-blend-screen)
content = content.replace(
    'h-10 w-20 object-contain mx-auto mb-2 mix-blend-screen opacity-80 group-hover:opacity-100 transition-all duration-300 transform scale-[1.7] group-hover:scale-[1.8]',
    'h-12 w-auto object-contain mx-auto mb-3.5 mix-blend-screen opacity-80 group-hover:opacity-100 transition-all duration-300'
)

# Step 3: Fix brand name typography (only within Chinese Brands section)
# We need to be surgical — only change the cards in the Chinese Brands section.
# Find the Chinese Brands section block and do the replace within it.
chinese_section_match = re.search(r'(<!-- Chinese Brands -->.*?</div>\s*</div>\s*</div>)', content, re.DOTALL)
if chinese_section_match:
    old_block = chinese_section_match.group(1)
    new_block = old_block.replace(
        'font-display font-bold text-white text-[10px] block uppercase tracking-wider',
        'font-display font-bold text-white text-xs block'
    )
    content = content.replace(old_block, new_block)
    print("Fixed typography in Chinese Brands section")
else:
    print("Warning: Could not find Chinese Brands section for typography fix")

with open('spare-parts.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")

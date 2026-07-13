import re

with open('spare-parts.html', 'r', encoding='utf-8') as f:
    content = f.read()

# ── Step 1: Card containers ─────────────────────────────────────────────
# Home page uses: p-4 rounded-xl min-h-[90px]
# Spare parts uses: p-6 rounded-xl min-h-[160px]
content = content.replace(
    'glass-card-premium group p-6 rounded-xl text-center flex flex-col items-center justify-center min-h-[160px] border-secondary-container/15 shadow-[0_0_15px_rgba(214,4,29,0.03)] hover:border-secondary-container/40 transition-all duration-300',
    'glass-card-premium group p-4 rounded-xl text-center flex flex-col items-center justify-center min-h-[90px] border-secondary-container/15 shadow-[0_0_15px_rgba(214,4,29,0.03)] hover:border-secondary-container/40 transition-all duration-300'
)

# ── Step 2: All logo images ──────────────────────────────────────────────
# Replace brand-logo class with the exact Home page classes: h-10 w-20 object-contain mx-auto mb-2
# We need to do a regex replace on all brand img tags

def fix_img_tag(match):
    full = match.group(0)
    src_match = re.search(r'src="([^"]+)"', full)
    alt_match = re.search(r'alt="([^"]+)"', full)
    style_match = re.search(r'style="([^"]+)"', full)
    class_match = re.search(r'class="([^"]+)"', full)
    
    if not class_match:
        return full
    
    classes = class_match.group(1).split()
    
    # Keep only filter/opacity/transition/mix-blend classes (appearance, not layout)
    keep_prefixes = ('filter', 'brightness-0', 'invert', 'opacity-', 'group-hover:opacity-', 
                     'transition-', 'mix-blend-', 'duration-')
    kept = [c for c in classes if any(c.startswith(p) or c == p for p in keep_prefixes)]
    
    # For cadillac (h-10 w-auto) keep w-auto instead of w-20
    alt = alt_match.group(1) if alt_match else ''
    if alt == 'CADILLAC':
        base = 'h-10 w-auto object-contain mx-auto mb-2'
    else:
        base = 'h-10 w-20 object-contain mx-auto mb-2'
    
    new_class = (base + ' ' + ' '.join(kept)).strip()
    
    new_tag = re.sub(r'class="[^"]*"', f'class="{new_class}"', full)
    return new_tag

content = re.sub(
    r'<img src="assets/images/brands/[^"]+\.(?:png|jpg|svg)"[^>]*>',
    fix_img_tag,
    content
)

# ── Step 3: Brand name spans ─────────────────────────────────────────────
# Home page uses: text-[10px] block uppercase tracking-wider
# Spare parts uses: text-xs block (after earlier fix)
content = content.replace(
    'font-display font-bold text-white text-xs block',
    'font-display font-bold text-white text-[10px] block uppercase tracking-wider'
)

with open('spare-parts.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done — all spare parts cards now match home page exactly")

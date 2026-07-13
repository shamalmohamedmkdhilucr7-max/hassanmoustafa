with open('spare-parts.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix 1: Card container — match p-6 min-h-[160px] like all other vehicle cards
content = content.replace(
    'glass-card-premium group p-4 rounded-xl text-center flex flex-col items-center justify-center min-h-[90px] border-secondary-container/15 shadow-[0_0_15px_rgba(214,4,29,0.03)] hover:border-secondary-container/40 transition-all duration-300',
    'glass-card-premium group p-6 rounded-xl text-center flex flex-col items-center justify-center min-h-[160px] border-secondary-container/15 shadow-[0_0_15px_rgba(214,4,29,0.03)] hover:border-secondary-container/40 transition-all duration-300'
)

# Fix 2: Revert logo to original natural size (h-10 w-auto), matching how other cards present logos
# Other cards have h-12 but that's their natural logo size. 
# User says do NOT enlarge Chinese logos. Keep them at h-10 (original) with w-auto.
# Also fix mb to mb-3.5 to match other cards' logo-to-text spacing.
content = content.replace(
    'class="h-12 w-auto object-contain mx-auto mb-3.5 filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity"',
    'class="h-10 w-auto object-contain mx-auto mb-3.5 filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity"'
)

# Fix ROX logo too (mix-blend-screen variant)
content = content.replace(
    'class="h-12 w-auto object-contain mx-auto mb-3.5 mix-blend-screen opacity-80 group-hover:opacity-100 transition-all duration-300"',
    'class="h-10 w-auto object-contain mx-auto mb-3.5 mix-blend-screen opacity-80 group-hover:opacity-100 transition-all duration-300"'
)

with open('spare-parts.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")

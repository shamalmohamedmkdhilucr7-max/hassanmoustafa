import os
import re

directory = '.'
html_files = [f for f in os.listdir(directory) if f.endswith('.html')]

replacements = [
    # 1. Heritage Card
    (r'Al Quoz, Dubai', 'Industrial 4, Sharjah'),
    (r'Al Quoz Industrial Area 4, Dubai', 'Industrial Area 4, Sharjah'),
    (r'Al Quoz Industrial Area 4,\s*<br>\s*Dubai, United Arab Emirates', 'Industrial Area 4,<br>Sharjah, United Arab Emirates'),
    (r'Al Quoz Industrial Area 4, Dubai, United Arab Emirates', 'Industrial Area 4, Sharjah, United Arab Emirates'),
    (r'Al Quoz 4', 'Industrial 4'),

    # 2. Heritage Heading
    (r"Dubai's Most Trusted", "UAE's Most Trusted"),

    # 3. Pickup & Delivery
    (r'Free Pickup & Delivery', 'Pickup & Delivery'),
    (r'FREE PICKUP & DELIVERY', 'PICKUP & DELIVERY'),
    (r'Free pickup', 'Pickup'),
    (r'free pickup', 'pickup'),

    # 5. Footer Contact Info (Working days)
    (r'Sun: Closed', 'Fri: Closed'),

    # Phone numbers
    (r'\+971\s*56\s*553\s*1646', '+971 52 244 1866'),
    (r'tel:\+971565531646', 'tel:+971522441866'),
    (r'wa\.me/971565531646', 'wa.me/971522441866'),
    
    # Remove duplicate <br>+971 52 244 1866 if it ends up replacing the second number
    (r'\+971 52 244 1866\s*<br>\s*\+971 52 244 1866', '+971 52 244 1866')
]

for file_name in html_files:
    filepath = os.path.join(directory, file_name)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    for pattern, repl in replacements:
        new_content = re.sub(pattern, repl, new_content)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

print("Updates applied.")

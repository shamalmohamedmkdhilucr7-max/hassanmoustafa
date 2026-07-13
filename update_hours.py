import glob

# The old strings to replace
old_string_1 = "Monday - Saturday: 8:00 AM - 1:30 PM & 4:00 PM - 9:00 PM<br>Friday: Closed"
old_string_2 = "Mon–Sat: 8:00 AM – 1:30 PM & 4:00 PM – 9:00 PM<br>Fri: Closed"
old_string_3 = "Mon–Sat: 8:00 AM – 1:30 PM &amp; 4:00 PM – 9:00 PM<br>Fri: Closed"

# The new strings
new_string_long = "Saturday – Thursday<br>8:00 AM – 1:30 PM<br>4:00 PM – 9:00 PM<br><br>Friday<br>Closed"
new_string_short = "Sat–Thu: 8:00 AM – 1:30 PM & 4:00 PM – 9:00 PM<br>Fri: Closed" # Wait, the user specifically provided the exact text layout.
# Let's use exactly what they asked for in all places to be safe, but formatted nicely in HTML.

user_requested_html = "Saturday – Thursday<br>8:00 AM – 1:30 PM<br>4:00 PM – 9:00 PM<br><br>Friday<br>Closed"

for file in glob.glob("*.html"):
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace in contact.html main section
    content = content.replace(old_string_1, user_requested_html)
    # Replace in footer sections across all pages
    content = content.replace(old_string_2, user_requested_html)
    content = content.replace(old_string_3, user_requested_html)

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Updated hours in all HTML files.")

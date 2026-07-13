import re

def remove_chinese_section(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # The section typically looks like:
    # <!-- Chinese Vehicles -->
    # <div class="reveal-item">
    # ...
    # </div>
    #
    # Wait, in index.html it is:
    # <!-- Chinese Vehicles -->
    # <div class="reveal-item">
    #     ...
    #         </div>
    #     </div>
    #
    # And in spare-parts.html it is the same because we copied it exactly.
    
    # We can use regex to match from <!-- Chinese Vehicles --> down to the end of its div.
    # We know the reveal-item div contains a flex heading div and a grid div.
    # A safer way to remove it is:
    # Find the index of "<!-- Chinese Vehicles -->"
    # Read line by line, keep track of div depth.

    lines = content.split('\n')
    new_lines = []
    skip = False
    div_depth = 0
    in_reveal = False

    i = 0
    while i < len(lines):
        line = lines[i]
        
        if '<!-- Chinese Vehicles -->' in line:
            skip = True
            in_reveal = False
            div_depth = 0
            i += 1
            continue
            
        if skip:
            if '<div class="reveal-item">' in line:
                in_reveal = True
                
            if in_reveal:
                div_depth += line.count('<div') - line.count('</div')
                if div_depth == 0:
                    skip = False
            else:
                pass
                
            i += 1
            continue
            
        new_lines.append(line)
        i += 1

    # Cleanup any extra blank lines where it was removed
    cleaned_content = '\n'.join(new_lines)
    # Remove excessive blank lines if they were left
    cleaned_content = re.sub(r'\n{3,}', '\n\n', cleaned_content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(cleaned_content)
    
    print(f"Removed from {filepath}")

remove_chinese_section('index.html')
remove_chinese_section('spare-parts.html')

with open('index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Lines 996 to 1034 (1-indexed, so 995 to 1034 in 0-indexed)
# Wait, let's just find the exact index.
start_idx = -1
end_idx = -1
for i, line in enumerate(lines):
    if '<!-- Chinese Vehicles -->' in line:
        start_idx = i
        break

if start_idx != -1:
    # Find matching closing div for the reveal-item
    # It has a structure: div.reveal-item -> div.flex -> div.grid
    # So we need to capture down to the end of the reveal-item div.
    # The grid div ends, then the reveal-item div ends.
    # We can just count the div open/close tags
    div_depth = 0
    in_reveal = False
    for i in range(start_idx, len(lines)):
        line = lines[i]
        if '<div class="reveal-item">' in line:
            in_reveal = True
        
        if in_reveal:
            div_depth += line.count('<div') - line.count('</div')
            if div_depth == 0:
                end_idx = i
                break
                
if start_idx != -1 and end_idx != -1:
    chinese_html_lines = lines[start_idx:end_idx+1]
    chinese_html = "".join(chinese_html_lines)
    
    # Rename title
    chinese_html = chinese_html.replace('>Chinese Vehicles<', '>Chinese Brands<')
    
    with open('spare-parts.html', 'r', encoding='utf-8') as f:
        spare_content = f.read()

    # The block to append after in spare-parts.html ends with:
    #         </div>
    #     </div>
    # </section>
    
    # Let's find:
    #         <!-- British & SUV -->
    # ... down to the end of that reveal-item
    
    target_str = '        </div>\n    </div>\n</section>'
    replacement = f'        </div>\n\n{chinese_html}\n    </div>\n</section>'
    
    if target_str in spare_content:
        spare_content = spare_content.replace(target_str, replacement)
        with open('spare-parts.html', 'w', encoding='utf-8') as f:
            f.write(spare_content)
        print("Successfully injected into spare-parts.html")
    else:
        print("Could not find insertion point in spare-parts.html")
else:
    print("Could not extract Chinese Vehicles section")

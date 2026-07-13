import re

with open('index.html', 'r', encoding='utf-8') as f:
    index_content = f.read()

# Extract Chinese Vehicles section from index.html
match = re.search(r'(<!-- Chinese Vehicles -->.*?</div>\s*</div>)', index_content, re.DOTALL)
if match:
    chinese_html_raw = match.group(1)
    
    # We want to change the title to match naming convention, maybe "Chinese Brands"
    # But user said: "Reuse the exact same card component from the Homepage."
    # The title in index.html is: <span class="...">Chinese Vehicles</span>
    # I'll change the text to "Chinese Brands"
    chinese_html = chinese_html_raw.replace('>Chinese Vehicles<', '>Chinese Brands<')
    
    # We need to insert this right before the end of the brand categories section in spare-parts.html
    # In spare-parts.html, the brand categories end at line 240: </div>\n</section>
    with open('spare-parts.html', 'r', encoding='utf-8') as f:
        spare_content = f.read()

    # Find where to insert: right after the closing </div> of the "British & SUV" block, before the final </div>\n</section>
    # We can split by `        </div>\n    </div>\n</section>\n\n<!-- PARTS CATEGORIES -->`
    
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
    print("Could not find Chinese Vehicles section in index.html")

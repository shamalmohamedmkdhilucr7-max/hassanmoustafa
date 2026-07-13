import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Define the HTML snippet to insert
chinese_html = """
        <!-- Chinese Vehicles -->
        <div class="reveal-item">
            <div class="flex items-center gap-4 mb-6">
                <div class="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                <span class="font-mono text-[9px] text-secondary-container uppercase tracking-[0.25em] font-bold shrink-0">Chinese Vehicles</span>
                <div class="h-px flex-1 bg-gradient-to-l from-transparent via-white/10 to-transparent"></div>
            </div>
            <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                <div class="glass-card-premium group p-4 rounded-xl text-center flex flex-col items-center justify-center min-h-[90px] border-secondary-container/15 shadow-[0_0_15px_rgba(214,4,29,0.03)] hover:border-secondary-container/40 transition-all duration-300">
                    <img src="assets/images/brands/byd.svg" alt="BYD" class="h-10 w-20 object-contain mx-auto mb-2 filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity">
                    <span class="font-display font-bold text-white text-[10px] block uppercase tracking-wider">BYD</span>
                </div>
                <div class="glass-card-premium group p-4 rounded-xl text-center flex flex-col items-center justify-center min-h-[90px] border-secondary-container/15 shadow-[0_0_15px_rgba(214,4,29,0.03)] hover:border-secondary-container/40 transition-all duration-300">
                    <img src="assets/images/brands/jetour.svg" alt="JETOUR" class="h-10 w-20 object-contain mx-auto mb-2 filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity">
                    <span class="font-display font-bold text-white text-[10px] block uppercase tracking-wider">JETOUR</span>
                </div>
                <div class="glass-card-premium group p-4 rounded-xl text-center flex flex-col items-center justify-center min-h-[90px] border-secondary-container/15 shadow-[0_0_15px_rgba(214,4,29,0.03)] hover:border-secondary-container/40 transition-all duration-300">
                    <img src="assets/images/brands/geely.png" alt="GEELY" class="h-10 w-20 object-contain mx-auto mb-2 filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity">
                    <span class="font-display font-bold text-white text-[10px] block uppercase tracking-wider">GEELY</span>
                </div>
                <div class="glass-card-premium group p-4 rounded-xl text-center flex flex-col items-center justify-center min-h-[90px] border-secondary-container/15 shadow-[0_0_15px_rgba(214,4,29,0.03)] hover:border-secondary-container/40 transition-all duration-300">
                    <img src="assets/images/brands/changan.png" alt="CHANGAN" class="h-10 w-20 object-contain mx-auto mb-2 filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity">
                    <span class="font-display font-bold text-white text-[10px] block uppercase tracking-wider">CHANGAN</span>
                </div>
                <div class="glass-card-premium group p-4 rounded-xl text-center flex flex-col items-center justify-center min-h-[90px] border-secondary-container/15 shadow-[0_0_15px_rgba(214,4,29,0.03)] hover:border-secondary-container/40 transition-all duration-300">
                    <img src="assets/images/brands/mg.svg" alt="MG" class="h-10 w-20 object-contain mx-auto mb-2 filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity">
                    <span class="font-display font-bold text-white text-[10px] block uppercase tracking-wider">MG</span>
                </div>
                <div class="glass-card-premium group p-4 rounded-xl text-center flex flex-col items-center justify-center min-h-[90px] border-secondary-container/15 shadow-[0_0_15px_rgba(214,4,29,0.03)] hover:border-secondary-container/40 transition-all duration-300">
                    <img src="assets/images/brands/jac.png" alt="JAC" class="h-10 w-20 object-contain mx-auto mb-2 filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity">
                    <span class="font-display font-bold text-white text-[10px] block uppercase tracking-wider">JAC</span>
                </div>
                <div class="glass-card-premium group p-4 rounded-xl text-center flex flex-col items-center justify-center min-h-[90px] border-secondary-container/15 shadow-[0_0_15px_rgba(214,4,29,0.03)] hover:border-secondary-container/40 transition-all duration-300">
                    <img src="assets/images/brands/rox.jpg" alt="ROX" class="h-10 w-20 object-contain mx-auto mb-2 mix-blend-screen opacity-80 group-hover:opacity-100 transition-all duration-300 transform scale-[1.7] group-hover:scale-[1.8]">
                    <span class="font-display font-bold text-white text-[10px] block uppercase tracking-wider">ROX</span>
                </div>
            </div>
        </div>
"""

# We need to insert this after the closing </div> of the "British, American & Other" section.
# Let's find the closing tag for the British, American & Other section.
# It ends with:
target = '''                <div class="glass-card-premium group p-4 rounded-xl text-center flex flex-col items-center justify-center min-h-[90px] border-secondary-container/15 shadow-[0_0_15px_rgba(214,4,29,0.03)] hover:border-secondary-container/40 transition-all duration-300">
                    <img src="assets/images/brands/kia.png" alt="KIA" class="h-10 w-20 object-contain mx-auto mb-2 filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity">
                    <span class="font-display font-bold text-white text-[10px] block uppercase tracking-wider">KIA</span>
                </div>
            </div>
        </div>'''

if target in content:
    content = content.replace(target, target + "\n" + chinese_html)
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Success")
else:
    print("Could not find insertion point")

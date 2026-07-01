/* Hassan Moustafa Automotive Care - WebGL Fragment Shader Background */

(function() {
    function initShader(canvas) {
        if (!canvas) return;

        // Sync the WebGL drawing-buffer size with the CSS layout size
        function syncSize() {
            const w = canvas.clientWidth || 1280;
            const h = canvas.clientHeight || 720;
            if (canvas.width !== w || canvas.height !== h) {
                canvas.width = w;
                canvas.height = h;
            }
        }

        if (typeof ResizeObserver !== 'undefined') {
            new ResizeObserver(syncSize).observe(canvas);
        }
        syncSize();

        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) {
            console.warn("WebGL not supported in this browser.");
            return;
        }

        const vsSource = `
            attribute vec2 a_position;
            varying vec2 v_texCoord;
            void main() {
                v_texCoord = a_position * 0.5 + 0.5;
                gl_Position = vec4(a_position, 0.0, 1.0);
            }
        `;

        const fsSource = `
            precision highp float;
            uniform float u_time;
            uniform vec2 u_resolution;
            uniform vec2 u_mouse;
            varying vec2 v_texCoord;

            void main() {
                vec2 uv = v_texCoord;
                vec2 center = uv - 0.5;
                center.x *= u_resolution.x / u_resolution.y;
                
                // Smooth moving gradient background
                float d = length(center);
                float pulse = sin(u_time * 0.2) * 0.1 + 0.9;
                
                vec3 color1 = vec3(0.043, 0.043, 0.043); // #0B0B0B
                vec3 color2 = vec3(0.1, 0.06, 0.06); // Dark graphite with subtle red hint
                vec3 accent = vec3(0.83, 0.0, 0.11); // Ferrari Red #D4001C
                
                // Create a slow moving glow
                float glow = smoothstep(0.8, 0.0, d * pulse);
                vec3 finalColor = mix(color1, color2, glow);
                
                // Add very subtle red "light leak" at the top right
                float lightLeak = smoothstep(1.5, 0.0, length(uv - vec2(1.0, 1.0)));
                finalColor = mix(finalColor, accent * 0.05, lightLeak);
                
                // Subtle particles/noise
                float noise = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
                finalColor += noise * 0.01;

                gl_FragColor = vec4(finalColor, 1.0);
            }
        `;

        function createShader(type, src) {
            const s = gl.createShader(type);
            gl.shaderSource(s, src);
            gl.compileShader(s);
            if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
                console.error("Shader compile error:", gl.getShaderInfoLog(s));
                gl.deleteShader(s);
                return null;
            }
            return s;
        }

        const prog = gl.createProgram();
        const vertexShader = createShader(gl.VERTEX_SHADER, vsSource);
        const fragmentShader = createShader(gl.FRAGMENT_SHADER, fsSource);
        
        if (!vertexShader || !fragmentShader) return;

        gl.attachShader(prog, vertexShader);
        gl.attachShader(prog, fragmentShader);
        gl.linkProgram(prog);

        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
            console.error("Program link error:", gl.getProgramInfoLog(prog));
            return;
        }

        gl.useProgram(prog);

        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -1, -1,
             1, -1,
            -1,  1,
             1,  1
        ]), gl.STATIC_DRAW);

        const pos = gl.getAttribLocation(prog, 'a_position');
        gl.enableVertexAttribArray(pos);
        gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

        const uTime = gl.getUniformLocation(prog, 'u_time');
        const uRes = gl.getUniformLocation(prog, 'u_resolution');
        const uMouse = gl.getUniformLocation(prog, 'u_mouse');

        let mouse = { x: canvas.width / 2, y: canvas.height / 2 };

        window.addEventListener('mousemove', (event) => {
            const rect = canvas.getBoundingClientRect();
            if (rect.width && rect.height) {
                const nx = (event.clientX - rect.left) / rect.width;
                const ny = 1.0 - (event.clientY - rect.top) / rect.height;
                mouse.x = nx * canvas.width;
                mouse.y = ny * canvas.height;
            }
        });

        function render(t) {
            if (typeof ResizeObserver === 'undefined') syncSize();
            
            // Handle viewport resize mapping
            gl.viewport(0, 0, canvas.width, canvas.height);
            
            if (uTime) gl.uniform1f(uTime, t * 0.001);
            if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
            if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
            
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            requestAnimationFrame(render);
        }

        requestAnimationFrame(render);
    }

    // Initialize all canvas elements — works whether script runs before or after DOM is ready
    function initAll() {
        const canvases = document.querySelectorAll('.shader-canvas, canvas[id^="shader-canvas-"]');
        canvases.forEach(initShader);
    }

    if (document.readyState === 'loading') {
        document.addEventListener("DOMContentLoaded", initAll);
    } else {
        initAll(); // DOM already ready (script loaded at end of body)
    }
})();

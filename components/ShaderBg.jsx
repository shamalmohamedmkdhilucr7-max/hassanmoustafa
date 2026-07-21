'use client';
import { useEffect, useRef } from 'react';

export default function ShaderBg({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animFrameId = null;
    let isVisible = true;

    function syncSize() {
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(syncSize) : null;
    if (ro) ro.observe(canvas);
    syncSize();

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    const vsSource = `attribute vec2 a_position;varying vec2 v_texCoord;void main(){v_texCoord=a_position*0.5+0.5;gl_Position=vec4(a_position,0.0,1.0);}`;
    const fsSource = `precision highp float;uniform float u_time;uniform vec2 u_resolution;uniform vec2 u_mouse;varying vec2 v_texCoord;void main(){vec2 uv=v_texCoord;vec2 center=uv-0.5;center.x*=u_resolution.x/u_resolution.y;float d=length(center);float pulse=sin(u_time*0.2)*0.1+0.9;vec3 color1=vec3(0.043,0.043,0.043);vec3 color2=vec3(0.1,0.06,0.06);vec3 accent=vec3(0.83,0.0,0.11);float glow=smoothstep(0.8,0.0,d*pulse);vec3 finalColor=mix(color1,color2,glow);float lightLeak=smoothstep(1.5,0.0,length(uv-vec2(1.0,1.0)));finalColor=mix(finalColor,accent*0.05,lightLeak);float noise=fract(sin(dot(uv,vec2(12.9898,78.233)))*43758.5453);finalColor+=noise*0.01;gl_FragColor=vec4(finalColor,1.0);}`;

    function createShader(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { gl.deleteShader(s); return null; }
      return s;
    }

    const prog = gl.createProgram();
    const vs = createShader(gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes  = gl.getUniformLocation(prog, 'u_resolution');
    const uMouse= gl.getUniformLocation(prog, 'u_mouse');

    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        mouse.x = ((e.clientX - rect.left) / rect.width) * canvas.width;
        mouse.y = (1 - (e.clientY - rect.top) / rect.height) * canvas.height;
      }
    };
    window.addEventListener('mousemove', onMouseMove);

    function render(t) {
      if (!isVisible) { animFrameId = null; return; }
      if (!ro) syncSize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes)  gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animFrameId = requestAnimationFrame(render);
    }

    if (typeof IntersectionObserver !== 'undefined') {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          isVisible = entry.isIntersecting;
          if (isVisible && !animFrameId) animFrameId = requestAnimationFrame(render);
        });
      }, { threshold: 0 });
      obs.observe(canvas);
    } else {
      animFrameId = requestAnimationFrame(render);
    }

    return () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      if (ro) ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={`shader-canvas absolute inset-0 w-full h-full z-0 opacity-30 ${className}`} />;
}

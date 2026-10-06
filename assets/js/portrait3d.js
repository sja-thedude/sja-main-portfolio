/* ==========================================================================
   3D portrait
   Renders the profile photo with a depth map in WebGL so the face shifts in
   depth toward the pointer, as if turning to look where you point. The card
   also tilts toward the pointer. Falls back to the plain <img> when WebGL is
   unavailable or the user prefers reduced motion.
   ========================================================================== */
(function () {
    const card = document.querySelector('.portrait');
    if (!card) return;
    const img = card.querySelector('img');
    const canvas = card.querySelector('canvas');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !canvas) return;

    const gl = canvas.getContext('webgl', { premultipliedAlpha: false, antialias: true });
    if (!gl) return;

    const VERT = `
        attribute vec2 aPos;
        varying vec2 vUv;
        void main() {
            vUv = aPos * 0.5 + 0.5;
            vUv.y = 1.0 - vUv.y;
            gl_Position = vec4(aPos, 0.0, 1.0);
        }`;

    // Offset each pixel by its depth relative to a focal plane: near parts
    // (nose, glasses) move with the pointer, the background moves against it.
    const FRAG = `
        precision mediump float;
        uniform sampler2D uImage;
        uniform sampler2D uDepth;
        uniform vec2 uMouse;
        varying vec2 vUv;
        const float FOCUS = 0.72;
        const float STRENGTH = 0.045;
        const float ZOOM = 0.92;
        void main() {
            vec2 uv = (vUv - 0.5) * ZOOM + 0.5;
            vec2 p = uv;
            for (int i = 0; i < 4; i++) {
                float d = texture2D(uDepth, p).r;
                p = uv - uMouse * (d - FOCUS) * STRENGTH;
            }
            gl_FragColor = texture2D(uImage, clamp(p, 0.0, 1.0));
        }`;

    function compile(type, src) {
        const s = gl.createShader(type);
        gl.shaderSource(s, src);
        gl.compileShader(s);
        return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    }

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uMouse = gl.getUniformLocation(prog, 'uMouse');

    function loadImage(src) {
        return new Promise((resolve, reject) => {
            const i = new Image();
            i.onload = () => resolve(i);
            i.onerror = reject;
            i.src = src;
        });
    }

    function makeTexture(unit, image) {
        const tex = gl.createTexture();
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    }

    function resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = Math.round(canvas.clientWidth * dpr);
        const h = Math.round(canvas.clientHeight * dpr);
        if (canvas.width !== w || canvas.height !== h) {
            canvas.width = w;
            canvas.height = h;
            gl.viewport(0, 0, w, h);
        }
    }

    // Pointer target in [-1, 1], eased toward each frame
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let lastInput = 0;

    function aimAt(clientX, clientY) {
        const r = card.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        // Normalise by the larger viewport half so far corners reach full turn
        const nx = (clientX - cx) / Math.max(cx, window.innerWidth - cx);
        const ny = (clientY - cy) / Math.max(cy, window.innerHeight - cy);
        target.x = Math.max(-1, Math.min(1, nx));
        target.y = Math.max(-1, Math.min(1, ny));
        lastInput = performance.now();
    }

    window.addEventListener('pointermove', (e) => aimAt(e.clientX, e.clientY), { passive: true });
    window.addEventListener('pointerdown', (e) => aimAt(e.clientX, e.clientY), { passive: true });
    document.addEventListener('mouseleave', () => { target.x = 0; target.y = 0; });

    function frame(now) {
        // With no pointer for a while (e.g. touch screens), sway gently
        if (now - lastInput > 3000) {
            target.x = Math.sin(now / 2200) * 0.6;
            target.y = Math.sin(now / 3100) * 0.25;
        }
        current.x += (target.x - current.x) * 0.08;
        current.y += (target.y - current.y) * 0.08;

        resize();
        gl.uniform2f(uMouse, current.x, current.y);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        card.style.setProperty('--rx', (-current.y * 10).toFixed(2) + 'deg');
        card.style.setProperty('--ry', (current.x * 14).toFixed(2) + 'deg');
        card.style.setProperty('--gx', (50 + current.x * 30).toFixed(1) + '%');
        card.style.setProperty('--gy', (50 + current.y * 30).toFixed(1) + '%');
        requestAnimationFrame(frame);
    }

    Promise.all([loadImage(img.currentSrc || img.src), loadImage(card.dataset.depth)])
        .then(([photo, depth]) => {
            makeTexture(0, photo);
            makeTexture(1, depth);
            gl.uniform1i(gl.getUniformLocation(prog, 'uImage'), 0);
            gl.uniform1i(gl.getUniformLocation(prog, 'uDepth'), 1);
            if (gl.getError() !== gl.NO_ERROR) return;
            card.classList.add('is-3d');
            requestAnimationFrame(frame);
        })
        .catch(() => { /* keep the static photo */ });
})();

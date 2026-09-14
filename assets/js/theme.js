/* ==========================================================================
   Theme switcher — dark (default) / light "Serene" / "Aurora".
   Persists the choice in localStorage and animates the change with a
   circular reveal (View Transitions API) or a cross-fade fallback.
   The <head> of each page applies the saved theme before first paint.
   ========================================================================== */
(function () {
    'use strict';

    const KEY = 'sja-theme';
    const THEMES = [
        { id: 'dark', icon: '☽', label: 'Dark theme' },     // ☽
        { id: 'light', icon: '☀', label: 'Serene light theme' }, // ☀
        { id: 'aurora', icon: '✨', label: 'Aurora colourful theme' } // ✨
    ];
    const root = document.documentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const getTheme = () => root.getAttribute('data-theme') || 'dark';

    const apply = (id) => {
        if (id === 'dark') root.removeAttribute('data-theme');
        else root.setAttribute('data-theme', id);
        try { localStorage.setItem(KEY, id); } catch (e) { /* storage unavailable */ }
        document.querySelectorAll('.theme-switch').forEach(sync);
    };

    const sync = (sw) => {
        const idx = Math.max(0, THEMES.findIndex((t) => t.id === getTheme()));
        sw.style.setProperty('--i', idx);
        sw.querySelectorAll('button').forEach((b, i) => b.setAttribute('aria-pressed', i === idx ? 'true' : 'false'));
    };

    const switchTo = (id, x, y) => {
        if (id === getTheme()) return;
        if (!reduceMotion && typeof document.startViewTransition === 'function') {
            root.style.setProperty('--tx', x + 'px');
            root.style.setProperty('--ty', y + 'px');
            document.startViewTransition(() => apply(id));
        } else {
            root.classList.add('theme-fading');
            apply(id);
            setTimeout(() => root.classList.remove('theme-fading'), 700);
        }
    };

    const build = () => {
        const sw = document.createElement('div');
        sw.className = 'theme-switch';
        sw.setAttribute('role', 'group');
        sw.setAttribute('aria-label', 'Theme');
        THEMES.forEach((t) => {
            const b = document.createElement('button');
            b.type = 'button';
            b.textContent = t.icon;
            b.title = t.label;
            b.setAttribute('aria-label', t.label);
            b.addEventListener('click', (e) => {
                const r = b.getBoundingClientRect();
                switchTo(t.id, r.left + r.width / 2, r.top + r.height / 2);
            });
            sw.appendChild(b);
        });
        sync(sw);
        return sw;
    };

    const sw = build();
    const nav = document.querySelector('.navbar');
    if (nav) {
        const toggle = nav.querySelector('.nav-toggle');
        nav.insertBefore(sw, toggle || null);
    } else {
        sw.classList.add('floating');
        document.body.appendChild(sw);
    }
})();

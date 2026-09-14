/* ==========================================================================
   Shared animation behaviour for all portfolio pages.
   Pairs with assets/css/animations.css. Progressive enhancement only.
   ========================================================================== */
(function () {
    'use strict';

    // Inject the shared UI bits so every page gets them without markup changes
    const progress = document.createElement('div');
    progress.className = 'scroll-progress';
    progress.setAttribute('aria-hidden', 'true');
    document.body.prepend(progress);

    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    glow.setAttribute('aria-hidden', 'true');
    document.body.prepend(glow);

    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Back to top');
    backToTop.textContent = '\u2191';
    document.body.appendChild(backToTop);

    // Scroll animations — staggered reveals
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const delay = reduceMotion ? 0 : Number(el.dataset.delay || 0);
            el.style.transitionDelay = delay + 'ms';
            el.classList.add('visible');
            // clear the stagger delay so hover transitions stay snappy
            setTimeout(() => { el.style.transitionDelay = ''; }, delay + 800);
            revealObserver.unobserve(el);
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    // Assign a stagger delay based on position within the parent group
    const stagger = (selector, step, cls) => {
        document.querySelectorAll(selector).forEach(group => {
            Array.from(group.children).forEach((el, i) => {
                el.classList.add(cls);
                el.dataset.delay = Math.min(i, 11) * step;
                revealObserver.observe(el);
            });
        });
    };
    stagger('.projects-grid', 60, 'fade-up');
    stagger('.articles-list', 80, 'fade-left');
    stagger('.timeline', 110, 'timeline-reveal');
    document.querySelectorAll('.about-text').forEach(el => revealObserver.observe(el));

    // Whole-section reveal (heading underline, divider, header button)
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05 });
    document.querySelectorAll('.section').forEach(sec => sectionObserver.observe(sec));

    // Blur-up image loading
    document.querySelectorAll('.project-thumb, .article-thumb, .timeline-logo').forEach(img => {
        img.classList.add('lazy-img');
        if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
        if (img.complete && img.naturalWidth) img.classList.add('loaded');
        else img.addEventListener('load', () => img.classList.add('loaded'), { once: true });
        img.addEventListener('error', () => img.classList.add('loaded'), { once: true });
    });

    // Scroll progress bar
    const updateProgress = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.transform = 'scaleX(' + (max > 0 ? window.scrollY / max : 0) + ')';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    // Back to top
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('show', window.scrollY > 600);
    }, { passive: true });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

    // Cursor glow that follows the pointer
    if (glow && window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reduceMotion) {
        let gx = window.innerWidth / 2, gy = window.innerHeight / 2, tx = gx, ty = gy, raf = null;
        const tick = () => {
            gx += (tx - gx) * 0.12;
            gy += (ty - gy) * 0.12;
            glow.style.transform = 'translate(' + gx + 'px,' + gy + 'px)';
            if (Math.abs(tx - gx) > 0.5 || Math.abs(ty - gy) > 0.5) raf = requestAnimationFrame(tick);
            else raf = null;
        };
        window.addEventListener('mousemove', (e) => {
            tx = e.clientX; ty = e.clientY;
            glow.classList.add('on');
            if (!raf) raf = requestAnimationFrame(tick);
        }, { passive: true });
        document.addEventListener('mouseleave', () => glow.classList.remove('on'));
    }

    // 3D tilt on project cards
    if (!reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        document.querySelectorAll('.project-card:not(.no-link)').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const r = card.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width - 0.5;
                const py = (e.clientY - r.top) / r.height - 0.5;
                card.style.transform = 'perspective(900px) translateY(-8px) scale(1.015) rotateX(' + (-py * 6).toFixed(2) + 'deg) rotateY(' + (px * 8).toFixed(2) + 'deg)';
            });
            card.addEventListener('mouseleave', () => { card.style.transform = ''; });
        });
    }

    // Click ripple on buttons
    document.querySelectorAll('.btn-primary, .btn-outline, .tag-link').forEach(btn => {
        btn.addEventListener('pointerdown', (e) => {
            if (reduceMotion) return;
            const r = btn.getBoundingClientRect();
            const size = Math.max(r.width, r.height);
            const span = document.createElement('span');
            span.className = 'ripple';
            span.style.width = span.style.height = size + 'px';
            span.style.left = (e.clientX - r.left - size / 2) + 'px';
            span.style.top = (e.clientY - r.top - size / 2) + 'px';
            btn.appendChild(span);
            span.addEventListener('animationend', () => span.remove(), { once: true });
        });
    });
    // Standalone certificate cards (certificates page)
    document.querySelectorAll('.cert-card').forEach((el, i) => {
        el.classList.add('fade-up');
        el.dataset.delay = Math.min(i, 11) * 70;
        revealObserver.observe(el);
    });
})();
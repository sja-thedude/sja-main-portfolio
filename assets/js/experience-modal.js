/* ==========================================================================
   Detail modal for experience roles and education entries.
   Data comes from assets/js/experience-data.js (EXPERIENCE_ROLES / EDUCATION_ENTRIES).
   Buttons: <button class="btn-details" data-role="key" data-group="experience|education">
   ========================================================================== */
(function () {
    'use strict';

    const GROUPS = {
        experience: window.EXPERIENCE_ROLES || {},
        education: window.EDUCATION_ENTRIES || {}
    };

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let modal = null;
    let current = { group: 'experience', key: null };
    let lastFocused = null;

    const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

    // Order of keys follows the order the buttons appear on the page,
    // falling back to the data object order.
    const orderFor = (group) => {
        const onPage = Array.from(document.querySelectorAll('.btn-details[data-group="' + group + '"]')).map((b) => b.dataset.role);
        return onPage.length ? onPage : Object.keys(GROUPS[group]);
    };

    const build = () => {
        modal = document.createElement('div');
        modal.className = 'xp-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', 'xp-title');
        modal.innerHTML =
            '<div class="xp-card" tabindex="-1">' +
                '<button class="xp-close" aria-label="Close">&times;</button>' +
                '<div class="xp-content"></div>' +
                '<div class="xp-footer">' +
                    '<button class="xp-nav xp-prev"><span aria-hidden="true">&larr;</span> <span class="xp-nav-label"></span></button>' +
                    '<span class="xp-counter"></span>' +
                    '<button class="xp-nav xp-next"><span class="xp-nav-label"></span> <span aria-hidden="true">&rarr;</span></button>' +
                '</div>' +
            '</div>';

        // A few slow gold particles drifting behind the card
        if (!reduceMotion) {
            for (let i = 0; i < 14; i++) {
                const p = document.createElement('span');
                p.className = 'xp-particle';
                p.style.left = (5 + Math.random() * 90) + '%';
                p.style.top = (40 + Math.random() * 60) + '%';
                p.style.animationDelay = (-Math.random() * 6) + 's';
                p.style.animationDuration = (5 + Math.random() * 5) + 's';
                p.style.width = p.style.height = (3 + Math.random() * 5) + 'px';
                modal.appendChild(p);
            }
        }

        document.body.appendChild(modal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) close();
        });
        modal.querySelector('.xp-close').addEventListener('click', close);
        modal.querySelector('.xp-prev').addEventListener('click', () => step(-1));
        modal.querySelector('.xp-next').addEventListener('click', () => step(1));

        document.addEventListener('keydown', (e) => {
            if (!modal.classList.contains('open')) return;
            if (e.key === 'Escape') close();
            else if (e.key === 'ArrowLeft') step(-1);
            else if (e.key === 'ArrowRight') step(1);
            else if (e.key === 'Tab') trapFocus(e);
        });
    };

    const trapFocus = (e) => {
        const focusable = modal.querySelectorAll('button:not(:disabled), a[href]');
        if (!focusable.length) return;
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };

    const render = (group, key) => {
        const d = GROUPS[group][key];
        if (!d) return;
        current = { group, key };

        const orgTag = d.url ? 'a' : 'span';
        const orgAttrs = d.url ? ' href="' + esc(d.url) + '" target="_blank" rel="noopener noreferrer"' : '';
        let i = 0;
        const delay = () => ' style="transition-delay:' + (reduceMotion ? 0 : 80 + (i++) * 55) + 'ms"';

        modal.querySelector('.xp-content').innerHTML =
            '<div class="xp-header">' +
                '<img class="xp-logo xp-anim" src="' + esc(d.logo) + '" alt="' + esc(d.org) + ' logo">' +
                '<div>' +
                    '<h3 class="xp-title xp-anim" id="xp-title"' + delay() + '>' + esc(d.title) + '</h3>' +
                    '<' + orgTag + ' class="xp-org xp-anim"' + orgAttrs + delay() + '>' + esc(d.org) + '</' + orgTag + '>' +
                    '<div class="xp-meta xp-anim"' + delay() + '>' +
                        '<span class="xp-chip xp-chip--date">' + esc(d.period) + '</span>' +
                        (d.type ? '<span class="xp-chip">' + esc(d.type) + '</span>' : '') +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="xp-body">' +
                (d.tagline ? '<p class="xp-tagline xp-anim"' + delay() + '>' + esc(d.tagline) + '</p>' : '') +
                (d.stack && d.stack.length ?
                    '<p class="xp-section-label xp-anim"' + delay() + '>' + esc(d.stackLabel || 'Stack') + '</p>' +
                    '<div class="xp-stack xp-anim"' + delay() + '>' + d.stack.map((t) => '<span class="tag">' + esc(t) + '</span>').join('') + '</div>'
                : '') +
                '<p class="xp-section-label xp-anim"' + delay() + '>' + esc(d.bulletsLabel || 'Highlights') + '</p>' +
                '<ul class="xp-bullets">' + d.bullets.map((b) => '<li class="xp-anim"' + delay() + '>' + esc(b) + '</li>').join('') + '</ul>' +
                (d.docs && d.docs.length ?
                    '<p class="xp-section-label xp-anim" style="margin-top:1.5rem;' + delay().slice(8) + '>Documents</p>' +
                    '<div class="xp-docs xp-anim"' + delay() + '>' + d.docs.map((doc) =>
                        '<a href="' + esc(doc.src) + '" class="btn-details btn-doc" data-doc-type="' + esc(doc.type) + '" data-doc-title="' + esc(d.title + ' — ' + doc.label) + '" target="_blank" rel="noopener noreferrer">' +
                            (doc.type === 'pdf' ? '&#128196;' : '&#127942;') + ' ' + esc(doc.label) + ' <span class="arrow" aria-hidden="true">&rarr;</span>' +
                        '</a>').join('') + '</div>'
                : '') +
            '</div>';
        wireDocs(modal);

        // prev / next within the same group
        const order = orderFor(group);
        const idx = order.indexOf(key);
        const prevKey = order[idx - 1], nextKey = order[idx + 1];
        const prev = modal.querySelector('.xp-prev'), next = modal.querySelector('.xp-next');
        prev.disabled = !prevKey; next.disabled = !nextKey;
        prev.querySelector('.xp-nav-label').textContent = prevKey ? GROUPS[group][prevKey].org : '';
        next.querySelector('.xp-nav-label').textContent = nextKey ? GROUPS[group][nextKey].org : '';
        prev.dataset.key = prevKey || ''; next.dataset.key = nextKey || '';
        modal.querySelector('.xp-counter').textContent = (idx + 1) + ' / ' + order.length;
    };

    const open = (group, key) => {
        if (!modal) build();
        lastFocused = document.activeElement;
        render(group, key);
        document.body.classList.add('xp-lock');
        modal.classList.remove('closing');
        // force a frame so the transition runs from the hidden state
        requestAnimationFrame(() => requestAnimationFrame(() => {
            modal.classList.add('open');
            modal.querySelector('.xp-card').scrollTop = 0;
            modal.querySelector('.xp-close').focus({ preventScroll: true });
        }));
    };

    const close = () => {
        if (!modal || !modal.classList.contains('open')) return;
        modal.classList.add('closing');
        modal.classList.remove('open');
        const done = () => {
            modal.classList.remove('closing');
            document.body.classList.remove('xp-lock');
            if (lastFocused && lastFocused.focus) lastFocused.focus({ preventScroll: true });
        };
        if (reduceMotion) done(); else setTimeout(done, 420);
    };

    const step = (dir) => {
        const btn = modal.querySelector(dir < 0 ? '.xp-prev' : '.xp-next');
        const key = btn.dataset.key;
        if (!key) return;
        const card = modal.querySelector('.xp-card');
        if (reduceMotion) { render(current.group, key); return; }
        card.classList.add('swap-out');
        setTimeout(() => {
            card.classList.remove('swap-out');
            card.classList.add('swap-in');
            render(current.group, key);
            card.scrollTop = 0;
            // let the "swap-in" start position paint, then animate in
            requestAnimationFrame(() => requestAnimationFrame(() => card.classList.remove('swap-in')));
        }, 260);
    };

    /* ----------------------------------------------------------------------
       Document lightbox — certificates (image) and transcripts (PDF)
       ---------------------------------------------------------------------- */
    let docModal = null;

    const buildDoc = () => {
        docModal = document.createElement('div');
        docModal.className = 'doc-modal';
        docModal.setAttribute('role', 'dialog');
        docModal.setAttribute('aria-modal', 'true');
        docModal.innerHTML =
            '<div class="doc-frame">' +
                '<div class="doc-bar">' +
                    '<span class="doc-title"></span>' +
                    '<div class="doc-actions">' +
                        '<a class="doc-open" target="_blank" rel="noopener noreferrer">Open in new tab &nearr;</a>' +
                        '<button class="doc-close" aria-label="Close">&times;</button>' +
                    '</div>' +
                '</div>' +
                '<div class="doc-body"></div>' +
            '</div>';
        document.body.appendChild(docModal);
        docModal.addEventListener('click', (e) => { if (e.target === docModal) closeDoc(); });
        docModal.querySelector('.doc-close').addEventListener('click', closeDoc);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && docModal.classList.contains('open')) { e.stopImmediatePropagation(); closeDoc(); }
        }, true);
    };

    const openDoc = (src, type, title) => {
        if (!docModal) buildDoc();
        const body = docModal.querySelector('.doc-body');
        docModal.querySelector('.doc-title').textContent = title || '';
        docModal.querySelector('.doc-open').href = src;
        body.innerHTML = '';
        docModal.classList.toggle('is-pdf', type === 'pdf');
        if (type === 'pdf') {
            const frame = document.createElement('iframe');
            frame.src = src + '#toolbar=0&view=FitH';
            frame.title = title || 'Document';
            frame.setAttribute('loading', 'lazy');
            body.appendChild(frame);
        } else {
            const img = document.createElement('img');
            img.src = src;
            img.alt = title || 'Document';
            img.className = 'doc-img';
            img.addEventListener('click', () => img.classList.toggle('zoomed'));
            body.appendChild(img);
        }
        document.body.classList.add('xp-lock');
        docModal.classList.remove('closing');
        requestAnimationFrame(() => requestAnimationFrame(() => {
            docModal.classList.add('open');
            docModal.querySelector('.doc-close').focus({ preventScroll: true });
        }));
    };

    const closeDoc = () => {
        if (!docModal || !docModal.classList.contains('open')) return;
        docModal.classList.add('closing');
        docModal.classList.remove('open');
        const done = () => {
            docModal.classList.remove('closing');
            docModal.querySelector('.doc-body').innerHTML = '';
            // keep the page locked if the detail modal is still open underneath
            if (!modal || !modal.classList.contains('open')) document.body.classList.remove('xp-lock');
        };
        if (reduceMotion) done(); else setTimeout(done, 400);
    };

    const wireDocs = (root) => {
        (root || document).querySelectorAll('.btn-doc').forEach((a) => {
            if (a.dataset.wired) return;
            a.dataset.wired = '1';
            a.addEventListener('click', (e) => {
                e.preventDefault();
                openDoc(a.getAttribute('href'), a.dataset.docType || 'image', a.dataset.docTitle || a.textContent.trim());
            });
        });
    };
    wireDocs(document);

    // Wire every trigger on the page
    document.querySelectorAll('.btn-details:not(.btn-doc)').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            open(btn.dataset.group || 'experience', btn.dataset.role);
        });
    });
})();

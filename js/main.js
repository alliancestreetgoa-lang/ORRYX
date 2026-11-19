/* Orryx Commodities — motion layer */
(() => {
  // Set this to the company's enquiry email when it is confirmed.
  const CONTACT_EMAIL = '';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const hasGsap = !!(window.gsap && window.ScrollTrigger);
  $('#year').textContent = new Date().getFullYear();

  /* ---------- licence validity ring (live) ---------- */
  const start = new Date(2025, 9, 17), end = new Date(2027, 9, 16), now = new Date();
  const frac = Math.min(1, Math.max(0, (now - start) / (end - start)));
  const daysLeft = Math.max(0, Math.ceil((end - now) / 864e5));
  const ring = $('#ringFg'), CIRC = 528;

  /* ---------- mobile menu ---------- */
  const burger = $('#burger'), links = $('#navLinks');
  const setMenu = o => { links.classList.toggle('is-open', o); burger.setAttribute('aria-expanded', o); };
  burger.addEventListener('click', () => setMenu(!links.classList.contains('is-open')));
  links.addEventListener('click', e => { if (e.target.tagName === 'A') setMenu(false); });

  /* ---------- enquiry form ---------- */
  $('#form').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target, msg = $('#formMsg');
    if (!f.name.value.trim() || !f.message.value.trim()) { msg.textContent = 'Please add your name and a short message.'; return; }
    if (!CONTACT_EMAIL) { msg.textContent = 'Thank you. Our enquiry line is being set up — please check back shortly.'; return; }
    const body = `Name: ${f.name.value}\nCompany: ${f.company.value}\nInterest: ${f.topic.value}\n\n${f.message.value}`;
    location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Enquiry — ' + f.topic.value)}&body=${encodeURIComponent(body)}`;
    msg.textContent = 'Opening your email app…';
  });

  /* ---------- no-motion fallback ---------- */
  if (!hasGsap || reduce) {
    document.documentElement.classList.add('no-js');
    $('#loader').style.display = 'none';
    ring.style.strokeDashoffset = CIRC * (1 - frac);
    $('#daysLeft').textContent = daysLeft;
    $('#flowPath').style.strokeDasharray = 'none';
    $$('.panel,.step').forEach(el => el.classList.add('is-in'));
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  /* ---------- smooth scroll ---------- */
  let lenis = null;
  if (window.Lenis) {
    lenis = new Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 0.9 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
  }
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const t = $(a.getAttribute('href')); if (!t) return;
    e.preventDefault();
    lenis ? lenis.scrollTo(t, { offset: -10, duration: 1.6 }) : t.scrollIntoView({ behavior: 'smooth' });
  }));

  /* ---------- split headings into words ---------- */
  $$('[data-split]').forEach(h => {
    h.innerHTML = h.textContent.trim().split(/\s+/).map(w => `<span class="w"><span>${w}</span></span>`).join(' ');
  });

  /* ---------- preloader then hero intro ---------- */
  const intro = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } });
  intro
    .from('#heroImg', { autoAlpha: 0, scale: innerWidth < 900 ? 1 : 1.14, duration: 2.4 }, 0)
    .from('.nav', { yPercent: -160, duration: 1.2, clearProps: 'transform' }, .2)
    .from('.hero__kicker', { y: 24, autoAlpha: 0, duration: 1 }, .35)
    .from('.hero__title .line > span', { yPercent: 115, rotate: 4, duration: 1.4, stagger: .12 }, .4)
    .from('.hero__lede', { y: 30, autoAlpha: 0, duration: 1.1 }, .9)
    .from('.hero__actions .btn', { y: 30, autoAlpha: 0, duration: 1, stagger: .1 }, 1)
    .from('.chip', { scale: .4, autoAlpha: 0, duration: 1.2, stagger: .14, ease: 'back.out(1.8)' }, 1)
    .from('.statbar', { y: 60, autoAlpha: 0, duration: 1.2 }, 1.15)
    .from('.statbar > div', { y: 20, autoAlpha: 0, duration: .8, stagger: .08 }, 1.3)
    .from('.hero__scroll', { autoAlpha: 0, duration: 1 }, 1.6);

  const load = { v: 0 };
  gsap.timeline()
    .to(load, { v: 100, duration: 1.5, ease: 'power2.inOut', onUpdate: () => {
      $('#loaderNum').textContent = Math.round(load.v);
      $('#loaderBar').style.transform = `scaleX(${load.v / 100})`;
    } })
    .to('.loader__mark', { scale: 9, autoAlpha: 0, duration: .9, ease: 'power3.in' })
    .to('#loader', { autoAlpha: 0, duration: .6, onStart: () => { intro.play(); lenis && lenis.start(); } }, '-=.35')
    .set('#loader', { display: 'none' });

  /* ---------- progress bar + nav hide ---------- */
  gsap.to('#progressBar', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: .3 } });
  const nav = $('#nav');
  ScrollTrigger.create({ start: 200, end: 'max', onUpdate: s => {
    if (links.classList.contains('is-open')) return;
    nav.classList.toggle('is-hidden', s.direction === 1 && s.scroll() > 400);
  } });

  /* ---------- tone crossfade (three deep colours) ---------- */
  const tones = $$('[data-tone-layer]');
  const setTone = t => tones.forEach(l => l.classList.toggle('is-on', l.dataset.toneLayer === t));
  $$('[data-tone]').forEach(sec => ScrollTrigger.create({
    trigger: sec, start: 'top 55%', end: 'bottom 55%',
    onEnter: () => setTone(sec.dataset.tone), onEnterBack: () => setTone(sec.dataset.tone)
  }));

  /* ---------- hero scroll parallax ---------- */
  if (innerWidth >= 900) gsap.to('#heroImg', { yPercent: -6, scale: 1.05, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.4 } });
  gsap.to('.hero__inner', { yPercent: -18, autoAlpha: 0, ease: 'none', scrollTrigger: { trigger: '.hero', start: '35% top', end: 'bottom top', scrub: true } });
  gsap.to('.hero__chips', { yPercent: -30, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  /* ---------- hero mouse parallax ---------- */
  if (fine) {
    const hero = $('.hero'), chips = $$('.chip'), img = $('#heroImg');
    const qx = chips.map(c => gsap.quickTo(c, 'x', { duration: .9, ease: 'power3' }));
    const qy = chips.map(c => gsap.quickTo(c, 'y', { duration: .9, ease: 'power3' }));
    const ix = gsap.quickTo(img, 'x', { duration: 1.4, ease: 'power3' });
    hero.addEventListener('pointermove', e => {
      const nx = e.clientX / innerWidth - .5, ny = e.clientY / innerHeight - .5;
      chips.forEach((c, i) => { const d = +c.dataset.depth; qx[i](nx * d * 2); qy[i](ny * d * 2); });
      ix(nx * -18);
    });
  }

  /* ---------- gold dust canvas ---------- */
  (() => {
    const cv = $('#dust'), ctx = cv.getContext('2d'); let w, h, P = [], on = true;
    const size = () => { const r = Math.min(devicePixelRatio, 2); w = cv.width = cv.offsetWidth * r; h = cv.height = cv.offsetHeight * r;
      P = Array.from({ length: Math.round(cv.offsetWidth / 16) }, () => ({ x: Math.random() * w, y: Math.random() * h, r: (Math.random() * 1.6 + .4) * r, s: Math.random() * .35 + .08, p: Math.random() * 6.28, c: ['246,223,166', '47,211,154', '109,149,255', '255,111,152'][Math.random() * 4 | 0] })); };
    size(); addEventListener('resize', size);
    ScrollTrigger.create({ trigger: '.hero', start: 'top bottom', end: 'bottom top', onToggle: s => on = s.isActive });
    gsap.ticker.add(t => { if (!on) return; ctx.clearRect(0, 0, w, h);
      for (const p of P) { p.y -= p.s; p.x += Math.sin(t + p.p) * .25; if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w; }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.28); ctx.fillStyle = `rgba(${p.c},${.35 + Math.sin(t * 2 + p.p) * .3})`; ctx.fill(); } });
  })();

  /* ---------- reveals ---------- */
  $$('[data-split]').forEach(h => gsap.from($$('.w > span', h), { yPercent: 115, duration: 1.2, ease: 'expo.out', stagger: .045, scrollTrigger: { trigger: h, start: 'top 86%' } }));
  ScrollTrigger.batch('[data-reveal]', { start: 'top 88%', once: true,
    onEnter: els => gsap.to(els, { y: 0, autoAlpha: 1, scale: 1, duration: 1.3, ease: 'expo.out', stagger: .1, overwrite: true }) });
  gsap.set('[data-reveal]', { y: 50, autoAlpha: 0, scale: .97, force3D: true });

  gsap.from('.mix__item', { y: 30, autoAlpha: 0, duration: 1, ease: 'expo.out', stagger: .12, scrollTrigger: { trigger: '.mix__grid', start: 'top 88%' } });

  /* ---------- counters ---------- */
  $$('[data-count]').forEach(el => {
    const to = +el.dataset.count, plain = 'plain' in el.dataset, o = { v: plain ? to - Math.min(to, 60) : 0 };
    ScrollTrigger.create({ trigger: el, start: 'top 92%', once: true, onEnter: () =>
      gsap.to(o, { v: to, duration: 2, ease: 'power3.out', delay: el.closest('.hero') ? 2.6 : 0, onUpdate: () => el.textContent = Math.round(o.v) }) });
  });

  /* ---------- validity ring ---------- */
  ScrollTrigger.create({ trigger: '.ring', start: 'top 80%', once: true, onEnter: () => {
    gsap.to(ring, { strokeDashoffset: CIRC * (1 - frac), duration: 2.4, ease: 'power3.inOut' });
    const o = { v: 730 }; gsap.to(o, { v: daysLeft, duration: 2.4, ease: 'power3.inOut', onUpdate: () => $('#daysLeft').textContent = Math.round(o.v) });
  } });

  /* ---------- activities: pinned horizontal glide (desktop) ---------- */
  const mm = gsap.matchMedia();
  const track = $('#track'), panels = $$('.panel');
  mm.add('(min-width: 900px)', () => {
    const dist = () => track.scrollWidth - innerWidth;
    const tw = gsap.to(track, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: '.activities', start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1, refreshPriority: 1 } });
    panels.forEach(p => {
      ScrollTrigger.create({ trigger: p, containerAnimation: tw, start: 'left 75%', onEnter: () => p.classList.add('is-in') });
      gsap.fromTo($('img', p), { xPercent: -6 }, { xPercent: 6, ease: 'none', scrollTrigger: { trigger: p, containerAnimation: tw, start: 'left right', end: 'right left', scrub: true } });
      gsap.from($('.panel__body', p), { y: 70, autoAlpha: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: p, containerAnimation: tw, start: 'left 80%' } });
    });
  });
  mm.add('(max-width: 899px)', () => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add('is-in')), { root: track, threshold: .5 });
    panels.forEach(p => io.observe(p));
    return () => io.disconnect();
  });

  /* ---------- method: line draws with scroll ---------- */
  const path = $('#flowPath'), len = path.getTotalLength();
  gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
  gsap.to(path, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '.flow', start: 'top 60%', end: 'bottom 70%', scrub: .6 } });
  $$('[data-step]').forEach((s, i) => {
    gsap.from($('.step__c', s), { x: innerWidth < 900 ? 30 : (i % 2 ? 80 : -80), autoAlpha: 0, rotateY: i % 2 ? -18 : 18, transformPerspective: 900, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: s, start: 'top 78%' } });
    ScrollTrigger.create({ trigger: s, start: 'top 62%', onEnter: () => s.classList.add('is-in'), onLeaveBack: () => s.classList.remove('is-in') });
  });

  /* ---------- dubai: reveal + parallax ---------- */
  gsap.fromTo('.dubai__media', { clipPath: 'inset(22% 18% round 60px)' }, { clipPath: 'inset(0% 0% round 0px)', ease: 'none', scrollTrigger: { trigger: '.dubai', start: 'top 85%', end: 'top 10%', scrub: true } });
  gsap.fromTo('#dubaiImg', { yPercent: -14 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: '.dubai', start: 'top bottom', end: 'bottom top', scrub: true } });

  /* ---------- licence rows + footer word ---------- */
  gsap.from('.cert__table tbody tr', { x: -40, autoAlpha: 0, duration: .9, ease: 'expo.out', stagger: .12, scrollTrigger: { trigger: '.cert__table', start: 'top 82%' } });
  gsap.from('.cert__grid > div', { y: 24, autoAlpha: 0, duration: .8, ease: 'expo.out', stagger: .07, scrollTrigger: { trigger: '.cert__grid', start: 'top 85%' } });
  gsap.from('.footer__word', { yPercent: 30, autoAlpha: 0, ease: 'none', scrollTrigger: { trigger: '.footer__word', start: 'top bottom', end: 'center bottom', scrub: true } });
  gsap.to('.marquee__track', { xPercent: -8, ease: 'none', scrollTrigger: { trigger: '.marquee', start: 'top bottom', end: 'bottom top', scrub: true } });

  /* ---------- glass spotlight, tilt, magnetic, cursor ---------- */
  if (fine) {
    $$('.glass').forEach(g => g.addEventListener('pointermove', e => {
      const r = g.getBoundingClientRect();
      g.style.setProperty('--mx', (e.clientX - r.left) + 'px'); g.style.setProperty('--my', (e.clientY - r.top) + 'px'); g.style.setProperty('--spot', 1);
    }));
    $$('.glass').forEach(g => g.addEventListener('pointerleave', () => g.style.setProperty('--spot', .55)));

    $$('[data-tilt]').forEach(el => {
      const k = 'tiltSoft' in el.dataset ? 3 : 8;
      const rx = gsap.quickTo(el, 'rotationX', { duration: .6, ease: 'power3' }), ry = gsap.quickTo(el, 'rotationY', { duration: .6, ease: 'power3' });
      gsap.set(el, { transformPerspective: 900 });
      el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(); ry(((e.clientX - r.left) / r.width - .5) * k); rx(-((e.clientY - r.top) / r.height - .5) * k); });
      el.addEventListener('pointerleave', () => { rx(0); ry(0); });
    });

    $$('[data-magnetic]').forEach(el => {
      const x = gsap.quickTo(el, 'x', { duration: .5, ease: 'power3' }), y = gsap.quickTo(el, 'y', { duration: .5, ease: 'power3' });
      el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(); x((e.clientX - r.left - r.width / 2) * .3); y((e.clientY - r.top - r.height / 2) * .4); });
      el.addEventListener('pointerleave', () => { x(0); y(0); });
    });

    const cur = $('#cursor'), cx = gsap.quickTo(cur, 'x', { duration: .35, ease: 'power3' }), cy = gsap.quickTo(cur, 'y', { duration: .35, ease: 'power3' });
    addEventListener('pointermove', e => { cx(e.clientX); cy(e.clientY); });
    $$('a,button,.panel,input,select,textarea').forEach(el => { el.addEventListener('pointerenter', () => cur.classList.add('is-hot')); el.addEventListener('pointerleave', () => cur.classList.remove('is-hot')); });
  }

  ScrollTrigger.sort(); ScrollTrigger.refresh();
  addEventListener('load', () => ScrollTrigger.refresh());
  document.fonts && document.fonts.ready.then(() => ScrollTrigger.refresh());
})();

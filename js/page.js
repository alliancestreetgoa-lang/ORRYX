/* Orryx Commodities — motion layer for the service pages (lighter than main.js) */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const hasGsap = !!(window.gsap && window.ScrollTrigger);
  $('#year').textContent = new Date().getFullYear();

  /* mobile menu */
  const burger = $('#burger'), links = $('#navLinks');
  const setMenu = o => { links.classList.toggle('is-open', o); burger.setAttribute('aria-expanded', o); };
  burger.addEventListener('click', () => setMenu(!links.classList.contains('is-open')));
  links.addEventListener('click', e => { if (e.target.tagName === 'A') setMenu(false); });

  if (!hasGsap || reduce) return;
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  /* smooth scroll */
  let lenis = null;
  if (window.Lenis) {
    lenis = new Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 0.9 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const t = $(a.getAttribute('href')); if (!t) return;
    e.preventDefault();
    lenis ? lenis.scrollTo(t, { offset: -10, duration: 1.4 }) : t.scrollIntoView({ behavior: 'smooth' });
  }));

  /* intro */
  gsap.timeline({ defaults: { ease: 'expo.out' } })
    .from('.nav', { yPercent: -160, duration: 1.1, clearProps: 'transform' }, 0)
    .from('.phero__grid > div:first-child > *', { y: 28, autoAlpha: 0, duration: 1.1, stagger: .08 }, .1)
    .from('.phero__img', { autoAlpha: 0, scale: .94, duration: 1.6 }, .2);

  /* split headings into words */
  $$('[data-split]').forEach(h => {
    h.innerHTML = h.textContent.trim().split(/\s+/).map(w => `<span class="w"><span>${w}</span></span>`).join(' ');
    gsap.from($$('.w > span', h), { yPercent: 115, duration: 1.2, ease: 'expo.out', stagger: .045, scrollTrigger: { trigger: h, start: 'top 86%' } });
  });

  /* progress bar + nav hide */
  gsap.to('#progressBar', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: .3 } });
  const nav = $('#nav');
  ScrollTrigger.create({ start: 200, end: 'max', onUpdate: s => {
    if (links.classList.contains('is-open')) return;
    nav.classList.toggle('is-hidden', s.direction === 1 && s.scroll() > 400);
  } });

  /* tone crossfade */
  const tones = $$('[data-tone-layer]');
  const setTone = t => tones.forEach(l => l.classList.toggle('is-on', l.dataset.toneLayer === t));
  $$('[data-tone]').forEach(sec => ScrollTrigger.create({
    trigger: sec, start: 'top 55%', end: 'bottom 55%',
    onEnter: () => setTone(sec.dataset.tone), onEnterBack: () => setTone(sec.dataset.tone)
  }));

  /* reveals */
  ScrollTrigger.batch('[data-reveal]', { start: 'top 88%', once: true,
    onEnter: els => gsap.to(els, { y: 0, autoAlpha: 1, scale: 1, duration: 1.3, ease: 'expo.out', stagger: .1, overwrite: true }) });
  gsap.set('[data-reveal]', { y: 50, autoAlpha: 0, scale: .97, force3D: true });

  /* image drift + footer word */
  gsap.to('.phero__img img', { yPercent: -6, ease: 'none', scrollTrigger: { trigger: '.phero', start: 'top top', end: 'bottom top', scrub: .4 } });
  gsap.from('.footer__word', { yPercent: 30, autoAlpha: 0, ease: 'none', scrollTrigger: { trigger: '.footer__word', start: 'top bottom', end: 'center bottom', scrub: true } });

  /* glass spotlight */
  if (fine) {
    $$('.glass').forEach(g => {
      g.addEventListener('pointermove', e => {
        const r = g.getBoundingClientRect();
        g.style.setProperty('--mx', (e.clientX - r.left) + 'px'); g.style.setProperty('--my', (e.clientY - r.top) + 'px'); g.style.setProperty('--spot', 1);
      });
      g.addEventListener('pointerleave', () => g.style.setProperty('--spot', .55));
    });
  }

  ScrollTrigger.sort(); ScrollTrigger.refresh();
  addEventListener('load', () => ScrollTrigger.refresh());
  document.fonts && document.fonts.ready.then(() => ScrollTrigger.refresh());
})();

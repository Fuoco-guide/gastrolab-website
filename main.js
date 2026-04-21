// Nav scroll state
const navbar = document.getElementById('navbar');
const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile nav toggle
const toggle = document.getElementById('navToggle');
const links  = document.getElementById('navLinks');
toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
links.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── Card text-size controls (desktop only) ─────────────────────────
(function () {
  if (window.matchMedia('(max-width: 768px)').matches) return;

  const STEPS = [0.75, 0.85, 1, 1.1, 1.2, 1.35, 1.5];

  function makeControl ({ label, cssVar, storageKey, rowId }) {
    let idx = parseInt(localStorage.getItem(storageKey) ?? '2', 10);

    const row = document.createElement('div');
    row.className = 'csc-row';
    row.id = rowId;
    row.innerHTML = `
      <span class="csc-label">${label}</span>
      <button class="csc-btn csc-minus" aria-label="Decrease ${label}">−</button>
      <button class="csc-btn csc-plus"  aria-label="Increase ${label}">+</button>`;

    const minus = row.querySelector('.csc-minus');
    const plus  = row.querySelector('.csc-plus');

    function apply () {
      document.documentElement.style.setProperty(cssVar, STEPS[idx]);
      minus.style.opacity = idx === 0              ? '0.3' : '1';
      plus.style.opacity  = idx === STEPS.length-1 ? '0.3' : '1';
    }

    minus.addEventListener('click', () => { if (idx > 0)              { idx--; localStorage.setItem(storageKey, idx); apply(); } });
    plus.addEventListener ('click', () => { if (idx < STEPS.length-1) { idx++; localStorage.setItem(storageKey, idx); apply(); } });

    apply();
    return row;
  }

  const bar = document.createElement('div');
  bar.id = 'cardSizeControl';
  bar.appendChild(makeControl({ label: 'Services Cards', cssVar: '--svc-scale',  storageKey: 'gastrolab_svcScale',  rowId: 'cscSvc' }));
  bar.appendChild(makeControl({ label: 'How It Works',   cssVar: '--how-scale',  storageKey: 'gastrolab_howScale',  rowId: 'cscHow' }));
  document.body.appendChild(bar);
})();

// Portfolio strip — drag (mouse) + swipe (touch)
const strip = document.getElementById('portfolioStrip');
if (strip) {
  let active = false, startX, sl;

  const start = x => { active = true; startX = x; sl = strip.scrollLeft; strip.classList.add('dragging'); };
  const move  = x => { if (!active) return; strip.scrollLeft = sl - (x - startX) * 1.3; };
  const end   = ()  => { active = false; strip.classList.remove('dragging'); };

  strip.addEventListener('mousedown',  e => start(e.pageX));
  strip.addEventListener('mousemove',  e => { e.preventDefault(); move(e.pageX); }, { passive: false });
  document.addEventListener('mouseup', end);

  strip.addEventListener('touchstart', e => start(e.touches[0].pageX), { passive: true });
  strip.addEventListener('touchmove',  e => move(e.touches[0].pageX),  { passive: true });
  strip.addEventListener('touchend',   end);
}

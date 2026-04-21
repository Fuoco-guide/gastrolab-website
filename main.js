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

// ── Card text-size control (desktop only) ──────────────────────────
(function () {
  if (window.matchMedia('(max-width: 768px)').matches) return;

  const STEPS = [0.75, 0.85, 1, 1.1, 1.2, 1.35, 1.5];
  const KEY   = 'gastrolab_cardScale';
  let idx = parseInt(localStorage.getItem(KEY) ?? '2', 10);

  function apply () {
    document.documentElement.style.setProperty('--card-scale', STEPS[idx]);
    minus.disabled = idx === 0;
    plus.disabled  = idx === STEPS.length - 1;
    minus.style.opacity = minus.disabled ? '0.3' : '1';
    plus.style.opacity  = plus.disabled  ? '0.3' : '1';
  }

  const bar = document.createElement('div');
  bar.id = 'cardSizeControl';
  bar.innerHTML = `
    <span class="csc-label">Card Text</span>
    <button class="csc-btn" id="cscMinus" aria-label="Decrease text size">−</button>
    <button class="csc-btn" id="cscPlus"  aria-label="Increase text size">+</button>`;
  document.body.appendChild(bar);

  const minus = document.getElementById('cscMinus');
  const plus  = document.getElementById('cscPlus');

  minus.addEventListener('click', () => { if (idx > 0)              { idx--; localStorage.setItem(KEY, idx); apply(); } });
  plus.addEventListener ('click', () => { if (idx < STEPS.length-1) { idx++; localStorage.setItem(KEY, idx); apply(); } });

  apply();
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

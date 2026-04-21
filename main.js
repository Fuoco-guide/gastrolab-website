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

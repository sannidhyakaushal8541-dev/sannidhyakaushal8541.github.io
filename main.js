/* ============================================
   MAIN.JS — All interactive behaviour
   ============================================ */

/* ---- Custom Cursor ---- */
const cursor    = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

// Ring follows with a slight lag
function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Grow cursor on interactive elements
document.querySelectorAll('a, button, .project-row, .skill-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width      = '20px';
    cursor.style.height     = '20px';
    cursorRing.style.width  = '60px';
    cursorRing.style.height = '60px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width      = '12px';
    cursor.style.height     = '12px';
    cursorRing.style.width  = '40px';
    cursorRing.style.height = '40px';
  });
});


/* ---- Scroll Reveal ---- */
const reveals  = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => revealObserver.observe(el));

// Render Lucide icons with consistent 1.5 stroke width
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons({ attrs: { 'stroke-width': 1.5 } });
});

// Live local time (24h)
const timeEl = document.getElementById('localTime');
function updateClock() {
    const d = new Date();
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    const ss = String(d.getSeconds()).padStart(2, '0');
    timeEl.textContent = `${hh}:${mm}:${ss}`;
}
updateClock();
setInterval(updateClock, 1000);

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Staggered letter reveal without global CSS
const logo = document.getElementById('logoWord');
const letters = logo ? logo.querySelectorAll('.letter') : [];
letters.forEach((el, i) => {
    el.style.transform = 'translateY(-100%)';
    el.style.opacity = '0';
    el.style.willChange = 'transform, opacity';
    el.style.transition = 'transform 700ms cubic-bezier(0.2, 0.8, 0.2, 1), opacity 700ms linear';
    el.style.display = 'inline-block';
    setTimeout(() => {
        el.style.transform = 'translateY(0)';
        el.style.opacity = '1';
    }, 100 + i * 120);
});

// Subtle 3D tilt for hero word and feature image
function attachTilt(el, max = 8) {
    if (!el) return;
    let raf = null;
    const handle = (e) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rx = (y - 0.5) * -max;
        const ry = (x - 0.5) * max;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
            el.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
        });
    };
    const reset = () => {
        if (raf) cancelAnimationFrame(raf);
        el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    };
    el.addEventListener('mousemove', handle);
    el.addEventListener('mouseleave', reset);
}
attachTilt(document.getElementById('tiltHero'), 6);
attachTilt(document.getElementById('tiltImage'), 4);
// --- Custom Cursor (Large-Screen Only) ---
if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorCircle = document.querySelector(".cursor-circle");

    if (cursorDot && cursorCircle) { // Check elements exist on page
        let mouseX = 0, mouseY = 0;
        let dotX = 0, dotY = 0;
        let circleX = 0, circleY = 0;

        const dotSpeed = 0.95;
        const circleSpeed = 0.18;

        document.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            // Dot follows mouse
            dotX += (mouseX - dotX) * dotSpeed;
            dotY += (mouseY - dotY) * dotSpeed;
            cursorDot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;

            // Circle lags for drag/trail effect
            circleX += (dotX - circleX) * circleSpeed;
            circleY += (dotY - circleY) * circleSpeed;
            cursorCircle.style.transform = `translate(${circleX}px, ${circleY}px) translate(-50%, -50%)`;

            requestAnimationFrame(animateCursor);
        }

        animateCursor();
    }
}

// --- Toggle Menu Logic ---
const menuBtn = document.getElementById('menuBtn');
const menuOverlay = document.getElementById('menuOverlay');
const closeOverlay = document.getElementById('closeOverlay');

function openMenu() {
    if (!menuOverlay || !menuBtn) return;

    menuOverlay.classList.remove('hidden');
    menuBtn.setAttribute('aria-expanded', 'true');

    requestAnimationFrame(() => {
        menuOverlay.classList.add('open-menu');
    });

    menuOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    menuBtn.classList.add('open');
}

function closeMenu() {
    if (!menuOverlay || !menuBtn) return;

    menuOverlay.classList.remove('open-menu');
    menuBtn.setAttribute('aria-expanded', 'false');

    setTimeout(() => {
        menuOverlay.classList.add('hidden');
        menuOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        menuBtn.classList.remove('open');
    }, 350);
}

if (menuBtn) menuBtn.addEventListener('click', () => {
    if (menuOverlay.classList.contains('hidden')) openMenu();
    else closeMenu();
});

if (closeOverlay) closeOverlay.addEventListener('click', closeMenu);

if (menuOverlay) {
    menuOverlay.addEventListener('click', (e) => {
        if (e.target === menuOverlay) closeMenu();
    });
}

// Accessibility: close on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOverlay && !menuOverlay.classList.contains('hidden')) closeMenu();
});

// --- Page Load Setup ---
window.addEventListener('load', () => {
    // Update copyright year if element exists
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Optional: About page animation delay
    const aboutContent = document.getElementById('aboutContent');
    if (aboutContent) aboutContent.style.animationDelay = '0.1s';
});

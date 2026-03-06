const cursorDot = document.querySelector(".cursor-dot");
const cursorCircle = document.querySelector(".cursor-circle");

let mouseX = 0,
    mouseY = 0;
let dotX = 0,
    dotY = 0;
let circleX = 0,
    circleY = 0;

const dotSpeed = 0.95;
const circleSpeed = 0.18;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    dotX += (mouseX - dotX) * dotSpeed;
    dotY += (mouseY - dotY) * dotSpeed;
    cursorDot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;

    circleX += (dotX - circleX) * circleSpeed;
    circleY += (dotY - circleY) * circleSpeed;
    cursorCircle.style.transform = `translate(${circleX}px, ${circleY}px) translate(-50%, -50%)`;

    requestAnimationFrame(animateCursor);
}

animateCursor();

/* ---------- MENU ---------- */
const menuBtn = document.getElementById('menuBtn');
const menuOverlay = document.getElementById('menuOverlay');
const closeOverlay = document.getElementById('closeOverlay');

function openMenu() {
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
    menuOverlay.classList.remove('open-menu');
    menuBtn.setAttribute('aria-expanded', 'false');
    setTimeout(() => {
        menuOverlay.classList.add('hidden');
        menuOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        menuBtn.classList.remove('open');
    }, 350);
}

menuBtn.addEventListener('click', () => {
    if (menuOverlay.classList.contains('hidden')) openMenu();
    else closeMenu();
});

closeOverlay.addEventListener('click', closeMenu);

menuOverlay.addEventListener('click', (e) => {
    if (e.target === menuOverlay) closeMenu();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menuOverlay.classList.contains('hidden')) closeMenu();
});

/* ---------- YEAR ---------- */
window.addEventListener('load', () => {
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});

/* ---------- VIDEO MODAL ---------- */
const videoTriggers = document.querySelectorAll(".video-trigger");
const videoModal = document.getElementById("videoModal");
const modalVideo = document.getElementById("modalVideo");
const closeModal = document.getElementById("closeModal");

videoTriggers.forEach(trigger => {
    trigger.addEventListener("click", () => {
        const videoSrc = trigger.getAttribute("data-video");
        modalVideo.src = videoSrc;
        videoModal.classList.remove("hidden");
        videoModal.classList.add("flex");
        modalVideo.play();
    });
});

closeModal.addEventListener("click", () => {
    videoModal.classList.add("hidden");
    videoModal.classList.remove("flex");
    modalVideo.pause();
    modalVideo.src = "";
});

videoModal.addEventListener("click", (e) => {
    if (e.target === videoModal) {
        videoModal.classList.add("hidden");
        videoModal.classList.remove("flex");
        modalVideo.pause();
        modalVideo.src = "";
    }
});

/* ---------- IMAGE MODAL ---------- */
const imageTriggers = document.querySelectorAll(".image-trigger");
const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const closeImageModal = document.getElementById("closeImageModal");

imageTriggers.forEach(trigger => {
    trigger.addEventListener("click", () => {
        const imageSrc = trigger.getAttribute("data-image");
        modalImage.src = imageSrc;
        imageModal.classList.remove("hidden");
        imageModal.classList.add("flex");
    });
});

closeImageModal.addEventListener("click", () => {
    imageModal.classList.add("hidden");
    imageModal.classList.remove("flex");
    modalImage.src = "";
});

imageModal.addEventListener("click", (e) => {
    if (e.target === imageModal) {
        imageModal.classList.add("hidden");
        imageModal.classList.remove("flex");
        modalImage.src = "";
    }
});
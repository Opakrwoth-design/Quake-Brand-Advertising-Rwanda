/* ===== TEAM POPUP JAVASCRIPT ===== */
/* Link this file in your HTML: <script src="team-popup.js" defer></script> */

// ---- State ----
let currentImages = [];
let currentIndex = 0;
let isLeadership = false;

// ---- Open Popup ----
function openPopup(card) {
    const overlay = document.getElementById('teamPopupOverlay');
    const popup = document.getElementById('teamPopup');
    const imgEl = document.getElementById('popupImage');
    const descEl = document.getElementById('popupDescription');
    const dotsEl = document.getElementById('popupDots');

    // Read data from clicked card
    currentImages = JSON.parse(card.getAttribute('data-images') || '[]');
    isLeadership = card.getAttribute('data-type') === 'leadership';
    const description = card.getAttribute('data-description') || '';
    currentIndex = 0;

    // Fallback: if only one image or images array is empty, use the card's own img src
    if (!currentImages.length) {
        const cardImg = card.querySelector('img');
        currentImages = [cardImg ? cardImg.src : ''];
    }

    // Set image
    imgEl.src = currentImages[currentIndex];
    imgEl.alt = card.querySelector('.card-name')?.textContent || 'Team member';

    // Description (leadership only)
    if (isLeadership && description) {
        descEl.textContent = description;
        descEl.style.display = 'block';
    } else {
        descEl.textContent = '';
        descEl.style.display = 'none';
    }

    // Dots
    buildDots(dotsEl);

    // Show/hide sliders based on image count
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    if (currentImages.length > 1) {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
    } else {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    }

    // Show overlay
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // prevent background scroll
}

// ---- Build Dot Indicators ----
function buildDots(container) {
    container.innerHTML = '';
    if (currentImages.length <= 1) return;

    currentImages.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = 'popup-dot' + (i === 0 ? ' active' : '');
        dot.onclick = () => goToSlide(i);
        container.appendChild(dot);
    });
}

// ---- Update Dots ----
function updateDots() {
    const dots = document.querySelectorAll('.popup-dot');
    dots.forEach((d, i) => {
        d.classList.toggle('active', i === currentIndex);
    });
}

// ---- Slide Image ----
function slideImage(direction) {
    if (!currentImages.length) return;

    const imgEl = document.getElementById('popupImage');

    // Fade out
    imgEl.style.opacity = '0';
    imgEl.style.transform = direction === 1 ? 'translateX(-30px)' : 'translateX(30px)';

    setTimeout(() => {
        currentIndex = (currentIndex + direction + currentImages.length) % currentImages.length;
        imgEl.src = currentImages[currentIndex];
        updateDots();

        // Fade in from opposite side
        imgEl.style.transform = direction === 1 ? 'translateX(30px)' : 'translateX(-30px)';
        // Force reflow
        void imgEl.offsetWidth;
        imgEl.style.opacity = '1';
        imgEl.style.transform = 'translateX(0)';
    }, 180);
}

// ---- Go to specific slide ----
function goToSlide(index) {
    if (index === currentIndex) return;
    const direction = index > currentIndex ? 1 : -1;
    const imgEl = document.getElementById('popupImage');

    imgEl.style.opacity = '0';
    imgEl.style.transform = direction === 1 ? 'translateX(-30px)' : 'translateX(30px)';

    setTimeout(() => {
        currentIndex = index;
        imgEl.src = currentImages[currentIndex];
        updateDots();

        imgEl.style.transform = direction === 1 ? 'translateX(30px)' : 'translateX(-30px)';
        void imgEl.offsetWidth;
        imgEl.style.opacity = '1';
        imgEl.style.transform = 'translateX(0)';
    }, 180);
}

// ---- Close Popup ----
function closePopup() {
    const overlay = document.getElementById('teamPopupOverlay');
    overlay.classList.remove('active');
    document.body.style.overflow = ''; // restore scroll
}

// ---- Close when clicking outside the popup box ----
function closePopupOnOverlay(event) {
    if (event.target === document.getElementById('teamPopupOverlay')) {
        closePopup();
    }
}

// ---- Keyboard support ----
document.addEventListener('keydown', function (e) {
    const overlay = document.getElementById('teamPopupOverlay');
    if (!overlay.classList.contains('active')) return;

    if (e.key === 'Escape') closePopup();
    if (e.key === 'ArrowRight') slideImage(1);
    if (e.key === 'ArrowLeft') slideImage(-1);
});
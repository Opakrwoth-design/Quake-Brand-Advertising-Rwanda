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

        window.addEventListener('load', () => {
            document.getElementById('currentYear').textContent = new Date().getFullYear();
        });

        /* ---------- Slider logic ---------- */
        (function () {
            const track = document.getElementById('sliderTrack');
            const prev = document.getElementById('prevBtn');
            const next = document.getElementById('nextBtn');
            let page = 0; // 0 or 1 (two pages)
            const totalPages = 2;

            function goToPage(index) {
                // On small screens (max-width: 640px), the CSS forces width: 100% and transform: translateX(0)
                // so the slider logic only runs for larger screens.
                if (window.innerWidth <= 640) return;

                page = (index + totalPages) % totalPages;
                const translateX = -(100 / totalPages) * page;
                track.style.transform = `translateX(${translateX}%)`;
            }

            prev.addEventListener('click', function (e) {
                e.preventDefault();
                goToPage(page - 1);
            });

            next.addEventListener('click', function (e) {
                e.preventDefault();
                goToPage(page + 1);
            });

            // Allow keyboard arrow navigation when focused (nice little accessibility add)
            document.addEventListener('keydown', function (e) {
                if (e.key === 'ArrowRight') goToPage(page + 1);
                if (e.key === 'ArrowLeft') goToPage(page - 1);
            });

            // Add a small tap/click ripple visual by briefly scaling on pointerdown
            document.querySelectorAll('.card').forEach(card => {
                card.addEventListener('pointerdown', () => card.style.transform = 'translateY(-3px) scale(.998)');
                card.addEventListener('pointerup', () => card.style.transform = '');
                card.addEventListener('pointerleave', () => card.style.transform = '');
            });

            // initial state
            goToPage(0);

            // Re-run goToPage on resize to ensure correct visual state if switching between breakpoints
            window.addEventListener('resize', () => {
                if (window.innerWidth > 640) {
                    // Only apply slider transform logic if not in the single-page view breakpoint
                    goToPage(page);
                } else {
                    // Ensure it's reset to the default on small screens
                    track.style.transform = 'translateX(0)';
                }
            });
        })();
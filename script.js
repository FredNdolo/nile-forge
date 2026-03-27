document.addEventListener("DOMContentLoaded", () => {

    /* ── GLOBAL REVEAL ANIMATIONS ── */
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll(".reveal").forEach(el => {
        revealObserver.observe(el);
    });


    /* ── IMAGE DIVIDERS ── */
    const imageDividerObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.35 });

    const dividers = document.querySelectorAll(".image-divider");
    dividers.forEach(div => imageDividerObserver.observe(div));


    /* ── PARALLAX EFFECT ── */
    const handleParallax = () => {
        dividers.forEach(div => {
            const rect = div.getBoundingClientRect();
            const img = div.querySelector("img");

            if (!img) return;

            // Only animate when in viewport
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const speed = 0.3; // adjust intensity (0.2–0.5 ideal)
                const offset = rect.top * speed;

                img.style.transform = `translateY(${offset}px) scale(1.05)`;
            }
        });
    };

    window.addEventListener("scroll", handleParallax);
    handleParallax(); // run on load


    /* ── COUNTER ANIMATION ── */
    const countObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count);
                let current = 0;
                const step = target / 40;

                const timer = setInterval(() => {
                    current = Math.min(current + step, target);
                    el.textContent = Math.round(current) + "%";

                    if (current >= target) clearInterval(timer);
                }, 25);

                observer.unobserve(el);
            }
        });
    }, { threshold: 0.6 });

    document.querySelectorAll("[data-count]").forEach(el => {
        countObserver.observe(el);
    });


    /* ── BUDGET BARS ── */
    const budgetEl = document.getElementById("budgetBars");

    if (budgetEl) {
        const budgetObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target
                        .querySelectorAll(".budget-bar-fill")
                        .forEach(bar => bar.classList.add("animated"));

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });

        budgetObserver.observe(budgetEl);
    }


    /* ── TIMELINE PROGRESS ── */
    const timelineFill = document.getElementById("timelineFill");

    if (timelineFill) {
        const timelineObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    timelineFill.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.6 });

        timelineObserver.observe(timelineFill);
    }

});

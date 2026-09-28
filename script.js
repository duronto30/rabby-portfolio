/* =========================================================
   RABBY PORTFOLIO — MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       01. PAGE LOADER
       ===================================================== */

    const loader = document.querySelector(".page-loader");

    if (loader) {
        setTimeout(function () {
            loader.classList.add("loaded");
        }, 500);
    }


    /* =====================================================
       02. HEADER SCROLL EFFECT
       ===================================================== */

    const header = document.querySelector(".site-header");

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });


    /* =====================================================
       03. MOBILE NAVIGATION
       ===================================================== */

    const mobileButton = document.querySelector(".mobile-menu-button");
    const navWrapper = document.querySelector(".nav-wrapper");
    const navLinks = document.querySelectorAll(".nav-link");

    if (mobileButton && navWrapper) {

        mobileButton.addEventListener("click", function () {

            mobileButton.classList.toggle("active");
            navWrapper.classList.toggle("open");
            document.body.classList.toggle("menu-open");

        });


        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                mobileButton.classList.remove("active");
                navWrapper.classList.remove("open");
                document.body.classList.remove("menu-open");

            });

        });

    }


    /* =====================================================
       04. CLOSE MOBILE MENU WITH ESCAPE
       ===================================================== */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            if (mobileButton) {
                mobileButton.classList.remove("active");
            }

            if (navWrapper) {
                navWrapper.classList.remove("open");
            }

            document.body.classList.remove("menu-open");

        }

    });


    /* =====================================================
       05. SCROLL PROGRESS
       ===================================================== */

    const progressBar = document.querySelector(".nav-progress span");

    function updateScrollProgress() {

        if (!progressBar) return;

        const scrollTop = window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        if (documentHeight <= 0) {
            progressBar.style.width = "0%";
            return;
        }

        const progress =
            (scrollTop / documentHeight) * 100;

        progressBar.style.width =
            Math.min(progress, 100) + "%";
    }

    updateScrollProgress();

    window.addEventListener("scroll", updateScrollProgress, {
        passive: true
    });


    /* =====================================================
       06. SMOOTH NAVIGATION
       ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight =
                header ? header.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       07. ACTIVE NAVIGATION
       ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    function updateActiveNavigation() {

        if (!sections.length) return;

        const scrollPosition =
            window.scrollY + 180;

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                sectionTop + sectionHeight
            ) {
                currentSection =
                    section.getAttribute("id");
            }

        });

        navLinks.forEach(function (link) {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (href === "#" + currentSection) {
                link.classList.add("active");
            }

        });

    }

    updateActiveNavigation();

    window.addEventListener("scroll", updateActiveNavigation, {
        passive: true
    });


    /* =====================================================
       08. SCROLL REVEAL ANIMATION
       ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("visible");

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -40px 0px"
                }
            );

        revealElements.forEach(function (element) {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(function (element) {

            element.classList.add("visible");

        });

    }


    /* =====================================================
       09. EXPERIENCE EXPAND / COLLAPSE
       ===================================================== */

    const experienceToggles =
        document.querySelectorAll(".experience-toggle");

    experienceToggles.forEach(function (toggle) {

        toggle.addEventListener("click", function () {

            const details =
                this.nextElementSibling;

            if (!details) return;

            const isOpen =
                details.classList.contains("open");

            if (isOpen) {

                details.classList.remove("open");
                this.classList.remove("active");

            } else {

                details.classList.add("open");
                this.classList.add("active");

            }

        });

    });


    /* =====================================================
       10. BACK TO TOP
       ===================================================== */

    const backToTop =
        document.querySelector(".back-to-top");

    if (backToTop) {

        backToTop.addEventListener("click", function (event) {

            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       11. MOUSE PARALLAX — HERO VISUAL
       ===================================================== */

    const heroVisual =
        document.querySelector(".hero-visual");

    const visualFrame =
        document.querySelector(".visual-frame");

    const isTouchDevice =
        window.matchMedia("(hover: none)").matches;

    if (
        heroVisual &&
        visualFrame &&
        !isTouchDevice
    ) {

        heroVisual.addEventListener(
            "mousemove",
            function (event) {

                const rect =
                    heroVisual.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateY =
                    ((x - centerX) / centerX) * 4;

                const rotateX =
                    ((y - centerY) / centerY) * -4;

                visualFrame.style.transform =
                    "perspective(1000px) " +
                    "rotateX(" + rotateX + "deg) " +
                    "rotateY(" + rotateY + "deg)";

            }
        );


        heroVisual.addEventListener(
            "mouseleave",
            function () {

                visualFrame.style.transform =
                    "perspective(1000px) rotateY(-4deg)";

            }
        );

    }


    /* =====================================================
       12. BUTTON MAGNETIC EFFECT
       ===================================================== */

    const magneticButtons =
        document.querySelectorAll(
            ".button, .nav-cta"
        );

    if (!isTouchDevice) {

        magneticButtons.forEach(function (button) {

            button.addEventListener(
                "mousemove",
                function (event) {

                    const rect =
                        button.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;

                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;

                    button.style.transform =
                        "translate(" +
                        x * 0.08 +
                        "px, " +
                        y * 0.08 +
                        "px)";

                }
            );


            button.addEventListener(
                "mouseleave",
                function () {

                    button.style.transform = "";

                }
            );

        });

    }


    /* =====================================================
       13. TEXTILE SYMBOL INTERACTION
       ===================================================== */

    const textileSymbol =
        document.querySelector(".textile-symbol");

    if (
        textileSymbol &&
        !isTouchDevice
    ) {

        document.addEventListener(
            "mousemove",
            function (event) {

                const x =
                    (event.clientX /
                        window.innerWidth -
                        0.5) * 20;

                const y =
                    (event.clientY /
                        window.innerHeight -
                        0.5) * 20;

                textileSymbol.style.transform =
                    "translate(calc(-50% + " +
                    x * 0.3 +
                    "px), calc(-50% + " +
                    y * 0.3 +
                    "px))";

            }
        );

    }


    /* =====================================================
       14. HOVER EFFECT FOR SKILL CARDS
       ===================================================== */

    const skillCards =
        document.querySelectorAll(".skill-card");

    if (!isTouchDevice) {

        skillCards.forEach(function (card) {

            card.addEventListener(
                "mousemove",
                function (event) {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX - rect.left;

                    const y =
                        event.clientY - rect.top;

                    card.style.setProperty(
                        "--mouse-x",
                        x + "px"
                    );

                    card.style.setProperty(
                        "--mouse-y",
                        y + "px"
                    );

                }
            );

        });

    }


    /* =====================================================
       15. KEYBOARD ACCESSIBILITY
       ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                const activeElement =
                    document.activeElement;

                if (
                    activeElement &&
                    activeElement.classList.contains(
                        "experience-toggle"
                    )
                ) {

                    activeElement.click();

                }

            }

        }
    );


    /* =====================================================
       16. UPDATE CURRENT YEAR
       ===================================================== */

    const yearElements =
        document.querySelectorAll("[data-current-year]");

    yearElements.forEach(function (element) {

        element.textContent =
            new Date().getFullYear();

    });


    /* =====================================================
       17. IMAGE FALLBACK
       ===================================================== */

    const images =
        document.querySelectorAll("img");

    images.forEach(function (image) {

        image.addEventListener(
            "error",
            function () {

                this.style.display = "none";

            }
        );

    });


    /* =====================================================
       18. RESIZE HANDLING
       ===================================================== */

    let resizeTimer;

    window.addEventListener(
        "resize",
        function () {

            clearTimeout(resizeTimer);

            resizeTimer =
                setTimeout(function () {

                    updateHeader();
                    updateScrollProgress();
                    updateActiveNavigation();

                }, 150);

        }
    );


    /* =====================================================
       19. PAGE IS READY
       ===================================================== */

    document.body.classList.add("page-ready");

});
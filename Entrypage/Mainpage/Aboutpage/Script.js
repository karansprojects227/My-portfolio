// ✅ Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

// Utility function for text animations
const animateText = (selector, options) => {
    let split = new SplitText(selector, { type: "chars" });
    gsap.set(selector, { opacity: 1 });
    gsap.from(split.chars, options);
};

// Common animation settings
const defaultEase = "power3.out";

// First Section Animations
(() => {
    animateText(".hero-text1", { opacity: 0, x: "-100%", rotate: 360, stagger: 0.08, duration: 3, ease: defaultEase });
    animateText(".tagline", { opacity: 0, y: "100%", stagger: 0.05, duration: 1.2, ease: defaultEase });
    [".about h2", ".about .para p"].forEach(sel => 
        animateText(sel, { opacity: 0, rotate: 180, y: "-100%", stagger: 0.04, duration: 1.2, ease: defaultEase })
    );
    [".percentage h5", ".colledge h5"].forEach((sel, i) => 
        animateText(sel, { opacity: 0, scale: 0, x: i === 0 ? "-100%" : "100%", stagger: 0.04, duration: 1.2, ease: defaultEase })
    );
})();

// Second Section Animations
(() => {
    animateText(".hero-text2", {
        opacity: 0, x: "-100%", rotate: 360, stagger: 0.08, duration: 3, ease: defaultEase,
        scrollTrigger: { trigger: ".hero-text2", start: "top 80%", end: "top 50%", scrub: true }
    });
    animateText(".future-para p", {
        opacity: 0, rotate: 180, y: "100%", scale: 0, stagger: 0.4, duration: 4, ease: defaultEase,
        scrollTrigger: { trigger: ".future-para p", start: "top 80%", end: "top top", scrub: true }
    });
})();

// Floating Form Animation
gsap.to(".form-container", { y: "-40%", duration: 3, yoyo: true, repeat: -1, ease: "power2.out" });

// **Menu Animation**
(() => {
    const menuOpenIcon = document.querySelector(".openmenu .open");
    const menuCloseIcon = document.querySelector(".openmenu .close");
    const menu = document.querySelector(".menu");
    const main = document.querySelector(".main");
    let lastScrollPosition = 0;
    let menuOpen = false
    
    gsap.from(".openmenu", { x: "-120%", duration: 2, yoyo: true, repeat: -1, ease: "power2.out" });
    
    // **Function to Open Menu**
    function openMenu() {
            lastScrollPosition = window.scrollY; // Store current scroll position
    
            // Hide `.main` smoothly
            gsap.to(main, {
                duration: 0.003,
                onComplete: () => {
                    main.style.display = "none"; // ✅ Hide main content
                }
            });
    
            // Show Menu
            gsap.set(menu, { display: "block"});
    
            menuOpen = true;
    
            // Animate next page text (Open Animation)
            gsap.from(".home", {
                x: -500,
                duration: 1.5,
                ease: "power2.out"
            });
            gsap.from(".skill", {
                x: 500,
                duration: 1.5,
                ease: "power2.out"
            });
            gsap.from(".extra", {
                y: 500,
                duration: 1.5,
                ease: "power2.out"
            });
        }
    
    // **Function to Close Menu**
    function closeMenu() {
        gsap.to(".menu .home", {
            x: -500,
            duration: 1.5,
            ease: "power2.out"
        });
    
        gsap.to(".menu .skill", {
            x: 500,
            duration: 1.5,
            ease: "power2.out"
        });
    
        gsap.to(".menu .extra", {
            y: 500,
            duration: 1.5,
            ease: "power2.out",
            onComplete: function() {
                // Reset all elements to default position
                gsap.set(".menu .home", { x: 0 });
                gsap.set(".menu .skill", { x: 0 });
                gsap.set(".menu .extra", { y: 0 });
    
                // Show main section and hide menu
                document.querySelector(".main").style.display = "block";
                document.querySelector(".menu").style.display = "none";
    
                // Restore scroll position
                window.scrollTo(0, lastScrollPosition);
            }
        });
    }
    
    // **Click Events**
    if (menuOpenIcon) menuOpenIcon.addEventListener("click", openMenu);
    if (menuCloseIcon) menuCloseIcon.addEventListener("click", closeMenu);
    
        // **Menu Item Click Events**
        document.querySelector(".home")?.addEventListener("click", () => {
            window.location.href = "../index.html";
        });
    
        document.querySelector(".skill")?.addEventListener("click", () => {
            window.location.href = "../skillpage/index.html";
        });
    
        document.querySelector(".extra")?.addEventListener("click", () => {
            window.location.href = "../extrapage/index.html";
        });
    
})();
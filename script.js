/* -------------------------- */
/* --- JAVASCRIPT & GSAP --- */
/* -------------------------- */

document.addEventListener("DOMContentLoaded", function () {

    // --- 0. Register GSAP Plugins ---
    gsap.registerPlugin(ScrollTrigger);

    // --- 1. Loading Screen Animation ---
    const tlLoader = gsap.timeline();

    tlLoader
        .to(".loader-inner", { y: 0, duration: 1.2, ease: "power4.out", delay: 0.5 })
        .to(".loader-inner", { y: "-100%", duration: 0.8, ease: "power2.in" }, "+=0.5")
        .to(".loading-screen", { y: "-100%", duration: 1, ease: "power3.inOut" }, "-=0.6")
        .to('body', { opacity: 1, duration: 0.5 }, "-=0.5")
        .set(".loading-screen", { display: 'none' });


    // --- 2. Hero Section Entrance Animation ---
    const tlHero = gsap.timeline({ delay: tlLoader.duration() - 0.5 });

    tlHero
        .from(".header", { y: -100, opacity: 0, duration: 1, ease: "power3.out" })
        .from(".hero-content .line", { y: 120, skewY: 10, duration: 1.2, stagger: 0.2, ease: "power4.out" }, "-=0.5")
        .from(".hero-content .anim-item", { y: 50, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out" }, "-=1");

    // --- 3. Parallax Hero Background ---
    gsap.to(".hero-bg", {
        scale: 1,
        ease: "none",
        scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: 1
        }
    });

    // --- 4. Header Scroll Effect ---
    ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        toggleClass: { className: 'scrolled', targets: '.header' }
    });

    // --- 5. Generic Scroll-Triggered Fade-Up Animations ---
    const animatedElements = gsap.utils.toArray('.section-title, .showcase-grid, .about-content, .product-gallery, .features-grid, .testimonial-carousel, .contact-form, .newsletter-form, .footer-content > *');

    animatedElements.forEach(el => {
        gsap.from(el, {
            y: 60,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });
    });

    // --- 6. 3D Interactive Showcase Cards ---
    const cards = document.querySelectorAll(".showcase-card");

    cards.forEach(card => {
        card.addEventListener("mousemove", e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const rotateX = -y / 25; // Control tilt intensity
            const rotateY = x / 25;

            gsap.to(card, {
                rotationX: rotateX,
                rotationY: rotateY,
                scale: 1.03,
                duration: 0.6,
                ease: "power1.out"
            });
        });

        card.addEventListener("mouseleave", () => {
            gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                scale: 1,
                duration: 1,
                ease: "elastic.out(1, 0.5)"
            });
        });
    });

    // --- 7. Product Gallery Interaction ---
    const mainImage = document.getElementById('mainProductImage');
    const thumbnails = document.querySelectorAll('.thumbnail');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function () {
            if (this.classList.contains('active')) return;

            const newSrc = this.getAttribute('src');
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            gsap.to(mainImage, {
                opacity: 0,
                duration: 0.3,
                ease: "power1.in",
                onComplete: () => {
                    mainImage.src = newSrc;
                    gsap.to(mainImage, { opacity: 1, duration: 0.4, ease: "power1.out" });
                }
            });
        });
    });

    // --- 8. Testimonial Carousel ---
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    let currentTestimonialIndex = 0;
    const testimonialInterval = 6000; // 6 seconds

    function showTestimonial(index) {
        if (index === currentTestimonialIndex) return;
        const outgoing = testimonialItems[currentTestimonialIndex];
        const incoming = testimonialItems[index];

        const tl = gsap.timeline();
        tl.to(outgoing, { opacity: 0, y: -20, duration: 0.6, ease: 'power2.in' })
            .set(outgoing, { display: 'none', y: 0 })
            .set(incoming, { display: 'block', y: 20, opacity: 0 })
            .to(incoming, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });

        currentTestimonialIndex = index;
    }

    gsap.set(testimonialItems[0], { display: 'block', opacity: 1 });

    setInterval(() => {
        let nextIndex = (currentTestimonialIndex + 1) % testimonialItems.length;
        showTestimonial(nextIndex);
    }, testimonialInterval);


    // --- 9. Crafting Process Timeline Animation ---
    const processSteps = gsap.utils.toArray('.process-step');
    gsap.to('.timeline-line-progress', {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
            trigger: '.process-timeline',
            start: 'top center',
            end: 'bottom center',
            scrub: true
        }
    });

    processSteps.forEach(step => {
        gsap.from(step.querySelector('.step-content'), {
            x: 50,
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: step,
                start: 'top 70%',
                toggleActions: 'play none none none',
            }
        });
        ScrollTrigger.create({
            trigger: step,
            start: 'top 50%',
            end: 'bottom 50%',
            toggleClass: { className: 'in-view', targets: step }
        });
    });
});
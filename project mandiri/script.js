// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Entry Animation
window.addEventListener('load', () => {
    const tl = gsap.timeline();

    tl.from(".floating", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)"
    })
    .from("h1", {
        x: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power4.out"
    }, "-=0.5")
    .from("h2", {
        y: 20,
        opacity: 0,
        duration: 0.5
    }, "-=0.3")
    .from(".brutalist-button", {
        scale: 0,
        opacity: 0,
        stagger: 0.2,
        duration: 0.5,
        ease: "back.out(2)"
    }, "-=0.2");
});

// Scroll Animations for sections
gsap.utils.toArray('section').forEach(section => {
    const cards = section.querySelectorAll('.brutalist-card');
    if (cards.length > 0) {
        gsap.from(cards, {
            scrollTrigger: {
                trigger: section,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            clearProps: "all" // Clears GSAP styles after animation to avoid conflicts
        });
    }
});

// Terminal Typing Animation (Fake)
const terminalLines = [
    "> loading_modules...",
    "> core_engine: initialized",
    "> creative_mode: active",
    "> retro_vibes: 100%",
    "> Welcome to Alcatraz OS v1.0.0",
    "> Status: Ready to build amazing things."
];

const terminal = document.getElementById('terminal');
let lineIndex = 0;

function typeTerminal() {
    if (lineIndex < terminalLines.length) {
        const line = document.createElement('div');
        line.className = "text-brutalist-yellow mt-1";
        line.innerText = terminalLines[lineIndex];
        terminal.appendChild(line);
        lineIndex++;
        setTimeout(typeTerminal, 1000);
    }
}

// Start terminal typing when in view
ScrollTrigger.create({
    trigger: "#terminal",
    onEnter: () => typeTerminal()
});

// Custom Cursor Trail (Simplified)
document.addEventListener('mousemove', (e) => {
    const dot = document.createElement('div');
    dot.className = "fixed w-2 h-2 bg-brutalist-pink z-[9999] pointer-events-none";
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
    dot.style.border = "1px solid black";
    document.body.appendChild(dot);

    gsap.to(dot, {
        opacity: 0,
        scale: 0.5,
        duration: 0.5,
        onComplete: () => dot.remove()
    });
});

// Smooth Scroll for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form Submission Feedback
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = "TRANSMISSION_SENT!";
        btn.classList.replace('bg-black', 'bg-brutalist-pink');
        btn.classList.add('text-black');
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.classList.replace('bg-brutalist-pink', 'bg-black');
            btn.classList.remove('text-black');
            form.reset();
        }, 3000);
    });
}

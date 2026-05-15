// Countdown Timer Logic
function updateCountdown() {
    const targetDate = new Date('May 29, 2026 19:30:00').getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        clearInterval(timerInterval);
        document.getElementById("countdown").innerHTML = "<h3 style='color: var(--accent-gold); font-family: Cairo;'>الفرح بدأ! ننتظركم بكل حب</h3>";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days.toString().padStart(2, '0');
    document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
    document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
}

const timerInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// Music & Splash Logic
const music = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const musicIcon = musicToggle.querySelector('i');
const splash = document.getElementById('splash');
const openBtn = document.getElementById('openInvite');
const loaderBar = document.getElementById('loaderBar');

// Loader Animation
let progress = 0;
const loaderInterval = setInterval(() => {
    progress += Math.random() * 8;
    if (progress >= 100) {
        progress = 100;
        clearInterval(loaderInterval);
        setTimeout(() => {
            loaderBar.parentElement.style.opacity = '0';
            openBtn.style.display = 'block';
            openBtn.style.animation = 'fadeInUp 0.8s forwards';
        }, 300);
    }
    loaderBar.style.width = progress + '%';
}, 120);

openBtn.addEventListener('click', () => {
    music.play().then(() => {
        musicToggle.classList.add('playing');
        musicIcon.className = 'bx bx-pause';
    }).catch(err => console.log("Autoplay blocked"));
    
    splash.style.opacity = '0';
    splash.style.transform = 'scale(1.1)';
    setTimeout(() => {
        splash.style.display = 'none';
    }, 1500);

    // Heart burst on open
    for(let i=0; i<40; i++) {
        setTimeout(createPetal, i * 30);
    }
});

musicToggle.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        musicToggle.classList.add('playing');
        musicIcon.className = 'bx bx-pause';
    } else {
        music.pause();
        musicToggle.classList.remove('playing');
        musicIcon.className = 'bx bxs-music';
    }
});

// RSVP Logic
document.querySelector('.rsvp-btn').addEventListener('click', () => {
    const phoneNumber = "201096722493";
    const message = encodeURIComponent("السلام عليكم، أود تأكيد حضوري لحفل خطوبة محمد & M. يسعدني مشاركتكم الفرحة.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
});

// Location Logic - Using user-provided link
document.querySelector('.location-btn').addEventListener('click', () => {
    window.open('https://maps.app.goo.gl/i4yw2JtbG1fKFDZm6', '_blank');
});

// Particles & Petals
function createParticle() {
    const container = document.getElementById('particles');
    if (!container) return;
    const p = document.createElement('div');
    p.innerHTML = '✨';
    p.style.position = 'absolute';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.top = '100vh';
    p.style.color = '#c5a059';
    p.style.fontSize = Math.random() * 10 + 5 + 'px';
    p.style.opacity = Math.random() * 0.5;
    p.style.transition = `all ${Math.random() * 5 + 5}s linear`;
    container.appendChild(p);
    setTimeout(() => {
        p.style.transform = `translateY(-110vh) rotate(${Math.random() * 360}deg)`;
        p.style.opacity = '0';
    }, 50);
    setTimeout(() => p.remove(), 10000);
}

function createPetal() {
    const container = document.getElementById('petals');
    if (!container) return;
    const petal = document.createElement('i');
    petal.className = 'bx bxs-heart';
    petal.style.position = 'absolute';
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.top = '-5vh';
    petal.style.color = Math.random() > 0.5 ? '#c5a059' : '#4a000e';
    petal.style.fontSize = Math.random() * 15 + 10 + 'px';
    petal.style.opacity = Math.random() * 0.6 + 0.2;
    petal.style.transition = `all ${Math.random() * 6 + 4}s linear`;
    container.appendChild(petal);
    setTimeout(() => {
        petal.style.transform = `translateY(105vh) translateX(${Math.random() * 100 - 50}px) rotate(${Math.random() * 720}deg)`;
        petal.style.opacity = '0';
    }, 50);
    setTimeout(() => petal.remove(), 10000);
}

setInterval(createParticle, 1000);
setInterval(createPetal, 1500);

// Scroll Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.info-item, .map-section, .countdown-section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});

// Countdown Timer Logic
function updateCountdown() {
    // Target date: May 29, 2026 (3rd day of Eid al-Adha)
    const targetDate = new Date('May 29, 2026 19:00:00').getTime();

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

// Music Toggle Logic
const music = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const musicIcon = musicToggle.querySelector('i');
const splash = document.getElementById('splash');
const openBtn = document.getElementById('openInvite');
const loaderBar = document.getElementById('loaderBar');

// Loader Animation
let progress = 0;
const loaderInterval = setInterval(() => {
    progress += Math.random() * 5;
    if (progress >= 100) {
        progress = 100;
        clearInterval(loaderInterval);
        loaderBar.parentElement.style.opacity = '0';
        setTimeout(() => {
            loaderBar.parentElement.style.display = 'none';
            openBtn.style.display = 'block';
        }, 500);
    }
    loaderBar.style.width = progress + '%';
}, 100);

// Play music and open invitation on splash click
openBtn.addEventListener('click', () => {
    music.play().then(() => {
        musicToggle.classList.add('playing');
        musicIcon.classList.replace('bxs-music', 'bx-pause-circle');
    }).catch(err => console.log("Autoplay blocked, user interaction required."));
    
    // Heart Burst Effect
    for(let i=0; i<30; i++) {
        setTimeout(createPetal, i * 50);
    }

    splash.style.opacity = '0';
    setTimeout(() => {
        splash.style.visibility = 'hidden';
    }, 1000);
});

musicToggle.addEventListener('click', () => {
    if (music.paused) {
        music.play().then(() => {
            musicToggle.classList.add('playing');
            musicIcon.classList.replace('bxs-music', 'bx-pause-circle');
        });
    } else {
        music.pause();
        musicToggle.classList.remove('playing');
        musicIcon.classList.replace('bx-pause-circle', 'bxs-music');
    }
});

// RSVP Button Logic
const rsvpBtn = document.querySelector('.rsvp-btn');
rsvpBtn.addEventListener('click', () => {
    const phoneNumber = "201096722493";
    const message = encodeURIComponent("السلام عليكم، أود تأكيد حضوري لحفل خطوبة محمد & M. يسعدني مشاركتكم هذه الفرحة.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
});

// Location Button Logic
const locationBtn = document.querySelector('.location-btn');
locationBtn.addEventListener('click', () => {
    // Replace with actual Google Maps link for the venue if available
    window.open('https://maps.google.com/?q=قاعة+شهرزاد+أويش+الحجر', '_blank');
});

// Floating Particles (Stars/Glints)
function createParticle() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particle = document.createElement('div');
    const icons = ['✨', '✧', '⭐'];
    particle.innerHTML = icons[Math.floor(Math.random() * icons.length)];
    particle.style.position = 'absolute';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = '110vh';
    particle.style.fontSize = (Math.random() * 15 + 5) + 'px';
    particle.style.color = '#d4af37';
    particle.style.opacity = Math.random() * 0.4 + 0.1;
    particle.style.transition = 'transform ' + (Math.random() * 10 + 10) + 's linear, opacity 3s';
    
    container.appendChild(particle);
    setTimeout(() => {
        particle.style.transform = `translateY(-120vh) rotate(${Math.random() * 360}deg)`;
        particle.style.opacity = '0';
    }, 100);
    setTimeout(() => particle.remove(), 20000);
}

// Falling Flower Icons (Bouquet Style)
function createPetal() {
    const container = document.getElementById('petals');
    if (!container) return;
    
    const icon = document.createElement('i');
    // Using variety of flower and spa icons to simulate a bouquet effect
    const flowerIcons = ['bx-spa', 'bxs-spa', 'bx-flower', 'bxs-flower', 'bx-flower-alt', 'bxs-flower-alt'];
    const randomIcon = flowerIcons[Math.floor(Math.random() * flowerIcons.length)];
    
    icon.className = `bx ${randomIcon}`;
    icon.style.position = 'absolute';
    icon.style.left = Math.random() * 100 + 'vw';
    icon.style.top = '-5vh';
    icon.style.fontSize = (Math.random() * 20 + 15) + 'px';
    icon.style.color = Math.random() > 0.5 ? '#c5a059' : '#8a0303'; // Mix of Gold and Burgundy
    icon.style.opacity = Math.random() * 0.6 + 0.4;
    icon.style.zIndex = '100';
    icon.style.pointerEvents = 'none';
    icon.style.textShadow = '0 0 5px rgba(0,0,0,0.3)';
    
    // Add custom animation for realistic falling
    const duration = Math.random() * 10 + 7;
    icon.style.transition = `transform ${duration}s linear, opacity 1s ease-in ${duration - 1}s`;
    
    container.appendChild(icon);
    
    setTimeout(() => {
        const drift = Math.random() * 200 - 100;
        const rotation = Math.random() * 1000 - 500;
        icon.style.transform = `translateY(110vh) translateX(${drift}px) rotate(${rotation}deg)`;
        icon.style.opacity = '0';
    }, 100);
    
    setTimeout(() => icon.remove(), duration * 1000 + 1000);
}

// Generate more particles and petals
setInterval(createParticle, 800);
setInterval(createPetal, 400); // Much more frequent petals

// Reveal Animation on Scroll
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.info-item, .quote-section').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(item);
});

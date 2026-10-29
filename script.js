// Helper
const id = (e) => document.getElementById(e);

// 1. Curtain Open & Auto Music Trigger
const openBtn = id('openBtn');
const curtainWrapper = id('curtainWrapper');
const bgMusic = id('bgMusic');
const musicToggle = id('musicToggle');
let isPlaying = false;

openBtn.addEventListener('click', () => {
  // Add class to trigger curtain CSS animation
  curtainWrapper.classList.add('open');

  // Try playing background music after user interaction
  bgMusic.play().then(() => {
    isPlaying = true;
    musicToggle.innerText = '🎶';
  }).catch(() => {
    console.log("Autoplay restricted by browser.");
  });

  // Remove curtain element after animation completes to allow interaction
  setTimeout(() => {
    curtainWrapper.classList.add('hidden');
  }, 1800);
});

// Music Toggle Button
musicToggle.addEventListener('click', () => {
  if (isPlaying) {
    bgMusic.pause();
    musicToggle.innerText = '🎵';
  } else {
    bgMusic.play();
    musicToggle.innerText = '🎶';
  }
  isPlaying = !isPlaying;
});

// 2. Sakura/Rose Petals Falling Effect
function createPetal() {
  const container = id('petalsContainer');
  const petal = document.createElement('div');
  petal.classList.add('petal');
  
  // Random sizing & positioning
  const size = Math.random() * 8 + 10;
  petal.style.width = size + 'px';
  petal.style.height = size * 1.4 + 'px';
  petal.style.left = Math.random() * 100 + 'vw';
  petal.style.animationDuration = Math.random() * 3 + 5 + 's';
  
  container.appendChild(petal);

  setTimeout(() => {
    petal.remove();
  }, 8000);
}

setInterval(createPetal, 300);

// 3. Countdown Timer
const weddingDate = new Date('2026-11-20T15:00:00').getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance > 0) {
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    id('days').innerText = days < 10 ? '0' + days : days;
    id('hours').innerText = hours < 10 ? '0' + hours : hours;
    id('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
    id('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
  }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// 4. Scroll Reveal Animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

// 5. RSVP Form
id('rsvpForm').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Баярлалаа! Таны ирцийн мэдээлэл баталгаажлаа.');
  e.target.reset();
});
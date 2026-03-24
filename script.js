const loader = document.getElementById('loader-wrapper');
const mainUI = document.getElementById('main-ui');
const mainHeader = document.getElementById('main-header');
const frameContainer = document.getElementById('frame-container');
const iframe = document.getElementById('content-frame');
const clockEl = document.getElementById('live-clock');
const cursor = document.getElementById('custom-cursor');

// 1. Clock & Weather Logic
function updateClock() {
    const now = new Date();
    clockEl.innerText = now.toLocaleTimeString('en-US', { hour12: true });
}
setInterval(updateClock, 1000);

// 2. Particle System (Simplified for Performance)
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
canvas.width = window.innerWidth; canvas.height = window.innerHeight;
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
    }
    update() {
        this.x += this.speedX; this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0; if (this.y > canvas.height) this.y = 0;
    }
    draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.beginPath(); ctx.arc(this.x, this.y, 1, 0, Math.PI * 2); ctx.fill();
    }
}
function init() { for (let i = 0; i < 80; i++) particles.push(new Particle()); }
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}
init(); animate();

// 3. Navigation Logic
function loadUrl(url) {
    if (!url) return;
    if (!url.startsWith('http')) url = 'https://' + url;
    
    loader.style.display = 'flex';
    loader.style.opacity = '1';
    iframe.src = url;

    iframe.onload = () => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            mainUI.classList.add('hidden');
            mainHeader.classList.add('hidden'); // Hide Home Header when browsing
            frameContainer.classList.remove('hidden');
        }, 800);
    };
}

document.getElementById('nav-home').onclick = () => {
    frameContainer.classList.add('hidden');
    mainUI.classList.remove('hidden');
    mainHeader.classList.remove('hidden'); // Show Home Header again
    iframe.src = "";
};

// Controls
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

window.addEventListener('load', () => {
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => { loader.style.display = 'none'; mainUI.classList.remove('hidden'); }, 800);
    }, 2000);
});

document.getElementById('main-go-btn').onclick = () => loadUrl(document.getElementById('main-url-input').value);
document.getElementById('shortcut-music').onclick = () => loadUrl('https://monochrome.tf');
document.getElementById('nav-refresh').onclick = () => iframe.src = iframe.src;

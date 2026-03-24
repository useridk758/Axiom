const loader = document.getElementById('loader-wrapper');
const mainUI = document.getElementById('main-ui');
const frameContainer = document.getElementById('frame-container');
const iframe = document.getElementById('content-frame');
const omniBar = document.getElementById('omni-bar');
const mainInput = document.getElementById('main-url-input');
const mainGoBtn = document.getElementById('main-go-btn');
const cursor = document.getElementById('custom-cursor');

// 1. Particle Background
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0; if (this.y > canvas.height) this.y = 0;
        if (this.x < 0) this.x = canvas.width; if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
    }
}
function init() { for (let i = 0; i < 100; i++) particles.push(new Particle()); }
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}
init(); animate();

// 2. Cursor & Loader
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

window.addEventListener('load', () => {
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => { loader.style.display = 'none'; mainUI.classList.remove('hidden'); mainUI.style.opacity = '1'; }, 800);
    }, 2000);
});

// 3. Navigation
function loadUrl(url) {
    if (!url) return;
    if (!url.startsWith('http')) url = 'https://' + url;
    loader.style.display = 'flex';
    loader.style.opacity = '1';
    iframe.src = url;
    omniBar.value = url;
    iframe.onload = () => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            mainUI.classList.add('hidden');
            frameContainer.classList.remove('hidden');
            frameContainer.style.opacity = '1';
        }, 800);
    };
}

// Event Listeners
mainGoBtn.onclick = () => loadUrl(mainInput.value);
mainInput.onkeydown = (e) => { if (e.key === 'Enter') loadUrl(mainInput.value); };
omniBar.onkeydown = (e) => { if (e.key === 'Enter') loadUrl(omniBar.value); };
document.getElementById('nav-home').onclick = () => {
    frameContainer.classList.add('hidden');
    mainUI.classList.remove('hidden');
    iframe.src = "";
};
document.getElementById('nav-refresh').onclick = () => iframe.src = iframe.src;
document.getElementById('shortcut-music').onclick = () => loadUrl('https://monochrome.tf');

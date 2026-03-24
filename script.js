const loader = document.getElementById('loader-wrapper');
const mainUI = document.getElementById('main-ui');
const frameContainer = document.getElementById('frame-container');
const iframe = document.getElementById('content-frame');
const omniBar = document.getElementById('omni-bar');
const homeBtn = document.getElementById('nav-home');
const refreshBtn = document.getElementById('nav-refresh');
const cursor = document.getElementById('custom-cursor');

// 1. Custom Cursor Follow
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// 2. Particle Background Logic
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < 80; i++) particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}
initParticles();
animate();

// 3. App Logic
window.addEventListener('load', () => {
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            mainUI.classList.remove('hidden');
            mainUI.style.opacity = '1';
        }, 1000);
    }, 2000);
});

function loadUrl(url) {
    if (!url) return;
    if (!url.startsWith('http')) url = 'https://' + url;
    loader.style.display = 'flex';
    loader.style.opacity = '1';
    omniBar.value = url;
    iframe.src = url;
    iframe.onload = () => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            mainUI.classList.add('hidden');
            frameContainer.classList.remove('hidden');
            frameContainer.style.opacity = '1';
        }, 1000);
    };
}

homeBtn.onclick = () => {
    frameContainer.classList.add('hidden');
    mainUI.classList.remove('hidden');
    mainUI.style.opacity = '1';
    iframe.src = "";
};

refreshBtn.onclick = () => { iframe.src = iframe.src; };

omniBar.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') loadUrl(omniBar.value);
});

document.getElementById('shortcut-music').onclick = () => {
    loadUrl('https://monochrome.tf');
};

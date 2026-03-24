const loader = document.getElementById('loader-wrapper');
const mainUI = document.getElementById('main-ui');
const mainHeader = document.getElementById('main-header');
const frameContainer = document.getElementById('frame-container');
const iframe = document.getElementById('content-frame');
const clockEl = document.getElementById('live-clock');
const cursor = document.getElementById('custom-cursor');

// 1. Smooth Particle Background
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
canvas.width = window.innerWidth; canvas.height = window.innerHeight;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
    }
    update() {
        this.x += this.speedX; this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0; if (this.y > canvas.height) this.y = 0;
        if (this.x < 0) this.x = canvas.width; if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
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

// 2. Clock Logic
function updateClock() {
    const now = new Date();
    clockEl.innerText = now.toLocaleTimeString('en-US', { hour12: true });
}
setInterval(updateClock, 1000);
updateClock();

// 3. Navigation & Home Logic (Fixed Loop Bug)
function loadUrl(url) {
    if (!url) return;
    if (!url.startsWith('http')) url = 'https://' + url;
    
    // Reset Iframe src FIRST to prevent the browser from thinking it's still on the old page
    iframe.src = 'about:blank'; 
    
    loader.style.display = 'flex';
    loader.style.opacity = '1';
    
    // Small delay to ensure the spinner is visible
    setTimeout(() => {
        iframe.src = url;
        document.getElementById('omni-bar').value = ""; // Clear Omnibar as requested
    }, 100);

    iframe.onload = () => {
        if (iframe.src === 'about:blank') return;
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            mainUI.classList.add('hidden');
            mainHeader.classList.add('hidden');
            frameContainer.classList.remove('hidden');
        }, 800);
    };
}

// Fixed Home Button
document.getElementById('nav-home').onclick = () => {
    // 1. Clear the iframe source completely so it doesn't "auto-reload"
    iframe.src = 'about:blank'; 
    
    // 2. Swap the UI visibility
    frameContainer.classList.add('hidden');
    mainUI.classList.remove('hidden');
    mainHeader.classList.remove('hidden');
};

// 4. Initial Loading Sequence (Circle Spinner -> Everything Fades In)
window.addEventListener('load', () => {
    setTimeout(() => {
        loader.style.opacity = '0'; // Circle Spinner fades out
        setTimeout(() => { 
            loader.style.display = 'none'; 
            mainUI.classList.remove('hidden'); 
            mainHeader.classList.remove('hidden');
            // Force re-trigger of animations
            mainUI.style.opacity = '1';
            mainHeader.style.opacity = '1';
        }, 1000);
    }, 2500); // 2.5 seconds of spinning
});

// 5. Input Listeners
document.getElementById('main-go-btn').onclick = () => loadUrl(document.getElementById('main-url-input').value);
document.getElementById('main-url-input').onkeydown = (e) => { if (e.key === 'Enter') loadUrl(e.target.value); };
document.getElementById('omni-bar').onkeydown = (e) => { if (e.key === 'Enter') loadUrl(e.target.value); };

// 6. Shortcuts
document.getElementById('shortcut-music').onclick = () => loadUrl('https://monochrome.tf');
document.getElementById('shortcut-movies').onclick = () => loadUrl('https://m-zone.org');

// Cursor Follow
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

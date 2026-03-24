const loader = document.getElementById('loader-wrapper');
const mainUI = document.getElementById('main-ui');
const mainHeader = document.getElementById('main-header');
const frameContainer = document.getElementById('frame-container');
const iframe = document.getElementById('content-frame');
const clockEl = document.getElementById('live-clock');

// 1. Clock
function updateClock() {
    const now = new Date();
    clockEl.innerText = now.toLocaleTimeString('en-US', { hour12: true });
}
setInterval(updateClock, 1000);
updateClock();

// 2. Navigation (Fixed Home Loop)
function loadUrl(url) {
    if (!url) return;
    if (!url.startsWith('http')) url = 'https://' + url;
    
    iframe.src = 'about:blank'; // Reset frame
    loader.style.display = 'flex';
    loader.style.opacity = '1';

    setTimeout(() => {
        iframe.src = url;
    }, 100);

    iframe.onload = () => {
        if (iframe.src === 'about:blank') return;
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            mainUI.classList.add('hidden');
            mainHeader.classList.add('hidden');
            frameContainer.classList.remove('hidden');
        }, 600);
    };
}

document.getElementById('nav-home').onclick = () => {
    iframe.src = 'about:blank';
    frameContainer.classList.add('hidden');
    mainUI.classList.remove('hidden');
    mainHeader.classList.remove('hidden');
};

// 3. Init Sequence
window.addEventListener('load', () => {
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            mainUI.classList.remove('hidden');
            mainHeader.classList.remove('hidden');
        }, 600);
    }, 2000);
});

// Particles & Cursor
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; canvas.height = window.innerHeight;
let particles = Array.from({length: 80}, () => ({
    x: Math.random() * canvas.width, y: Math.random() * canvas.height,
    vx: Math.random() * 0.4 - 0.2, vy: Math.random() * 0.4 - 0.2
}));

function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if(p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if(p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.fillStyle = "rgba(255,255,255,0.2)";
        ctx.beginPath(); ctx.arc(p.x, p.y, 1, 0, Math.PI*2); ctx.fill();
    });
    requestAnimationFrame(animate);
}
animate();

document.addEventListener('mousemove', (e) => {
    const cursor = document.getElementById('custom-cursor');
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Controls
document.getElementById('main-go-btn').onclick = () => loadUrl(document.getElementById('main-url-input').value);
document.getElementById('main-url-input').onkeydown = (e) => { if(e.key === 'Enter') loadUrl(e.target.value); };
document.getElementById('shortcut-music').onclick = () => loadUrl('https://monochrome.tf');
document.getElementById('shortcut-movies').onclick = () => loadUrl('https://vexo.tv');
document.getElementById('nav-refresh').onclick = () => iframe.src = iframe.src;

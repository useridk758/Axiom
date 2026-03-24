const loader = document.getElementById('loader-wrapper');
const mainUI = document.getElementById('main-ui');
const mainHeader = document.getElementById('main-header');
const frameContainer = document.getElementById('frame-container');
const iframe = document.getElementById('content-frame');
const clockEl = document.getElementById('live-clock');

// 1. Star Animation Logic
const canvas = document.getElementById('star-canvas');
const ctx = canvas.getContext('2d');
let stars = [];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function initStars() {
    stars = [];
    for (let i = 0; i < 200; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.2,
            opacity: Math.random(),
            speed: Math.random() * 0.02
        });
    }
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
        s.opacity += s.speed;
        if (s.opacity > 1 || s.opacity < 0) s.speed *= -1;
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
    });
    requestAnimationFrame(drawStars);
}
initStars(); drawStars();

// 2. Clock & UI Logic
function updateClock() {
    const now = new Date();
    clockEl.innerText = now.toLocaleTimeString('en-US', { hour12: true });
}
setInterval(updateClock, 1000);
updateClock();

function loadUrl(url) {
    if (!url) return;
    if (!url.startsWith('http')) url = 'https://' + url;
    iframe.src = 'about:blank';
    loader.style.display = 'flex';
    loader.style.opacity = '1';
    setTimeout(() => { iframe.src = url; }, 100);

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

// 3. Button Bindings
document.getElementById('nav-home').onclick = () => {
    iframe.src = 'about:blank';
    frameContainer.classList.add('hidden');
    mainUI.classList.remove('hidden');
    mainHeader.classList.remove('hidden');
};

document.getElementById('nav-refresh').onclick = () => { iframe.src = iframe.src; };

document.getElementById('about-trigger').onclick = () => {
    alert("AXIOM WEB\nCreated by: Dunko\nVersion: 1.0.5\nStay Smooth.");
};

document.getElementById('shortcut-music').onclick = () => loadUrl('https://monochrome.tf');
document.getElementById('shortcut-movies').onclick = () => loadUrl('https://vexo.tv');

document.getElementById('main-go-btn').onclick = () => loadUrl(document.getElementById('main-url-input').value);
document.getElementById('main-url-input').onkeydown = (e) => { if(e.key === 'Enter') loadUrl(e.target.value); };

// Cursor
document.addEventListener('mousemove', (e) => {
    const cursor = document.getElementById('custom-cursor');
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Start-up sequence
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

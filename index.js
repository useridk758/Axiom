const loader = document.getElementById('loader-wrapper');
const mainUI = document.getElementById('main-ui');
const mainHeader = document.getElementById('main-header');
const frameContainer = document.getElementById('frame-container');
const iframe = document.getElementById('content-frame');
const clockEl = document.getElementById('live-clock');

// 1. Stars Logic
const canvas = document.getElementById('star-canvas');
const ctx = canvas.getContext('2d');
let stars = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars();
}

function initStars() {
    stars = [];
    const count = Math.floor((canvas.width * canvas.height) / 3000);
    for (let i = 0; i < count; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 0.5,
            opacity: Math.random(),
            speed: Math.random() * 0.015 + 0.005
        });
    }
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
        s.opacity += s.speed;
        if (s.opacity > 1 || s.opacity < 0.1) s.speed *= -1;
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
    });
    requestAnimationFrame(animateStars);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
animateStars();

// 2. Cinematic Fade-In Sequence (FIXED)
window.addEventListener('load', () => {
    setTimeout(() => {
        loader.style.opacity = '0';
        
        setTimeout(() => {
            loader.style.display = 'none';
            
            // Reveal header first
            mainHeader.classList.add('visible-element');
            
            // Delay main UI slightly for "layered" effect
            setTimeout(() => {
                mainUI.classList.add('visible-element');
            }, 400);
        }, 800);
    }, 2000);
});

// 3. Navigation
function loadUrl(url) {
    if (!url) return;
    if (!url.startsWith('http')) url = 'https://' + url;
    
    // Switch to Black screen loader
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
            mainUI.classList.remove('visible-element');
            mainHeader.classList.remove('visible-element');
            
            frameContainer.style.display = 'flex';
            setTimeout(() => {
                frameContainer.classList.add('visible-element');
            }, 50);
        }, 600);
    };
}

document.getElementById('nav-home').onclick = () => {
    frameContainer.classList.remove('visible-element');
    setTimeout(() => {
        frameContainer.style.display = 'none';
        iframe.src = 'about:blank';
        mainHeader.classList.add('visible-element');
        mainUI.classList.add('visible-element');
    }, 600);
};

document.getElementById('nav-refresh').onclick = () => { iframe.src = iframe.src; };

// Clock & Handlers
function updateClock() {
    const now = new Date();
    clockEl.innerText = now.toLocaleTimeString('en-US', { hour12: true });
}
setInterval(updateClock, 1000);
updateClock();

document.getElementById('main-go-btn').onclick = () => loadUrl(document.getElementById('main-url-input').value);
document.getElementById('main-url-input').onkeydown = (e) => { if(e.key === 'Enter') loadUrl(e.target.value); };
document.getElementById('shortcut-music').onclick = () => loadUrl('https://monochrome.tf');
document.getElementById('shortcut-movies').onclick = () => loadUrl('https://vexo.tv');

document.addEventListener('mousemove', (e) => {
    const cursor = document.getElementById('custom-cursor');
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.getElementById('about-trigger').onclick = () => {
    alert("AXIOM WEB\nCreated by: Dunko\nVersion: 1.0.7\nExperience the void.");
};

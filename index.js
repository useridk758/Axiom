const loader = document.getElementById('loader-wrapper');
const mainUI = document.getElementById('main-ui');
const mainHeader = document.getElementById('main-header');
const frameContainer = document.getElementById('frame-container');
const iframe = document.getElementById('content-frame');
const clockEl = document.getElementById('live-clock');

// 1. History Engine
let history = JSON.parse(localStorage.getItem('axiom_history')) || [];

function saveToHistory(url) {
    if (!url || url.includes('about:blank')) return;
    history = history.filter(item => item !== url); // Remove duplicates
    history.unshift(url); // Add to top
    if (history.length > 20) history.pop(); // Keep only 20
    localStorage.setItem('axiom_history', JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    const list = document.getElementById('history-list');
    list.innerHTML = history.map(url => `<div class="history-item">${url}</div>`).join('');
    document.querySelectorAll('.history-item').forEach(item => {
        item.onclick = () => loadUrl(item.innerText);
    });
}

document.getElementById('history-trigger').onclick = () => {
    const panel = document.getElementById('history-panel');
    panel.classList.toggle('visible-panel');
    renderHistory();
};

document.getElementById('clear-history').onclick = () => {
    history = [];
    localStorage.removeItem('axiom_history');
    renderHistory();
};

// 2. Navigation Fix
function loadUrl(url) {
    if (!url || url.trim() === "") return;
    let targetUrl = url.trim();
    if (!targetUrl.startsWith('http')) targetUrl = 'https://' + targetUrl;

    loader.style.display = 'flex';
    loader.style.opacity = '1';
    iframe.src = targetUrl;
    saveToHistory(targetUrl);

    iframe.onload = () => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            mainUI.style.display = 'none';
            mainHeader.style.display = 'none';
            frameContainer.style.display = 'flex';
            setTimeout(() => { frameContainer.style.opacity = '1'; }, 50);
        }, 600);
    };
}

// 3. System Controls
document.getElementById('nav-home').onclick = () => {
    frameContainer.style.opacity = '0';
    setTimeout(() => {
        frameContainer.style.display = 'none';
        iframe.src = 'about:blank';
        mainHeader.style.display = 'flex';
        mainUI.style.display = 'flex';
        setTimeout(() => {
            mainHeader.style.opacity = '1';
            mainUI.style.opacity = '1';
        }, 50);
    }, 600);
};

// Initial Start Sequence (Fixed)
window.addEventListener('DOMContentLoaded', () => {
    // Canvas Stars
    const canvas = document.getElementById('star-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let stars = Array.from({length: 150}, () => ({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        s: Math.random() * 2, o: Math.random(), sp: Math.random() * 0.01 + 0.005
    }));
    function draw() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        stars.forEach(s => {
            s.o += s.sp; if(s.o > 1 || s.o < 0) s.sp *= -1;
            ctx.fillStyle = `rgba(255,255,255,${s.o})`;
            ctx.beginPath(); ctx.arc(s.x, s.y, s.s, 0, Math.PI*2); ctx.fill();
        });
        requestAnimationFrame(draw);
    }
    draw();

    // Fade In UI
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            mainHeader.style.display = 'flex';
            mainUI.style.display = 'flex';
            setTimeout(() => {
                mainHeader.style.opacity = '1';
                mainUI.style.opacity = '1';
            }, 100);
        }, 800);
    }, 2000);
});

// Event Listeners
document.getElementById('main-go-btn').onclick = () => loadUrl(document.getElementById('main-url-input').value);
document.getElementById('main-url-input').onkeydown = (e) => { if(e.key === 'Enter') loadUrl(e.target.value); };
document.getElementById('omni-bar').onkeydown = (e) => { if(e.key === 'Enter') loadUrl(e.target.value); };
document.getElementById('shortcut-music').onclick = () => loadUrl('https://monochrome.tf');
document.getElementById('shortcut-movies').onclick = () => loadUrl('https://vexo.tv');
document.getElementById('nav-refresh').onclick = () => { iframe.src = iframe.src; };

// Clock
setInterval(() => {
    document.getElementById('live-clock').innerText = new Date().toLocaleTimeString();
}, 1000);

// Cursor
document.addEventListener('mousemove', (e) => {
    const c = document.getElementById('custom-cursor');
    c.style.left = e.clientX + 'px';
    c.style.top = e.clientY + 'px';
});

document.getElementById('about-trigger').onclick = () => alert("AXIOM WEB\nBy Dunko");

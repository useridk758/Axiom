const decoy = document.getElementById('decoy-view');
const hub = document.getElementById('hub-view');
const grid = document.getElementById('content-grid');

// METHOD 1: The "Right-Shift + L" Combo
document.addEventListener('keydown', (e) => {
    if (e.shiftKey && e.key.toLowerCase() === 'l') {
        unlockAxiom();
    }
});

// METHOD 2: The Stealth Button (That tiny dot at the bottom)
document.getElementById('auth-check').onclick = () => unlockAxiom();

function unlockAxiom() {
    decoy.style.display = 'none';
    hub.style.display = 'block';
    document.title = "Axiom | Dashboard";
    loadModules();
}

function loadModules() {
    grid.innerHTML = ''; // Clear it first
    AXIOM_CONFIG.modules.forEach(item => {
        const card = document.createElement('div');
        card.className = "app-card";
        card.innerHTML = `
            <div class="card-icon">${item.title[0]}</div>
            <h3>${item.title}</h3>
        `;
        card.onclick = () => window.location.href = item.url;
        grid.appendChild(card);
    });
}

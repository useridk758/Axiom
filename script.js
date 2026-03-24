const resources = [
    { name: "Module_01", type: "Logic", url: "#" },
    { name: "Module_02", type: "Physics", url: "#" },
    { name: "Module_03", type: "Calculus", url: "#" }
];

const grid = document.getElementById('content-grid');

resources.forEach(item => {
    const card = document.createElement('div');
    card.style.padding = '20px';
    card.style.background = '#161b22';
    card.style.border = '1px solid #30363d';
    card.style.borderRadius = '8px';
    card.innerHTML = `
        <h3>${item.name}</h3>
        <p style="font-size: 0.8rem; opacity: 0.7;">Type: ${item.type}</p>
    `;
    card.onclick = () => window.location.href = item.url;
    grid.appendChild(card);
});

console.log("Axiom System Initialized.");

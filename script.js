const loader = document.getElementById('loader-wrapper');
const mainUI = document.getElementById('main-ui');
const frameContainer = document.getElementById('frame-container');
const iframe = document.getElementById('content-frame');

// The new navigation elements
const omniBar = document.getElementById('omni-bar');
const homeBtn = document.getElementById('nav-home');
const refreshBtn = document.getElementById('nav-refresh');

// 1. Initial Load Sequence
window.addEventListener('load', () => {
    setTimeout(() => {
        loader.style.opacity = '0'; // Fade out spinner
        setTimeout(() => {
            loader.style.display = 'none';
            mainUI.classList.remove('hidden'); // Fade in Axiom UI
            mainUI.style.opacity = '1';
        }, 1000);
    }, 2000); // Spinner shows for 2 seconds
});

// 2. Main Loading Function
function loadUrl(url) {
    if (!url) return;
    if (!url.startsWith('http')) url = 'https://' + url;

    // Show spinner overlay during internal load
    loader.style.display = 'flex';
    loader.style.opacity = '1';
    
    // Sync the top navigation bar input
    omniBar.value = url;
    iframe.src = url;

    // Once iframe is loaded, hide loader and switch views
    iframe.onload = () => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            mainUI.classList.add('hidden'); // Hide the grid UI
            frameContainer.classList.remove('hidden'); // Show the internal viewer
            frameContainer.style.opacity = '1';
        }, 1000);
    };
}

// 3. Navigation Controls
homeBtn.onclick = () => {
    frameContainer.classList.add('hidden');
    mainUI.classList.remove('hidden');
    mainUI.style.opacity = '1';
    iframe.src = ""; // Stop the iframe
};

refreshBtn.onclick = () => {
    iframe.src = iframe.src;
};

// Handle entering a URL in the internal top bar
omniBar.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') loadUrl(omniBar.value);
});

// 4. SHORTCUT LINKS
document.getElementById('shortcut-roblox').onclick = () => {
    loadUrl('https://useridk758.github.io/roblo/');
};

document.getElementById('shortcut-music').onclick = () => {
    loadUrl('https://monochrome.tf');
};

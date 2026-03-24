const loader = document.getElementById('loader-wrapper');
const mainUI = document.getElementById('main-ui');
const frameContainer = document.getElementById('frame-container');
const iframe = document.getElementById('content-frame');
const omniBar = document.getElementById('omni-bar');
const homeBtn = document.getElementById('nav-home');
const refreshBtn = document.getElementById('nav-refresh');

// 1. Initial Load sequence
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

// 2. Navigation Function
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

refreshBtn.onclick = () => {
    iframe.src = iframe.src;
};

omniBar.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') loadUrl(omniBar.value);
});

// 3. Shortcuts
document.getElementById('shortcut-roblox').onclick = () => {
    loadUrl('https://useridk758.github.io/roblo/');
};

document.getElementById('shortcut-music').onclick = () => {
    loadUrl('https://monochrome.tf');
};

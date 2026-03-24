const loader = document.getElementById('loader-wrapper');
const mainUI = document.getElementById('main-ui');
const frameContainer = document.getElementById('frame-container');
const iframe = document.getElementById('content-frame');
const urlInput = document.getElementById('url-input');
const goBtn = document.getElementById('go-btn');

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

// 2. Loading a Website
function loadUrl() {
    let url = urlInput.value;
    if (!url.startsWith('http')) url = 'https://' + url;

    // Show loader again
    loader.style.display = 'flex';
    loader.style.opacity = '1';
    
    iframe.src = url;

    // Once iframe is loaded, hide loader
    iframe.onload = () => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            mainUI.classList.add('hidden'); // Hide the search UI
            frameContainer.classList.remove('hidden'); // Show the site
            frameContainer.style.opacity = '1';
        }, 1000);
    };
}

goBtn.onclick = loadUrl;
urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') loadUrl();
});

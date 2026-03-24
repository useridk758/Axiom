// Tab Cloaking Logic
const originalTitle = document.title;
const cloakTitle = "My Drive - Google Drive";
const cloakIcon = "https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png";

window.onblur = () => {
    document.title = cloakTitle;
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
    }
    link.href = cloakIcon;
};

window.onfocus = () => {
    document.title = originalTitle;
};

// Panic Key Redirect
document.addEventListener('keydown', (e) => {
    if (e.key === "~") { // Change this to any key you prefer
        window.location.replace("https://www.google.com");
    }
});

console.log("Stealth protocols active.");

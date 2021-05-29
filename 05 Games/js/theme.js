
// Call variables
const navbar = document.querySelector(".navbar");
const itemHover = document.querySelectorAll(".items");

// For home 
//also nasa home.js ang content variable
const banner = document.querySelector(".banner")
const highlight = document.querySelector(".highlight")
const message = document.querySelector(".message")


let themed = 0;
function themeAdjust() {
    switch (themed) {
        case 0:
            // Dark
            navbar.style.background = "var(--nav-color-dark)";
            itemHover.forEach(items => {
                items.style.setProperty('--items-hover', '#b59e55');
            });
            content.style.background = "var(--content-color-dark)";

            banner.style.setProperty('--banner-color', '#b59e55');
            banner.style.setProperty('--border-color', '#9c9c9c');
            highlight.style.setProperty('--highlight-color', '#000');
            message.style.setProperty('--message-color', '#fff');
            themed += 1;
        break;
        case 1:
            // Rose
            navbar.style.background = "var(--nav-color-rose)";
            itemHover.forEach(items => {
                items.style.setProperty('--items-hover', '#e49b9b')
            });
            content.style.background = "var(--content-color-rose)";

            banner.style.setProperty('--banner-color', '#e49b9b');
            banner.style.setProperty('--border-color', '#000');
            highlight.style.setProperty('--highlight-color', '#000');
            message.style.setProperty('--message-color', '#fff');
            themed += 1;
        break;
        case 2:
            // Light
            navbar.style.background = "var(--nav-color-default)";
            itemHover.forEach(items => {
                items.style.setProperty('--items-hover', 'rgba(174, 0, 255, 0.466)')
            });
            content.style.background = "var(--content-color-default)";
            
            banner.style.setProperty('--banner-color', 'rgb(139, 0, 204)');
            banner.style.setProperty('--border-color', '#000');
            highlight.style.setProperty('--highlight-color', '#fff');
            message.style.setProperty('--message-color', '#000');
            themed = 0;
        break;
    }
}
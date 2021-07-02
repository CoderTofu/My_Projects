
// This function is so we can go back to the home page
function goHome() {

    clearInterval(counter);
    clearTimeout(starter);
    clearTimeout(endTimes);
    clearTimeout(checking);

    content.innerHTML = "";
    // Create elements
    const banner = document.createElement("div");
    banner.classList.add("banner");

    const highlight = document.createElement("h1");
    highlight.textContent = "Welcome to my Game Room!";
    highlight.classList.add("highlight");

    const message = document.createElement("h3");
    message.textContent = "You can select a game or look at your game history through the menu on the left or below depending on your screen size.";
    message.classList.add("message");

    banner.appendChild(highlight);
    content.appendChild(banner);
    content.appendChild(message);

    themeFillHome()
}

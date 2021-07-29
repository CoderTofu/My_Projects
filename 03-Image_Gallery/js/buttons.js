// Creates buttons for the window created
function button() {
    let gallery = document.querySelector(".window");
    let allButtons = document.querySelectorAll(".button");
    if (gallery !== null) {
        allButtons.forEach(items => items.remove());
        // X button
        let escape = document.createElement("h5");
        escape.classList.add("button","esc")
        let textEscape = document.createTextNode("x");
        escape.appendChild(textEscape);
        gallery.appendChild(escape);
        escape.addEventListener("click", function(){
            nextState("exit", gallery)
        })

        // Prev Button
        let prev = document.createElement("h5");
        prev.classList.add("button","prev")
        let textPrev = document.createTextNode("<");
        prev.appendChild(textPrev);
        gallery.appendChild(prev);
        prev.addEventListener("click", function(){
            nextState("prev", gallery)
        })

        // Next Button
        let next = document.createElement("h5");
        next.classList.add("button","next")
        let textNext = document.createTextNode(">");
        next.appendChild(textNext);
        gallery.appendChild(next);
        next.addEventListener("click", function(){
            nextState("next", gallery)
        })
        nextState()
    }
}

// Nextstate for our window images.
function nextState(action, item) {
    let chosenImage = document.querySelector(".window img");
    let source = chosenImage.src;
    let raw = source.split("/");
    let reach = raw.length - 1;
    let removeType = raw[reach].split(".");
    let number = parseFloat(removeType[0]);
    
    if (action === "exit"){
        item.remove();
    } else if (action === "prev") {
        let modified = number - 1;
        chosenImage.src = `./images/${modified < 1 ? (items.length) : (modified)}.jpg`;
    } else if (action === "next") {
        let modified = number + 1;
        chosenImage.src = `./images/${modified > items.length ? (1) : (modified)}.jpg`;
    }
    buttonPositions() 
}

function buttonPositions() {
    let galleryImage = document.querySelector(".window img");
    let imageWidth = ((window.innerWidth - galleryImage.width) / 2);
    let prev = document.querySelector(".prev");
    let next = document.querySelector(".next");

    prev.style.left = `${imageWidth - 80}px`;
    next.style.right = `${imageWidth - 80}px`;
}
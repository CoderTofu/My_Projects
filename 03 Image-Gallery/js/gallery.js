// Set variables for all pictures.
let items = document.querySelectorAll(".gallery-item");

// This is what is gonna happen once a picture is clicked.
function view(e) {
    let img = e.path[1];
    let raw = img.innerHTML;
    let source = raw.split(`<img src="./images/`);
    let imgClicked = source[1];
    let coords = imgClicked.split(`.`);
    let number = parseFloat(coords[0]);

    let placeHolder = document.createElement("div");
    placeHolder.classList.add("window")
    let elem = document.createElement(`img`)
    elem.src = `./images/${number}.jpg`;
    placeHolder.appendChild(elem);
    document.body.appendChild(placeHolder);
    // To have the buttons
    button();
    // To exit or remove the window
    out();
}

// Event listener for each images
items.forEach((images) => {
    images.addEventListener("click", view);
});

// This is how we get out or delete the window
function out() {
    let createdWindow = document.querySelector(".window");
    /* Adds the event listender so we can remove the window
        or so we can go to the next image.*/
    if (createdWindow !== null) {
        createdWindow.addEventListener('click', nextState);
        window.onkeydown = checkedKey;
    }
    // Removes window
    function nextState(event) {
        if (event.path[0] === createdWindow){
            createdWindow.remove();
            window.onkeydown = null;
        }
    }
}

// Checks key
function checkedKey(e) {
    e.preventDefault();
    let createdWindow = document.querySelector(".window");

    if (e.keyCode == '37') {
        button();
        nextState("prev", createdWindow);
    }
     else if (e.keyCode == '39') {
        button();
        nextState("next", createdWindow);
    }
     else if (e.keyCode == '27') {
        createdWindow.remove();
    }
}

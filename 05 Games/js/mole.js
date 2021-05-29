const moleContainer = document.createElement("div");

// This is the loading screen once mole
function getMole() {
    // Clear Contents
    content.innerHTML = "";

    moleContainer.classList.add("mole-container");

    const moleBanner = document.createElement("div");
    moleContainer.classList.add("mole-moleBanner");
    moleBanner.innerHTML = `
    <h1>Whack-A-Mole</h1>
    <h3>Please select the desired configurations.</h3>
    `
    moleContainer.appendChild(moleBanner);

    const difficulty = document.createElement("div");
    moleContainer.classList.add("mole-difficulty");
    difficulty.innerHTML = `
        <h2>Select Difficulty:</h2>
        <button onclick='adjustDifficultyMole("easy")'>Easy</button>
        <button onclick='adjustDifficultyMole("medium")'>Medium</button>
        <button onclick='adjustDifficultyMole("hard")'>Hard</button>
    `
    moleContainer.appendChild(difficulty);

    const timeLimit = document.createElement("div");
    timeLimit.classList.add("mole-timeLimit");
    timeLimit.innerHTML = `
    <h2>Select Time:</h2>
    <button onclick="adjustTimeLimitMole(10)">10 seconds</button>
    <button onclick="adjustTimeLimitMole(30)">30 seconds</button>
    <button onclick="adjustTimeLimitMole(60)">60 seconds</button>
    `;
    moleContainer.appendChild(timeLimit)

    const confirm = document.createElement("div");
    confirm.classList.add("mole-confirm");
    confirm.innerHTML = `
    <button onclick="countStartMole()">Confirm</button>
    `;
    moleContainer.appendChild(confirm)
    
    const countdown = document.createElement("div");
    countdown.classList.add("mole-countdown");
    moleContainer.appendChild(countdown)

    content.appendChild(moleContainer)
}

// Default settings if player does not choose
let hardness = "medium";
let time_limit = 30;

// Some functions for difficulty
function adjustDifficultyMole(selected) {
    switch (selected) {
        case "easy":
            hardness = "easy";
        break;
        case "medium":
            hardness = "medium";
        break;
        case "hard":
            hardness = "hard";
        break;
    }
    console.log(hardness)
}

function adjustTimeLimitMole(selected) {
    time_limit = selected;
}

// Timer before the game starts
function countStartMole() {
    let timer = 6;

    let counter = setInterval(()=> {
        document.querySelector(".mole-countdown").textContent = timer-= 1;
    }, 1000);

    setTimeout(() => { 
        clearInterval(counter);
        document.querySelector(".mole-countdown").remove();
        moleGameStart();
    }, 6000);

}

// Once the game actually starts...
function moleGameStart() {
    content.className = "";
    moleContainer.innerHTML = "";

    for (let i = 0; i < 20; i++) {
        const moleHole = document.createElement("div");
        moleHole.classList.add("mole-hole");
        moleContainer.appendChild(moleHole);
    }
    
}

/* To do:
    1. Finish the background of mole
    2. Fix css designs
    3. Refactor theme.js para instead of manually changing every color
       papalitan nalang yung pinaka classname nila

    Note: The reason why adjustments for the themes
    didn't work was because you weren't supposed to use spaces
    in the css stylesheets for just 2 classes. 🤦‍♂️🤦‍♂️
*/


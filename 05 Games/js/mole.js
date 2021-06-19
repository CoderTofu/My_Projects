const moleContainer = document.createElement("div");

// This is the loading screen once mole
function getMole() {

    clearInterval(counter);
    clearTimeout(starter);
    clearTimeout(endTimes);
    clearTimeout(checking);

    // Clear Contents
    content.innerHTML = "";
    moleContainer.innerHTML = "";

    // Set up pre-game look
    moleContainer.classList.add("mole-container");

    const moleBanner = document.createElement("div");
    moleBanner.classList.add("mole-banner");
    moleBanner.innerHTML = `
    <h3>Whack-A-Mole!</h3>
    <h3>Please select your desired configurations.</h3>
    `
    moleContainer.appendChild(moleBanner);

    const difficulty = document.createElement("div");
    difficulty.classList.add("mole-difficulty");
    difficulty.innerHTML = `
        <h2>Select Difficulty:</h2>
        <button onclick='adjustDifficultyMole("easy")' class="mole-button">Easy</button>
        <button onclick='adjustDifficultyMole("medium")' class="mole-button">Medium</button>
        <button onclick='adjustDifficultyMole("hard")'  class="mole-button">Hard</button>
    `
    moleContainer.appendChild(difficulty);

    const timeLimit = document.createElement("div");
    timeLimit.classList.add("mole-timeLimit");
    timeLimit.innerHTML = `
    <h2>Select Time:</h2>
    <button onclick="adjustTimeLimitMole(10000)" class="mole-button">10 seconds</button>
    <button onclick="adjustTimeLimitMole(30000)" class="mole-button">30 seconds</button>
    <button onclick="adjustTimeLimitMole(60000)" class="mole-button">60 seconds</button>
    `;
    moleContainer.appendChild(timeLimit)

    const confirm = document.createElement("div");
    confirm.classList.add("mole-confirm");
    confirm.innerHTML = `
    <button onclick="countStartMole()" class="confirm">Confirm</button>
    `;
    moleContainer.appendChild(confirm)
    
    const countdown = document.createElement("div");
    countdown.classList.add("countdown");
    moleContainer.appendChild(countdown);

    content.appendChild(moleContainer);

    // Theme!
    themeFillMole();
}

// Default settings if player does not choose
let hardness = 400;
let time_limit = 30000;

// Some functions for difficulty
function adjustTimeLimitMole(selected) {
    time_limit = selected;
}

function adjustDifficultyMole(selected) {
    switch (selected) {
        case "easy":
            hardness = 700;
        break;
        case "medium":
            hardness = 400;
        break;
        case "hard":
            hardness = 200;
        break;
    }
}

// Timer before the game starts
function countStartMole() {
    let confirm = document.querySelector(".mole-confirm");
    confirm.remove();

    let cancel = document.createElement("div");
    cancel.innerHTML = `
        <button onclick="cancelMole()" class="cancel">Cancel</button>
    `;
    cancel.classList.add("mole-cancel");
    moleContainer.appendChild(cancel);

    let timer = 6;

    counter = setInterval(()=> {
        document.querySelector(".countdown").textContent = timer-= 1;
    }, 1000);

    starter = setTimeout(() => { 
        clearInterval(counter);
        document.querySelector(".countdown").remove();
        moleGameStart();
    }, 6000);

    themeFillMole()
}

// Cancel timer if the player wants to cancel
function cancelMole() {
    let moleCancel = document.querySelector(".mole-cancel");
    moleCancel.remove();
    document.querySelector(".countdown").textContent = "";

    const confirm = document.createElement("div");
    confirm.classList.add("mole-confirm");
    confirm.innerHTML = `
        <button onclick="countStartMole()" class="confirm">Confirm</button>
    `;
    moleContainer.appendChild(confirm);

    clearInterval(counter);
    clearTimeout(starter);
}

// Once the game actually starts...
function moleGameStart() {
    // Picked settings
    let chosen_difficulty = hardness;
    let chosen_timeLimit = time_limit;

    // Empty all contents
    moleContainer.innerHTML = "";

    // Timer shizz
    const moleHoleContainer = document.createElement("div");
    moleHoleContainer.classList.add("mole-hole-container");

    // The timer while the game is happening
    let seconds = chosen_timeLimit / 1000;
    const moleTimeDiv = document.createElement("div");
    moleTimeDiv.classList.add("mole-time-div");
    moleContainer.appendChild(moleTimeDiv);
    moleTimeDiv.innerHTML = `
    <h2>Time: ${seconds} </h2>
    `;

    // Updates the timer
    let countSeconds = setInterval(() => {
        seconds -= 1;
        moleTimeDiv.innerHTML = `
        <h2>Time: ${seconds} </h2>
        `
    }, 1000);

    // Adding multiple mole hills
    for (let i = 0; i < 20; i++) {
        const moleHole = document.createElement("div");
        moleHole.classList.add("mole-hole");
        moleHole.innerHTML = `
        <img src="./images/mole/mole-head.png">
        `
        moleHoleContainer.appendChild(moleHole);
    }
    moleContainer.appendChild(moleHoleContainer);

    // Random Number Generator
    let generated = []
    const returnRandom = () => {
        const random = Math.floor(Math.random() * 20);
        if (generated.includes(random)) {
            return returnRandom()
        } else {
            generated.push(random)
            if (generated.length === 15) generated = [];
            return random
        }
    }

    // Scoring system
    let score = 0;
    const moleScoreDiv = document.createElement("div");
    moleScoreDiv.classList.add("mole-score-div");
    moleContainer.appendChild(moleScoreDiv);
    moleScoreDiv.innerHTML = `
    <h2>Score: 0 </h2>
    `;

    function scoreSystem() {
        moleScoreDiv.innerHTML = `
        <h2>Score: ${score += 1}</h2>
        `;
    }

    // Moles Popping Function with randoms selected at the generator
    function molePop() {
        let molehills = document.querySelectorAll(".mole-hole img");
        molehills.forEach(items => {
            items.addEventListener("click", () => {
                scoreSystem();
                items.style.display = "none";
            })
        })
        let random;

        // Use async await so we can use the random function better
        let popping = setInterval(async () => {
            random = await returnRandom();
            let randomHill = molehills[random]
            randomHill.style.display = "block";
            randomHill.style.cursor = "pointer";

            popDown(randomHill)
        }, chosen_difficulty);

        // Remove the popped out heads after a certain period
        const popDown = (popped) => {
            setTimeout(()=> {
                popped.style.display = "none";
            }, chosen_difficulty)
        }

        // Stops the game
        endTimes = setTimeout(() => {
            clearInterval(countSeconds);
            endGameMole(score, chosen_difficulty, chosen_timeLimit);
            clearInterval(popping);
        }, chosen_timeLimit)

    }
    molePop();
    themeFillMole();
}


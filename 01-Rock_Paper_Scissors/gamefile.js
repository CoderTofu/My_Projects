let numOfWins = document.querySelector("#win");
let numOfLoss = document.querySelector("#loss");
let numOfDraws = document.querySelector("#draw");

let rock = document.querySelector(".rock");
let paper = document.querySelector(".paper");
let scissors = document.querySelector(".scissors");

let rockClicked = document.querySelector('.rock-times');
let paperClicked = document.querySelector('.paper-times');
let scissorsClicked = document.querySelector('.scissor-times');

function gameStart(avatar) {
    let random = Math.round(Math.random() * Math.floor(2));
    let list = ["rock", "paper", "scissors"];
    let enemy = list[random];

    numberOfUse(avatar)

     if (avatar === enemy) {
        alert(`You both chose the same thing! A ${avatar}!`);
        score("draw");
        return
    }

     if (avatar === "rock") {
        if (enemy === "paper") {
            alert(`You lost to a ${enemy}!`);
            score(`lost`);
        } else {
        alert(`You defeated a ${enemy}!`);
        score("win");
        }
     }

     if (avatar === "paper") {
        if (enemy === "scissors") {
            alert(`You lost to a ${enemy}!`);
            score(`lost`);
        } else {
            alert(`You defeated a ${enemy}!`);
            score("win");
        }
     }

     if (avatar === "scissors") {
        if (enemy === "rock") {
            alert(`You lost to a ${enemy}!`);
            score(`lost`);
        } else {
            alert(`You defeated a ${enemy}!`);
            score("win")
        }
     }
}

//Scoreboard
let wins = 0;
let loss = 0;
let draws = 0;
function score(result) {
    if (result === "lost"){
        loss += 1;
        numOfLoss.innerHTML = `${loss}`;
        return
    } else if (result === "draw") {
        draws += 1;
        numOfDraws.innerHTML = `${draws}`;
        return
    }
    wins += 1;
    numOfWins.innerHTML = `${wins}`;
    return
}

//ClickBoard
let rockBoard = 0;
let paperBoard = 0;
let scissorsBoard = 0;
function numberOfUse(type) {
    if (type === "rock") {
        rockBoard += 1;
        rockClicked.innerHTML = `${rockBoard}`;
    } else if (type === "paper") {
        paperBoard += 1;
        paperClicked.innerHTML = `${paperBoard}`;
    } else if (type === "scissors") {
        scissorsBoard += 1;
        scissorsClicked.innerHTML = `${scissorsBoard}`;
    }
}


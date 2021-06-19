// Created the snake container
let snakeContainer = document.createElement("div");
snakeContainer.classList.add("snake-container");

function getSnake() {

    clearInterval(counter);
    clearTimeout(starter);
    clearTimeout(endTimes);
    clearTimeout(checking);

    content.innerHTML = ``;

    snakeContainer.innerHTML = `

        <div class="snake-banner">
            <h4>Welcome to Snake!</h4>
        </div>
        <div class="snake-message">
            <p>"Eating apples while trying not to die."</p>
        </div>
        <div class="snake-start">
            <button onclick="countdownSnake()" class="confirm">Start!</button>
        </div>

    `;

    content.appendChild(snakeContainer)
    
    themeFillSnake();
}

// Starts the game
function countdownSnake() {
    const snakeStart = document.querySelector(".snake-start");
    snakeStart.remove();

    let cancel = document.createElement("div");
    cancel.innerHTML = `
        <button onclick="cancelSnake()" class="cancel">Cancel</button>
    `;
    cancel.classList.add("snake-cancel");
    snakeContainer.appendChild(cancel);

    let timer = 6
    
    let timeLeft = document.createElement("div");
    timeLeft.classList.add("countdown");
    snakeContainer.appendChild(timeLeft);

    counter = setInterval(()=> {
        timeLeft.innerHTML = `${timer -= 1}`;
    }, 1000)

    starter = setTimeout(() => {
        clearInterval(counter);
        startSnake();
    }, 6000)

    themeFillSnake();
}

function cancelSnake() {
    let snakeCancel = document.querySelector(".snake-cancel");
    snakeCancel.remove();
    document.querySelector(".countdown").textContent = "";

    document.querySelector(".countdown").remove();

    const confirm = document.createElement("div");
    confirm.classList.add("snake-start");
    confirm.innerHTML = `
        <button onclick="countdownSnake()" class="confirm">Start</button>
    `;
    snakeContainer.appendChild(confirm);

    clearInterval(counter);
    clearTimeout(starter);
}

// This starts the game
function startSnake() {
    snakeContainer.innerHTML = "";

    let gridSnake = document.createElement("div");
    snakeContainer.appendChild(gridSnake)
    let position = [312, 311, 310];
    let playerMove = 1;

    let statSnake = document.createElement("div");
    statSnake.classList.add("stat-snake")
    gridSnake.appendChild(statSnake)

    let snakeCage = document.createElement("div");
    snakeCage.classList.add("snake-cage");

    gridSnake.appendChild(snakeCage);

    for(let i = 0; i < 625; i++) {
        let grids = document.createElement("div");
        grids.classList.add("grid");
        snakeCage.appendChild(grids);
    };
    
    // This moves the snake
    let move; 
    let snakeInterval = 200;
    function movement() {
        let boxes = document.querySelectorAll(".grid");

        move = setInterval(() => {
            moveOutcome();
            if (checkImpact(boxes) | checkSelfCollide()) {
                clearInterval(move);
                clearInterval(timer);
                endSnake(snakeScore, time)
            } else {
                position.forEach(num => {
                    boxes[num].innerHTML = "⬛"
                })
                boxes[position[0]].innerHTML = "🙈"
            }
            
        }, snakeInterval);

    }

    // Outcome of moves
    function moveOutcome() {
        let boxes = document.querySelectorAll(".grid");
        position.forEach(num => {
            boxes[num].innerHTML = ""
        })
        position.pop();
        position.unshift(position[0] + playerMove);
    }

    // Checks for impact
    function checkImpact(squares) {
        let leftSide = leftSideCheck(squares);
        let rightSide = rightSideCheck(squares);
        
        if (leftSide.includes(position[0]) && rightSide.includes(position[1])) {
            return true;
        } else if (rightSide.includes(position[0]) && leftSide.includes(position[1])) {
            return true;
        } else if (squares[position[0]] === undefined) {
            return true
        }
    }

    // Array of left side boxes
    function leftSideCheck(received) {
        let array = [];
        for (let i = 0; i < received.length + 1; i += 25) {
            array.push(i)
        }
        return array;
    }
    // Array of right side boxes
    function rightSideCheck(received) {
        let array = [];
        for (let i = 24; i < received.length; i += 25) {
            array.push(i)
        }
        return array;
    }

    // Random Apple
    function randomApple() {
        let array = [];
        let boxes = document.querySelectorAll(".grid");
        let random = Math.floor(Math.random() * boxes.length);

        if (array.includes(random)) {
            random = Math.floor(Math.random() * boxes.length);
            if (array.length > 20) {
                array = [];
            }
        }

        array.push(random);
        checkApple(random)

        boxes[random].innerHTML = "🍎"
    }

    // Checks if you bite yourself
    function checkSelfCollide() {
        for (let i = 1; i < position.length; i++) {
            if (position[0] === position[i]) {
                return true;
            }
        }
    }

    // Checks if you eat the apple
    function checkApple(given) {
        let boxes = document.querySelectorAll(".grid");
        let checking = setInterval(() => {
            if (position[position.length - 1] === given) {
                let newPart = position[(position.length - 1)]
                position.push(newPart += playerMove);
                boxes[position[position.length - 1]].innerHTML = "⬛"
                randomApple()
                scoreSystem(1)
                clearInterval(checking)
            }
        }, snakeInterval)
    }

    // This block is for the time system
    let timer;
    let time = 0;
    let timeDiv = document.createElement("div");
    timeDiv.classList.add("snake-time");
    statSnake.appendChild(timeDiv);
    timeDiv.innerHTML = `
        <p>Time: 0</p>
    `;
    timer = setInterval(() => {
    timeDiv.innerHTML = `
        <p>Time: ${(time += 1) >= 60 ? (`${Math.floor(time / 60)}:${(time % 60) >= 10 ? (``): (`0`)}${time % 60}`): (time)}</p>
    `
    }, 1000);

     // This block is for the snake score system
     let snakeScore = 0;
     let score = document.createElement("div");
         score.classList.add("snake-score");
         score.innerHTML = `
         <p>Score: 0</p>
     `;
     statSnake.appendChild(score); 
     function scoreSystem(points) {
         score.innerHTML = `
         <p>Score: ${snakeScore += points}</p>
         `;
         snakeInterval = (snakeInterval - 2);
     }  

    window.addEventListener("keydown", changeMove)

    function changeMove(e) {
        e.preventDefault();
        let snakeCage = document.querySelector(".snake-cage");
        if (snakeCage !== null) {
            switch (e.key) {
                case 'ArrowRight':
                    playerMove = 1;
                break;
                case 'ArrowLeft':
                    playerMove = -1;
                break;
                case 'ArrowUp':
                    playerMove = -25;
                break;
                case 'ArrowDown':
                    playerMove = 25;
                break;
            }
        }
    }
    // This is the blocks that start the game
    movement();
    scoreSystem(0);
    randomApple();
    checkSelfCollide();
    themeFillSnake();

}


// This js file is for all things intended for the entire site
const content = document.querySelector(".content");
// Important!
let counter; // Interval
let starter; // Timeout
let endTimes; // Timeout
let checking; // Interval

// This function is for the end game state of mole game
function endGameMole(score, difficult, time) {
    const completeTime = completeDate();
    const hourMin = completeHourMin();

    const passTime = `${hourMin} - ${completeTime}`;

    const difficultyString = `${difficult === 700 ? ("Easy") : difficult === 400 ? ("Medium") : ("Hard")}`;
    const adjustTime = `${time / 1000}`;

    content.innerHTML = `
    <div class="endgame">
        <div class="endgame-main">
            <h4>Score: ${score}</h4>
            <h4>${completeTime} at the time of ${hourMin}</h4>
            <h4>Difficulty: ${difficultyString}</h4>
            <h4>Time Limit: ${adjustTime} seconds</h4>
        </div>
        <div class="button-endgame">
            <button onclick="saveHistory('${passTime}', 'Whack-A-Mole', ${score}, '${difficultyString}', ${adjustTime})">Save</button>
            <button onclick="getMole()">Back</button>
        </div>
    </div>
    `;

    themeFillEnd()
}

// This function is for the end game state of mole game
function endSnake(receivedScore, time) {
    const completeTime = completeDate();
    const hourMin = completeHourMin();

    const passTime = `${hourMin} - ${completeTime}`;

    const adjustTime = time >= 60 ? (`${Math.floor(time / 60)}:${(time % 60) >= 10 ? (``): (`0`)}${time % 60}`): (time);

    snakeContainer.innerHTML = "";
    let divSnakeScore = document.createElement("div")
    divSnakeScore.classList.add("snake-score-div");
    divSnakeScore.innerHTML = `
        <div class="endgame">
            <div class="endgame-main">
                <h4>Score: ${receivedScore}</h4>
                <h4>${completeTime} at the time of ${hourMin}</h4>
                <h4>Time: ${adjustTime} ${time >= 60 ? ("minutes"): ("seconds")}</h4>
            </div>
            <div class="button-endgame">
                <button onclick="saveHistory('${passTime}', 'Snake Game', '${receivedScore}', '', ${adjustTime})">Save</button>
                <button onclick="getSnake()">Back</button>
            </div>
        </div>
    `;
    snakeContainer.appendChild(divSnakeScore);
    themeFillEnd()
}

// Finishing Tic Tac Toe game
function ticFinishSession(scoreOne, scoreTwo, draws, type) {
    const completeTime = completeDate();
    const hourMin = completeHourMin();

    const passTime = `${hourMin} - ${completeTime}`;
    
    ticContainer.innerHTML = "";
    let divTicScore = document.createElement("div")
    divTicScore.classList.add("tic-score-div");
    let scoresArray = [scoreOne, scoreTwo, draws]
    divTicScore.innerHTML = `
        <div class="endgame">
            <div class="endgame-main">
                <h4>Rounds: ${scoreOne + scoreTwo + draws}</h4>
                <h4>${completeTime} at the time of ${hourMin}</h4>
                <h4>Player One scored ${scoreOne} times.</h4>
                <h4>Player Two scored ${scoreTwo} times.</h4>
                <h4>You had a draw ${draws} times.</h4>
                <h4>You played the ${type === 9 ? ("3x3"): ("5x5")} type.</h4>
            </div>
            <div class="button-endgame">
                <button onclick="saveHistory('${passTime}', 'Tic-tac-toe Game', '${scoresArray}', '${type === 9 ? ("3x3"): ("5x5")}', '')">Save</button>
                <button onclick="getTicTacToe">Back</button>
            </div>
        </div>
    `;
    ticContainer.appendChild(divTicScore);
    themeFillEnd()
}


// This is how we save game
function saveHistory(date, game, score, difficulty, timeLimit) {
    switch (game) {
        case 'Whack-A-Mole':
            let moleHistory = localStorage.getItem("moleHistory");

            let dataMole = {
                "date": date,
                "game": game,
                "score": score,
                "difficulty": difficulty,
                "time_limit": timeLimit, 
            }
            getMole()
            if (moleHistory !== null) {
                let parseMole = JSON.parse(moleHistory);
                parseMole.push(dataMole);
                return localStorage.setItem("moleHistory", JSON.stringify(parseMole))
            } else {
                return localStorage.setItem("moleHistory", JSON.stringify([dataMole]))
            }
        break;

        case "Snake Game":
            let snakeHistory = localStorage.getItem("snakeHistory");

            let dataSnake = {
                "date": date,
                "game": game,
                "score": score,
                "time_played": timeLimit, 
            }
            getSnake()
                if (snakeHistory !== null) {
                    let parseSnake = JSON.parse(snakeHistory);
                    parseSnake.push(dataSnake);
                    localStorage.setItem("snakeHistory", JSON.stringify(parseSnake))
                } else {
                    localStorage.setItem("snakeHistory", JSON.stringify([dataSnake]))
                }
            if (snakeHistory !== null) {
                let parseSnake = JSON.parse(snakeHistory);
                parseSnake.push(dataSnake);
                return localStorage.setItem("snakeHistory", JSON.stringify(parseSnake))
            } else {
                return localStorage.setItem("snakeHistory", JSON.stringify([dataSnake]))
            }
        break;

        case "Tic-tac-toe Game":
            let ticHistory = localStorage.getItem("ticHistory");
            let board = score.split(",");
            let finalTally = [];
            for (let i = 0; i < board.length; i++) {
                let number = parseInt(board[i]);
                finalTally.push(number);
            }
            
            let dataTic = {
                "date": date,
                "game": game,
                "rounds": finalTally[0] + finalTally[1] + finalTally[2],
                "player 1": finalTally[0],
                "player 2": finalTally[1],
                "draws": finalTally[2],
                "type": difficulty,
            }

            getTicTacToe()
            if (ticHistory !== null) {
                let parseTic = JSON.parse(ticHistory);
                parseTic.push(dataTic);
                return localStorage.setItem("ticHistory", JSON.stringify(parseTic))
            } else {
                return localStorage.setItem("ticHistory", JSON.stringify([dataTic]))
            }
        break;
    }
}

// Formatting date and time
function completeDate() {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    const completeTime = `${month < 10 ? (`0${month}`): (month)}/${day < 10 ? (`0${day}`): (day)}/${year}`;
    return completeTime
}

function completeHourMin() {
    const date = new Date();
    const hour = date.getHours();
    const min = date.getMinutes();

    const hourMin = `${hour > 12 ? (hour - 12) : (hour < 10 ? (`0${hour}`) : (hour))}:${min < 10 ? (`0${min}`) : (min)}${hour >= 12 ? (`pm`) : (`am`)}`;
    return hourMin
}
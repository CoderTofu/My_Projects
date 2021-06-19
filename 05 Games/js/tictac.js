const ticContainer = document.createElement("div");
ticContainer.classList.add("tikTakToe-container");


function getTicTacToe() {
    clearInterval(counter);
    clearTimeout(starter);
    clearTimeout(endTimes);
    clearTimeout(checking);

    content.innerHTML = "";

    content.appendChild(ticContainer);
    ticContainer.innerHTML = `
    <div class="start-tic">
        <div class="banner-tic">
            <h3>Welcome to The <br>Tic-Tac-Toe Game!</h3>
        </div>
        <div class="message-tic">
            <h4>Playing with a friend perhaps?</h4>
        </div>
        <div class="type-tic">
            <button onclick="selectTicType('3x3')">
                3x3
            </button>
            <button onclick="selectTicType('5x5')">
                5x5
            </button>
        </div>
        <div class="tic-start">
            <div class="tic-confirm">
                <button class="confirm" onclick="countdownTic()">Confirm</button>
            </div>
            <div class="countdown">
            </div>
        </div>
    </div>
    `

    themeFillTicTacToe();
}

async function countdownTic() {
    const confirm = document.querySelector(".tic-confirm");
    confirm.remove();
    const ticStart = document.querySelector(".tic-start")

    let cancel = document.createElement("div");
    cancel.innerHTML = `
        <button onclick="cancelTic()" class="cancel">Cancel</button>
    `;
    cancel.classList.add("tic-cancel");
    ticStart.appendChild(cancel);

    let timer = 6
    
    let timeLeft = document.querySelector(".countdown");

    themeFillTicTacToe();

    counter = setInterval(()=> {
        timeLeft.textContent = `${timer -= 1}`;
    }, 1000)

    starter = setTimeout(() => {
        clearInterval(counter);
        startTic();
    }, 6000);

    themeFillTicTacToe();
}

function cancelTic() {
    const cancel = document.querySelector(".tic-cancel");
    cancel.remove();
    const ticStart = document.querySelector(".tic-start");
    document.querySelector(".countdown").textContent = "";

    let confirm = document.createElement("div");
    confirm.innerHTML = `
        <button onclick="countdownTic()" class="confirm">Confirm</button>
    `;
    confirm.classList.add("tic-confirm");
    ticStart.appendChild(confirm);

    clearInterval(counter);
    clearTimeout(starter);
}

const ticArea = document.createElement("div");
let boardType = 3 * 3;
ticArea.className = "tic-area three";
function selectTicType(type) {
    switch (type) {
        case "3x3":
            boardType = 3 * 3;
            ticArea.className = "tic-area three";
        break;
        case "5x5":
            boardType = 5 * 5;
            ticArea.className = "tic-area five";
        break;
    }
}

function startTic() {
    ticContainer.innerHTML = "";
    ticArea.innerHTML = "";
    for (let i = 0; i < boardType; i++) {
        let boxes = document.createElement("div");
        ticArea.appendChild(boxes);
        boxes.classList.add("tictactoe-boxes")
    }

    let ticScore = document.createElement("div");
    ticScore.classList.add("tic-scores")
    ticScore.innerHTML = `
    <h6>Player 1: 0</h6>
    <h6>Player 2: 0</h6>
    <h6>Draw: 0</h6>
    `;

    ticContainer.appendChild(ticScore);
    ticContainer.appendChild(ticArea);

    let allBoxes = document.querySelectorAll(".tictactoe-boxes");
    allBoxes.forEach(box => {
        box.addEventListener("click", clickedToe)
    })

    let gameButtons = document.createElement("div");
    gameButtons.classList.add("tic-game-button");
    ticContainer.appendChild(gameButtons)

    let ticReset = document.createElement("button");
    ticReset.classList.add("tic-reset")
    ticReset.addEventListener("click", ticResetGame)
    ticReset.innerHTML = "Reset Game!";
    gameButtons.appendChild(ticReset);

    function ticResetGame() {
        let allBoxes = document.querySelectorAll(".tictactoe-boxes");
        allBoxes.forEach(box => {
            box.innerHTML = "";
            box.addEventListener("click", clickedToe);
        })
    }

    let turn = 1;

    function clickedToe() {
        let sentBox = this;
        let playerTurn = turn;
        if (boardType === 3*3 ) {
            switch (playerTurn) {
            case 1:
                sentBox.innerHTML = sentBox.innerHTML = "∞";
                turn = 2;
            break;
            case 2:
                sentBox.innerHTML = "⋿";
                turn = 1;
            break;
            }
        } else if (boardType === 5*5) {
            switch (playerTurn) {
                case 1:
                    sentBox.innerHTML = "O";
                    turn = 2
                break;
                case 2:
                    sentBox.innerHTML = "X";
                    turn = 1
                break;
                }
        }
        this.removeEventListener("click", clickedToe);
        checkPattern()
    }

    let playerOne = 0;
    let playerTwo = 0;
    let draw = 0;
    function playerScores(player) {
        if (player === 1) {
            playerOne += 1
        } 
        if (player === 2) {
            playerTwo += 1;
        } 
        if (player === 0) {
            draw += 1
        }
        ticScore.innerHTML = `
        <h6>Player 1: ${playerOne}</h6>
        <h6>Player 2: ${playerTwo}</h6>
        <h6>Draw: ${draw}</h6>
        `;
        checkRounds()
    }
    function checkRounds() {
        let totals = (playerOne + playerTwo + draw);
        if (totals === 3) {
            let ticSession = document.createElement("button");
            ticSession.classList.add("tic-session")
            ticSession.addEventListener("click", () => {
                ticFinishSession(playerOne, playerTwo, draw, boardType)
            })
            ticSession.innerHTML = "Finish Session";
            gameButtons.appendChild(ticSession);
            themeFillTicTacToe()
        }
    }

    function checkPattern() {
        let allBoxes = document.querySelectorAll(".tictactoe-boxes");
        let drawArray = [];
        switch (boardType) {
            case 3 * 3:

                // 1st row
                if (allBoxes[0].innerHTML === "∞" && allBoxes[1].innerHTML === "∞"
                    && allBoxes[2].innerHTML === "∞") {
                        allBoxes.forEach(box => {
                            box.removeEventListener("click", clickedToe)
                        })
                    return playerScores(1)
                } else if (allBoxes[0].innerHTML === "⋿" && allBoxes[1].innerHTML === "⋿"
                    && allBoxes[2].innerHTML === "⋿") {
                    allBoxes.forEach(box => {
                        box.removeEventListener("click", clickedToe)
                    })
                    return playerScores(2)
                }

                // 2nd row
                else if (allBoxes[3].innerHTML === "∞" && allBoxes[4].innerHTML === "∞"
                    && allBoxes[5].innerHTML === "∞") {
                        allBoxes.forEach(box => {
                            box.removeEventListener("click", clickedToe)
                        })
                    return playerScores(1)
                } else if (allBoxes[3].innerHTML === "⋿" && allBoxes[4].innerHTML === "⋿"
                    && allBoxes[5].innerHTML === "⋿") {
                    allBoxes.forEach(box => {
                        box.removeEventListener("click", clickedToe)
                    })
                    return playerScores(2)
                }

                // 3rd row
                else if (allBoxes[6].innerHTML === "∞" && allBoxes[7].innerHTML === "∞"
                    && allBoxes[8].innerHTML === "∞") {
                        allBoxes.forEach(box => {
                            box.removeEventListener("click", clickedToe)
                        })
                    return playerScores(1)
                } else if (allBoxes[6].innerHTML === "⋿" && allBoxes[7].innerHTML === "⋿"
                    && allBoxes[8].innerHTML === "⋿") {
                    allBoxes.forEach(box => {
                        box.removeEventListener("click", clickedToe)
                    })
                    return playerScores(2)
                }

                // Upper left corner to lower right corner 
                else if (allBoxes[0].innerHTML === "∞" && allBoxes[4].innerHTML === "∞"
                    && allBoxes[8].innerHTML === "∞") {
                        allBoxes.forEach(box => {
                            box.removeEventListener("click", clickedToe)
                        })
                   return  playerScores(1)
                } else if (allBoxes[0].innerHTML === "⋿" && allBoxes[4].innerHTML === "⋿"
                    && allBoxes[8].innerHTML === "⋿") {
                    allBoxes.forEach(box => {
                        box.removeEventListener("click", clickedToe)
                    })
                    return playerScores(2)
                }

                // Upper right corner to lower left corner
                else if (allBoxes[2].innerHTML === "∞" && allBoxes[4].innerHTML === "∞"
                    && allBoxes[6].innerHTML === "∞") {
                        allBoxes.forEach(box => {
                            box.removeEventListener("click", clickedToe)
                        })
                    return playerScores(1)
                } else if (allBoxes[2].innerHTML === "⋿" && allBoxes[4].innerHTML === "⋿"
                    && allBoxes[6].innerHTML === "⋿") {
                    allBoxes.forEach(box => {
                        box.removeEventListener("click", clickedToe)
                    })
                    return playerScores(2)
                }

                // 1st column
                else if (allBoxes[0].innerHTML === "∞" && allBoxes[3].innerHTML === "∞"
                    && allBoxes[6].innerHTML === "∞") {
                        allBoxes.forEach(box => {
                            box.removeEventListener("click", clickedToe)
                        })
                   return  playerScores(1)
                } else if (allBoxes[0].innerHTML === "⋿" && allBoxes[3].innerHTML === "⋿"
                    && allBoxes[6].innerHTML === "⋿") {
                    allBoxes.forEach(box => {
                        box.removeEventListener("click", clickedToe)
                    })
                    return playerScores(2)
                }

                // 2nd column
                if (allBoxes[1].innerHTML === "∞" && allBoxes[4].innerHTML === "∞"
                    && allBoxes[7].innerHTML === "∞") {
                        allBoxes.forEach(box => {
                            box.removeEventListener("click", clickedToe)
                        })
                   return  playerScores(1)
                } else if (allBoxes[1].innerHTML === "⋿" && allBoxes[4].innerHTML === "⋿"
                    && allBoxes[7].innerHTML === "⋿") {
                    allBoxes.forEach(box => {
                        box.removeEventListener("click", clickedToe)
                    })
                    return playerScores(2)
                }

                // 3rd column
                else if (allBoxes[2].innerHTML === "∞" && allBoxes[5].innerHTML === "∞"
                    && allBoxes[8].innerHTML === "∞") {
                        allBoxes.forEach(box => {
                            box.removeEventListener("click", clickedToe)
                        })
                   return  playerScores(2)
                } else if (allBoxes[2].innerHTML === "⋿" && allBoxes[5].innerHTML === "⋿"
                    && allBoxes[8].innerHTML === "⋿") {
                    allBoxes.forEach(box => {
                        box.removeEventListener("click", clickedToe)
                    })
                    return playerScores(2)
                }

                // For draws
                for (let i of allBoxes) {
                    if (i.innerHTML) {
                        drawArray.push(true);
                    }
                }
                if (drawArray.length === allBoxes.length) {
                    return playerScores(0)
                }

            break;

            case 5 * 5:

                // 1st row
                if (allBoxes[0].innerHTML === "O" && allBoxes[1].innerHTML === "O"
                && allBoxes[2].innerHTML === "O" && allBoxes[3].innerHTML === "O" && 
                allBoxes[4].innerHTML === "O") {
                    allBoxes.forEach(box => {
                    box.removeEventListener("click", clickedToe)
                    })
                    return playerScores(1)
                } else if (allBoxes[0].innerHTML === "X" && allBoxes[1].innerHTML === "X"
                && allBoxes[2].innerHTML === "X" && allBoxes[3].innerHTML === "X" && 
                allBoxes[4].innerHTML === "X") {
                    allBoxes.forEach(box => {
                    box.removeEventListener("click", clickedToe)
                    })
                return playerScores(2)
                }

                // 2nd Row
                else if (allBoxes[5].innerHTML === "O" && allBoxes[6].innerHTML === "O"
                && allBoxes[7].innerHTML === "O" && allBoxes[8].innerHTML === "O" && 
                allBoxes[9].innerHTML === "O") {
                    allBoxes.forEach(box => {
                    box.removeEventListener("click", clickedToe)
                    })
                    return playerScores(1)
                } else if (allBoxes[5].innerHTML === "X" && allBoxes[6].innerHTML === "X"
                && allBoxes[7].innerHTML === "X" && allBoxes[8].innerHTML === "X" && 
                allBoxes[9].innerHTML === "X") {
                    allBoxes.forEach(box => {
                    box.removeEventListener("click", clickedToe)
                    })
                return playerScores(2)
                }

                // 3rd Row
                else if (allBoxes[10].innerHTML === "O" && allBoxes[11].innerHTML === "O"
                && allBoxes[12].innerHTML === "O" && allBoxes[13].innerHTML === "O" && 
                allBoxes[14].innerHTML === "O") {
                    allBoxes.forEach(box => {
                    box.removeEventListener("click", clickedToe)
                    })
                    return playerScores(1)
                } else if (allBoxes[10].innerHTML === "X" && allBoxes[11].innerHTML === "X"
                && allBoxes[12].innerHTML === "X" && allBoxes[13].innerHTML === "X" && 
                allBoxes[14].innerHTML === "X") {
                    allBoxes.forEach(box => {
                    box.removeEventListener("click", clickedToe)
                    })
                return playerScores(2)
                }

                // 4th Row
                else if (allBoxes[15].innerHTML === "O" && allBoxes[16].innerHTML === "O"
                && allBoxes[17].innerHTML === "O" && allBoxes[18].innerHTML === "O" && 
                allBoxes[19].innerHTML === "O") {
                    allBoxes.forEach(box => {
                    box.removeEventListener("click", clickedToe)
                    })
                    return playerScores(1)
                } else if (allBoxes[15].innerHTML === "X" && allBoxes[16].innerHTML === "X"
                && allBoxes[17].innerHTML === "X" && allBoxes[18].innerHTML === "X" && 
                allBoxes[19].innerHTML === "X") {
                    allBoxes.forEach(box => {
                    box.removeEventListener("click", clickedToe)
                    })
                return playerScores(2)
                }

                // 5th Row
                else if (allBoxes[20].innerHTML === "O" && allBoxes[21].innerHTML === "O"
                && allBoxes[22].innerHTML === "O" && allBoxes[23].innerHTML === "O" && 
                allBoxes[24].innerHTML === "O") {
                    allBoxes.forEach(box => {
                    box.removeEventListener("click", clickedToe)
                    })
                    return playerScores(1)
                } else if (allBoxes[20].innerHTML === "X" && allBoxes[21].innerHTML === "X"
                && allBoxes[22].innerHTML === "X" && allBoxes[23].innerHTML === "X" && 
                allBoxes[24].innerHTML === "X") {
                    allBoxes.forEach(box => {
                    box.removeEventListener("click", clickedToe)
                    })
                return playerScores(2)
                }

                // 1st Column
                else if (allBoxes[0].innerHTML === "O" && allBoxes[5].innerHTML === "O"
                && allBoxes[10].innerHTML === "O" && allBoxes[15].innerHTML === "O" && 
                allBoxes[20].innerHTML === "O") {
                    allBoxes.forEach(box => {
                    box.removeEventListener("click", clickedToe)
                    })
                    return playerScores(1)
                } else if (allBoxes[0].innerHTML === "X" && allBoxes[5].innerHTML === "X"
                && allBoxes[10].innerHTML === "X" && allBoxes[15].innerHTML === "X" && 
                allBoxes[20].innerHTML === "X") {
                    allBoxes.forEach(box => {
                    box.removeEventListener("click", clickedToe)
                    })
                return playerScores(2)
                }

                // 2nd Column
                else if (allBoxes[1].innerHTML === "O" && allBoxes[6].innerHTML === "O"
                && allBoxes[11].innerHTML === "O" && allBoxes[16].innerHTML === "O" && 
                allBoxes[21].innerHTML === "O") {
                    allBoxes.forEach(box => {
                    box.removeEventListener("click", clickedToe)
                    })
                    return playerScores(1)
                } else if (allBoxes[1].innerHTML === "X" && allBoxes[6].innerHTML === "X"
                && allBoxes[11].innerHTML === "X" && allBoxes[16].innerHTML === "X" && 
                allBoxes[21].innerHTML === "X") {
                    allBoxes.forEach(box => {
                    box.removeEventListener("click", clickedToe)
                    })
                return playerScores(2)
                }

                // 3rd Column
                else if (allBoxes[2].innerHTML === "O" && allBoxes[7].innerHTML === "O"
                && allBoxes[12].innerHTML === "O" && allBoxes[17].innerHTML === "O" && 
                allBoxes[22].innerHTML === "O") {
                    allBoxes.forEach(box => {
                    box.removeEventListener("click", clickedToe)
                    })
                    return playerScores(1)
                } else if (allBoxes[2].innerHTML === "X" && allBoxes[7].innerHTML === "X"
                && allBoxes[12].innerHTML === "X" && allBoxes[17].innerHTML === "X" && 
                allBoxes[22].innerHTML === "X") {
                    allBoxes.forEach(box => {
                    box.removeEventListener("click", clickedToe)
                    })
                return playerScores(2)
                }

                // 4th Column
                else if (allBoxes[3].innerHTML === "O" && allBoxes[8].innerHTML === "O"
                && allBoxes[13].innerHTML === "O" && allBoxes[18].innerHTML === "O" && 
                allBoxes[23].innerHTML === "O") {
                    allBoxes.forEach(box => {
                    box.removeEventListener("click", clickedToe)
                    })
                    return playerScores(1)
                } else if (allBoxes[3].innerHTML === "X" && allBoxes[8].innerHTML === "X"
                && allBoxes[13].innerHTML === "X" && allBoxes[18].innerHTML === "X" && 
                allBoxes[23].innerHTML === "X") {
                    allBoxes.forEach(box => {
                    box.removeEventListener("click", clickedToe)
                    })
                return playerScores(2)
                }

                // 5th Column
                else if (allBoxes[4].innerHTML === "O" && allBoxes[9].innerHTML === "O"
                && allBoxes[14].innerHTML === "O" && allBoxes[19].innerHTML === "O" && 
                allBoxes[24].innerHTML === "O") {
                    allBoxes.forEach(box => {
                    box.removeEventListener("click", clickedToe)
                    })
                    return playerScores(1)
                } else if (allBoxes[4].innerHTML === "X" && allBoxes[9].innerHTML === "X"
                && allBoxes[14].innerHTML === "X" && allBoxes[19].innerHTML === "X" && 
                allBoxes[24].innerHTML === "X") {
                    allBoxes.forEach(box => {
                    box.removeEventListener("click", clickedToe)
                    })
                return playerScores(2)
                }

                // Upper right corner across Lower left corner
                else if (allBoxes[0].innerHTML === "O" && allBoxes[6].innerHTML === "O"
                && allBoxes[12].innerHTML === "O" && allBoxes[18].innerHTML === "O" && 
                allBoxes[24].innerHTML === "O") {
                    allBoxes.forEach(box => {
                    box.removeEventListener("click", clickedToe)
                    })
                    return playerScores(1)
                } else if (allBoxes[0].innerHTML === "X" && allBoxes[6].innerHTML === "X"
                && allBoxes[12].innerHTML === "X" && allBoxes[18].innerHTML === "X" && 
                allBoxes[24].innerHTML === "X") {
                    allBoxes.forEach(box => {
                    box.removeEventListener("click", clickedToe)
                    })
                return playerScores(2)
                }

                // Upper left corner across Lower right corner
                else if (allBoxes[4].innerHTML === "O" && allBoxes[8].innerHTML === "O"
                && allBoxes[12].innerHTML === "O" && allBoxes[16].innerHTML === "O" && 
                allBoxes[20].innerHTML === "O") {
                    allBoxes.forEach(box => {
                    box.removeEventListener("click", clickedToe)
                    })
                    return playerScores(1)
                } else if (allBoxes[4].innerHTML === "X" && allBoxes[8].innerHTML === "X"
                && allBoxes[12].innerHTML === "X" && allBoxes[16].innerHTML === "X" && 
                allBoxes[20].innerHTML === "X") {
                    allBoxes.forEach(box => {
                    box.removeEventListener("click", clickedToe)
                    })
                return playerScores(2)
                }

                // For draws
                for (let i of allBoxes) {
                    if (i.innerHTML) {
                        drawArray.push(true);
                    }
                }

                if (drawArray.length === allBoxes.length) {
                    return playerScores(0)
                }

            break;
        }
    }
    themeFillTicTacToe()
}
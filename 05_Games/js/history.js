
// We use local storage to store our data
function seeHistory() {
    content.innerHTML = '';
    
    const historyContent = document.createElement("div");
    historyContent.classList.add("history-content");
    content.appendChild(historyContent);

    const historyBanner = document.createElement("div");
    historyBanner.classList.add("history-banner");
    historyBanner.innerHTML = `
    <h6>History Channel</h6>
    `
    historyContent.appendChild(historyBanner);

    const historyMenu = document.createElement("div");
    historyMenu.classList.add("history-menu");
    // historyMenu.innerHTML = `
    // <div class="icons mole-historyIcon">
    //     <img src="../../05_Games/images/nav-icons/mole.png" alt="">
    // </div>
    // <div class="icons snake-historyIcon">
    //     <img src="../05_Games/images/nav-icons/snake.png" alt="">
    // </div>
    // <div class="icons cross-historyIcon">
    //     <img src="../../05_Games/images/nav-icons/cross.png" alt="">
    // </div>
    // `;

    // Use this if you want to open it on its own folder

    historyMenu.innerHTML = `
    <div class="icons mole-historyIcon">
        <img src="../05_Games/images/nav-icons/mole.png">
    </div>
    <div class="icons snake-historyIcon">
        <img src="../05_Games/images/nav-icons/snake.png">
    </div>
    <div class="icons cross-historyIcon">
        <img src="../05_Games/images/nav-icons/cross.png">
    </div>
    `;
    historyContent.appendChild(historyMenu);

    const histories = document.createElement("div");
    histories.classList.add("histories");
    historyContent.appendChild(histories);

    document.querySelector(".mole-historyIcon").addEventListener("click", () => {clickHistory('mole')})
    document.querySelector(".snake-historyIcon").addEventListener("click", () => {clickHistory('snake')})
    document.querySelector(".cross-historyIcon").addEventListener("click", () => {clickHistory('cross')})

    themeFillHistory();
}

function clickHistory(pick) {
    const historyContent = document.querySelector(".history-content");
    historyContent.innerHTML = ``;
    const tableOfContent = document.createElement("div");
    tableOfContent.classList.add("history-table");
    const backToMenu = document.createElement("div");
    backToMenu.classList.add("back-to-menu");
    backToMenu.innerHTML = `
        <h4>></h4>
    `;

    backToMenu.addEventListener("click", () => {
        seeHistory();
    })

    const historyTitle = document.createElement("div");
    historyTitle.classList.add("history-banner", "top-history");
    historyContent.appendChild(backToMenu);

    let createdRow = document.createElement("tr");
    switch (pick) {
        case "mole":
            let moleHistory = localStorage.getItem("moleHistory");
            let parseMoleHistory = JSON.parse(moleHistory);
            createdRow.innerHTML = `
                <th>Date</th>
                <th>Score</th>
                <th>Difficulty</th>
                <th>Time Limit</th>
                <th>Edit</th>
            `
            historyTitle.innerHTML = `
                <h6>Whack-A-Mole</h6>
            `;
            tableOfContent.appendChild(createdRow);
            if (parseMoleHistory === null || parseMoleHistory.length === 0) {
                tableOfContent.innerHTML = `
                <div class="no-history"><h2>You have no saves.</h2></div>
                `
            } else if (parseMoleHistory !== null || parseMoleHistory.length > 0) {
                for (let i = 0; i < parseMoleHistory.length; i++) {
                    let content = document.createElement("tr");
                    content.innerHTML = `
                    <td>${parseMoleHistory[i]["date"]}</td>
                    <td>${parseMoleHistory[i]["score"]}</td>
                    <td>${parseMoleHistory[i]["difficulty"]}</td>
                    <td>${parseMoleHistory[i]["time_limit"]}</td>
                    <td><button onclick="deleteSave(${i}, 0)">Delete</button></td>
                    `;
                    tableOfContent.appendChild(content);
                }
            }
        break;
        case "snake":
            let snakeHistory = localStorage.getItem("snakeHistory");
            let parseSnakeHistory = JSON.parse(snakeHistory);
            createdRow.innerHTML = `
                <th>Date</th>
                <th>Score</th>
                <th>Time Played</th>
                <th>Edit</th>
            `
            historyTitle.innerHTML = `
                <h6>Snake</h6>
            `;
            tableOfContent.appendChild(createdRow);
            if (parseSnakeHistory === null || parseSnakeHistory.length === 0) {
                tableOfContent.innerHTML = `
                    <div class="no-history"><h2>You have no saves.</h2></div>
                `
            } else if (parseSnakeHistory !== null || parseSnakeHistory.length > 0) {
                for (let i = 0; i < parseSnakeHistory.length; i++) {
                    let content = document.createElement("tr");
                    content.innerHTML = `
                    <td>${parseSnakeHistory[i]["date"]}</td>
                    <td>${parseSnakeHistory[i]["score"]}</td>
                    <td>${parseSnakeHistory[i]["time_played"]}</td>
                    <td><button onclick="deleteSave(${i}, 1)">Delete</button></td>
                    `;
                    tableOfContent.appendChild(content);
                }
            }
        break;
        case "cross":
            let ticHistory = localStorage.getItem("ticHistory");
            let parseTicHistory = JSON.parse(ticHistory);
            createdRow.innerHTML = `
                <th>Date</th>
                <th>Type</th>
                <th>Rounds</th>
                <th>Draws</th>
                <th>Player 1</th>
                <th>Player 2</th>
                <th>Edit</th>
            `
            historyTitle.innerHTML = `
                <h6>Tic-Tac-Toe</h6>
            `;
            tableOfContent.appendChild(createdRow);
            if (parseTicHistory === null || parseTicHistory.length === 0) {
                tableOfContent.innerHTML = `
                    <div class="no-history"><h2>You have no saves.</h2></div>
                `
            } else if (parseTicHistory !== null || parseTicHistory.length > 0) {
                for (let i = 0; i < parseTicHistory.length; i++) {
                    let content = document.createElement("tr");
                    content.innerHTML = `
                    <td>${parseTicHistory[i]["date"]}</td>
                    <td>${parseTicHistory[i]["type"]}</td>
                    <td>${parseTicHistory[i]["rounds"]}</td>
                    <td>${parseTicHistory[i]["draws"]}</td>
                    <td>${parseTicHistory[i]["player 1"]}</td>
                    <td>${parseTicHistory[i]["player 2"]}</td>
                    <td><button onclick="deleteSave(${i}, 2)">Delete</button></td>
                    `;
                    tableOfContent.appendChild(content);
                }
            }
        break;
    }
    historyContent.appendChild(historyTitle);
    historyContent.appendChild(tableOfContent);
    themeFillHistory();
}

function deleteSave(num, db) {
    let data;
    let dataName;
    let parsedData;
    let pass;
    switch (db) {
        case 0:
            dataName = "moleHistory";
            data = localStorage.getItem("moleHistory");
            parsedData = JSON.parse(data);
            pass = "mole";
        break;
        case 1:
            dataName = "snakeHistory";
            data = localStorage.getItem("snakeHistory");
            parsedData = JSON.parse(data);
            pass = "snake";
        break;
        case 2:
            dataName = "ticHistory";
            data = localStorage.getItem("ticHistory");
            parsedData = JSON.parse(data);
            pass = "cross";
        break;
    }
    parsedData.splice(num, 1);
    localStorage.setItem(dataName, JSON.stringify(parsedData));
    clickHistory(pass)
}

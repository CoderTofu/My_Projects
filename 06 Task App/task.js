    const input = document.getElementById("form-input");

    const table = document.querySelector(".task-table");
    let task = document.getElementById("task");
    let date = document.getElementById("date");

    let editInput;

    const submitFunc = () => {
        let db = localStorage.getItem("tasks-at-hand");
        let dbParsed = JSON.parse(db);

        let data = {
            "checked": false,
            "task": task.value,
            "date": date.value,
        }

        if (dbParsed === null || dbParsed.length === 0) {
            let dataString = JSON.stringify([data]);

            localStorage.setItem("tasks-at-hand", dataString)
        } else {
            dbParsed.push(data);
            let dataString = JSON.stringify(dbParsed);
            localStorage.setItem("tasks-at-hand", dataString)
        }

        task.value = ``;
        date.value = ``;

        updateTable();
    }

    const updateTable = (newData) => {
        let db = localStorage.getItem("tasks-at-hand");
        let dbParsed = JSON.parse(db);
        table.innerHTML = `
            <tr>
                <th>Complete</th>
                <th>Task</th>
                <th>Date/Time</th>
                <th>Edit</th>
            </tr>
        `;

        for (let i = 0; i < dbParsed.length; i++) {
            const createRow = document.createElement("tr");
            createRow.classList.add("work")
            createRow.innerHTML = `
            <td><input type="checkbox" id="check${i}" onclick="completed(${i})"></td>
            <td>${dbParsed[i]["task"]}</td>
            <td>${dbParsed[i]["date"]}</td>
            <td><button onclick="deleteTask(${i})">Delete</button><button class="edit edit-button" onclick="editTask(${i})">Edit</button></td>
            `;

            table.appendChild(createRow);

            if (dbParsed[i]["checked"]) {
                document.getElementById(`check${i}`).checked = true; 
            } else if (!dbParsed[i]["checked"]) {
                document.getElementById(`check${i}`).checked = false; 
            }

        }
    }

    const completed = (num) => {
        let db = localStorage.getItem("tasks-at-hand");
        let dbParsed = JSON.parse(db);

        dbParsed[num]["checked"] === false ? (dbParsed[num]["checked"] = true) : (dbParsed[num]["checked"] = false);

        let stringedData = JSON.stringify(dbParsed);
        localStorage.setItem("tasks-at-hand", stringedData);

        updateTable()
    }
    
    const deleteTask = (num) => {
        let db = localStorage.getItem("tasks-at-hand");
        let dbParsed = JSON.parse(db);

        dbParsed.splice(num, 1);
        let stringedData = JSON.stringify(dbParsed);
        localStorage.setItem("tasks-at-hand", stringedData);
        updateTable()
    }

    const editTask = (num) => {
        let db = localStorage.getItem("tasks-at-hand");
        let dbParsed = JSON.parse(db);

        let edit = document.querySelectorAll(".edit");
        edit.forEach(btn => {
            btn.disabled = true;
        })

        let row = document.querySelectorAll(".work");
        row[num].innerHTML = `
            <td><input type="checkbox" id="check${num}" onclick="completed(${num})"></td>
            <td><input type="text" id="task${num}" placeholder="${dbParsed[num]["task"]}"></td>
            <td><input type="text" id="date${num}" placeholder="${dbParsed[num]["date"]}"></td>
            <td><button onclick="deleteTask(${num})">Delete</button><input class="submit-btn edit-button" type="submit"></td>
        `;

        let submit = document.querySelector(".submit-btn");
        window.addEventListener("keydown", (e) => {
            if (submit !== null && e.key === "Enter") {
                console.log("works")
            }
        })
    }

    window.addEventListener("load", updateTable)

    input.addEventListener("submit", (e) => {
        e.preventDefault();
        submitFunc();
    })

    function editedData(num) {
        let editTask = document.getElementById(`tasks${num}`);
        let editDate = document.getElementById(`date${num}`);

        console.log(editTask);
        console.log(editDate)
    }

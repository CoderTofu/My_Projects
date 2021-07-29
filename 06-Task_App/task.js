    // Take all the variable in the documents that are needed.
    const input = document.getElementById("form-input");

    const table = document.querySelector(".task-table");
    let task = document.getElementById("task");
    let date = document.getElementById("date");

    //Important for editing inputs later
    let editInput;

    // This is the function responsible for when a user submits their task and time or date
    const submitFunc = () => {
        let db = localStorage.getItem("tasks-at-hand");
        let dbParsed = JSON.parse(db);

        // Prepares the data
        let data = {
            "checked": false,
            "task": task.value,
            "date": date.value,
        }

        // I first made it into an array so I could have had some sort of database
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

        // Reloads the table with new updates on the localstorage
        updateTable();
    }

    // This is the function responsible for how the table loads.
    const updateTable = () => {
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
            <td><input type="checkbox" class="checkbox" id="check${i}" onclick="completed(${i})"></td>
            <td>${dbParsed[i]["task"]}</td>
            <td>${dbParsed[i]["date"]}</td>
            <td><button class="delete-btn" onclick="deleteTask(${i})">Delete</button><button class="edit-btn" onclick="editTask(${i})">Edit</button></td>
            `;

            table.appendChild(createRow);

            // This part decides whether a checkbox is checked or not
            if (dbParsed[i]["checked"]) {
                document.getElementById(`check${i}`).checked = true; 
            }

        }
    }

    // function responsible for finding out if the user completed their tasks via checkbox
    const completed = (num) => {
        let db = localStorage.getItem("tasks-at-hand");
        let dbParsed = JSON.parse(db);

        /*Whenever someone clicks the checkbox this function immediately changes their
        checked value on db then updates the table once again */

        dbParsed[num]["checked"] === false ? (dbParsed[num]["checked"] = true) : (dbParsed[num]["checked"] = false);

        let stringedData = JSON.stringify(dbParsed);
        localStorage.setItem("tasks-at-hand", stringedData);

        updateTable()
    }
    
    // Deletes the task that the user pressed
    const deleteTask = (num) => {
        let db = localStorage.getItem("tasks-at-hand");
        let dbParsed = JSON.parse(db);

        dbParsed.splice(num, 1);
        let stringedData = JSON.stringify(dbParsed);
        localStorage.setItem("tasks-at-hand", stringedData);
        updateTable()
    }

    // Part 1 of editing the inputs of the user
    const editTask = (num) => {
        let db = localStorage.getItem("tasks-at-hand");
        let dbParsed = JSON.parse(db);

        let edit = document.querySelectorAll(".edit");
        edit.forEach(btn => {
            btn.disabled = true;
        })

        let row = document.querySelectorAll(".work");
        row[num].innerHTML = `
            <td><input type="checkbox" class="checkbox" id="check${num}" onclick="completed(${num})"></td>
            <td><input type="text" id="task${num}" placeholder="${dbParsed[num]["task"]}"></td>
            <td><input type="text" id="date${num}" placeholder="${dbParsed[num]["date"]}"></td>
            <td><input class="submit-btn edit-button" type="submit"></td>
        `;

        let submit = document.querySelector(".submit-btn");
        submit.addEventListener("click", () => {
            editedData(num)
        })
        
        window.addEventListener("keydown", (e) => {
            if (submit !== null && e.key === "Enter") {
                editedData(num);
            }
        });
    }

    window.addEventListener("load", updateTable)

    input.addEventListener("submit", (e) => {
        e.preventDefault();
        submitFunc();
    })

    // Part 2 of the editing of inputs
    function editedData(num) {
        let db = localStorage.getItem("tasks-at-hand");
        let dbParsed = JSON.parse(db);

        let changeTask = document.getElementById(`task${num}`);
        let changeDate = document.getElementById(`date${num}`);
        
        if (changeTask.value !== "") {
            dbParsed[num]["task"] = changeTask.value;
        } 

        if (changeDate.value !== "") {
            dbParsed[num]["date"] = changeDate.value;
        }

        let dbStringify = JSON.stringify(dbParsed);
        localStorage.setItem("tasks-at-hand", dbStringify);
        updateTable()
    }

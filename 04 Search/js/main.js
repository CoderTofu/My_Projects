// Take needed variables
const form = document.querySelector("form")
const searchBar = document.querySelector("#search-bar");
const sortPrice = document.querySelector("#highLow");
const getWindow = document.querySelector("#list");

let gallery;

// Ready the functions

// This displays the item on to the list
function displayItem(resource) {
    resource.forEach(element => {
        let itemWindow = document.createElement("div");
        let images = document.createElement("img");
        let textName = document.createElement("h6");
        let textPrice = document.createElement("h6");

        textPrice.textContent = element["price"];
        textName.textContent = element["name"];
        images.src = element["picture"];
        textName.classList.add("titles");
        textPrice.classList.add("prices");
        itemWindow.classList.add("items")

        itemWindow.addEventListener('click', function() {
            window.open(element["picture"], '_target')
        })

        itemWindow.appendChild(textPrice)
        itemWindow.appendChild(textName);
        itemWindow.appendChild(images);
        getWindow.appendChild(itemWindow);
    });
}

// Search items
function searchItem(products) {
    clearList();
    let search = products.value.toLowerCase();
    let result = [];
    for(let i = 0; i < gallery.length; i++) {
        if (gallery[i]["name"].toLowerCase().includes(search)){
            result.push(gallery[i])
        }
    }
    displayItem(result);
    result = [];
}

// Event listener for search
form.addEventListener('submit', (e) => {
    e.preventDefault();
    searchItem(searchBar);
})

function highLow(sort) {
    clearList();
    if (sort === "lowToHigh") {
        gallery.sort((a, b) => a["price"] > b["price"] ? 1 : -1)
        displayItem(gallery)
    } else {
        gallery.sort((a, b) => a["price"] < b["price"] ? 1 : -1)
        displayItem(gallery)
    }
}

// Event listener for highest to lowest
sortPrice.addEventListener('change', (e) => {
    e.preventDefault();
    highLow(sortPrice.value)
})

// Fetch json file
fetch("./js/server.json")
    .then(response => {
        return response.json()
    })
    .then(data => {
        displayItem(data);
        gallery = data;
        highLow("highToLow")
    })
    .catch((err) => console.log(err))

function clearList() {
    document.querySelectorAll(".items").forEach(theItems => theItems.remove());
}
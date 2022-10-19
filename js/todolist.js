var category = "todo";

let card = document.getElementById("card");
let title = document.getElementById("add-field-title");
let text = document.getElementById("add-field-text");
let addButton = document.getElementById("add-button");
let categoryButton = document.getElementById("todolist-dropdown");

var categoriesName = new Map();
categoriesName.set("todo", "A faire");
categoriesName.set("inprogress", "En cours");
categoriesName.set("finished", "Terminé");

function changeCategory(arg) {
    category = arg;
    categoryButton.querySelector("button").textContent = "Catégorie: " + categoriesName.get(category) + " ";
}

function toggleCard(el) {
    if (el.parentElement.querySelector("#editsection").style.display == "none") {
        el.parentElement.querySelector("#editsection").style.display = "block";
    } else {
        el.parentElement.querySelector("#editsection").style.display = "none";
    }
}

function editCard (el) {
    let card = el.parentElement.parentElement
    let cardTitle = card.querySelector("#card-title")
    let cardText = card.querySelector("#card-text")
    const newCardTitle = el.parentElement.querySelector("#edit-field-title")
    const newCardText = el.parentElement.querySelector("#edit-field-text")
    cardTitle.textContent = newCardTitle.value
    cardText.textContent = newCardText.value
    toggleCard(card)
    newCardTitle.value = ""
    newCardText.value = ""
}

function deleteCard(el) {
    const listParent = el.parentNode.parentNode.parentNode.id
    el.parentNode.parentNode.remove();
    updateChildElementCount(listParent);
}

function updateChildElementCount(cat) {
    let gridItems = document.getElementById(cat);
    gridItems.querySelector("h2").textContent = categoriesName.get(cat) + " (" + (gridItems.childElementCount - 1) + ")";
}

addButton.addEventListener("click", ()=> {
    if (title.value.trim().length === 0) {
        title.classList.add("is-invalid");
    } else {
        title.classList.remove("is-invalid");
    }
    if (text.value.trim().length === 0) {
        text.classList.add("is-invalid");
    } else {
        text.classList.remove("is-invalid");
    }
    if (title.value.trim().length !== 0 && text.value.trim().length !== 0) {
        let cardClone = card.cloneNode(true);
        cardClone.style.display = "block";
        cardClone.querySelector("#card-title").textContent = title.value;
        cardClone.querySelector("#card-text").textContent = text.value;
        let gridItems = document.getElementById(category);
        gridItems.appendChild(cardClone);
        gridItems.querySelector("h2").textContent = categoriesName.get(category) + " (" + (gridItems.childElementCount - 1) + ")";
    }
})
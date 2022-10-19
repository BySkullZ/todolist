var category = "todo";
var currentElToDrag = null;
var prevElParent = null;

let card = document.getElementById("card");
let title = document.getElementById("add-field-title");
let text = document.getElementById("add-field-text");
let addButton = document.getElementById("add-button");
let categoryButton = document.getElementById("todolist-dropdown");

var categoriesName = new Map();
categoriesName.set("todo", "A faire");
categoriesName.set("ongoing", "En cours");
categoriesName.set("finished", "Terminé");

function changeCategory(arg) {
    category = arg;
    categoryButton.querySelector("button").textContent = "Catégorie: " + categoriesName.get(category) + " ";
}

function toggleDarkMode() {
    let body = document.body;
    let dmcards = document.querySelectorAll(".card");
    body.classList.toggle("dark-theme");
    for (let j = 0; j<dmcards.length; j++) {
        dmcards[j].classList.toggle("bg-dark")
    }
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
    if (newCardTitle.value.trim().length === 0) {
        newCardTitle.classList.add("is-invalid");
    } else {
        newCardTitle.classList.remove("is-invalid");
    }
    if (newCardText.value.trim().length === 0) {
        newCardText.classList.add("is-invalid");
    } else {
        newCardText.classList.remove("is-invalid");
    } if (newCardTitle.value.trim().length !== 0 && newCardText.value.trim().length !== 0) {
        cardTitle.textContent = newCardTitle.value
        cardText.textContent = newCardText.value
        toggleCard(card)
        newCardTitle.value = ""
        newCardText.value = ""
    }
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

function dragStart(el) {
    el.dataTransfer.effectAllowed="move";
    el.dataTransfer.setData("text", el.target.getAttribute("id"));
    currentElToDrag = el.target
    prevElParent = el.currentTarget
}

function dragOver(el) {
    el.preventDefault();
    return false;
}

function dragDrop(el) {
    let ob=el.dataTransfer.getData("text");
    let category = el.currentTarget.getAttribute("id")
    console.log(category, ob)
    el.currentTarget.appendChild(currentElToDrag);
    updateChildElementCount(el.currentTarget.id)
    updateChildElementCount(prevElParent.id)
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

var category = "todo";

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

function editCard(el) {
    console.log(el.parentElement.q)
    el.parentElement.querySelector("editsection").style.display = "block";
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
    let card = document.getElementById("card");
    let cardClone = card.cloneNode(true);
    cardClone.style.display = "block";
    cardClone.querySelector("#card-title").textContent = title.value;
    cardClone.querySelector("#card-text").textContent = text.value;
    let gridItems = document.getElementById(category);
    gridItems.appendChild(cardClone);
    gridItems.querySelector("h2").textContent = categoriesName.get(category) + " (" + (gridItems.childElementCount - 1) + ")";
})
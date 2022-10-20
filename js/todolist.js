var category = "todo";
var currentElToDrag = null;
var prevElParent = null;

//Définition des principales variables
let card = document.getElementById("card");
let title = document.getElementById("add-field-title");
let text = document.getElementById("add-field-text");
let addButton = document.getElementById("add-button");
let categoryButton = document.getElementById("todolist-dropdown");

//Création du dictionnaire
var categoriesName = new Map();
categoriesName.set("todo", "A faire");
categoriesName.set("ongoing", "En cours");
categoriesName.set("finished", "Terminé");

//Fonction qui permet de remplacer la catégorie selectionnée dans le dropdown par celle de l'argument
function changeCategory(arg) {
    category = arg;
    categoryButton.querySelector("button").textContent = "Catégorie: " + categoriesName.get(category) + " ";
}

//Fonction qui modifie le theme global de la page en modifiant des identitées et des classes d'objet dans le html
function toggleDarkMode() {
    let body = document.body;
    let dropdown = document.querySelector(".dropdown-menu");
    let dmcards = document.querySelectorAll(".card");
    let formcontrol = document.querySelectorAll(".form-control");
    body.classList.toggle("dark-theme");
    dropdown.classList.toggle("dropdown-menu-dark");
    for (let j = 0; j<dmcards.length; j++) {
        dmcards[j].classList.toggle("bg-dark");
        dmcards[j].classList.toggle("bg-gradient");
    }
    for (let j = 0; j<formcontrol.length; j++) {
        formcontrol[j].classList.toggle("bg-dark");
        formcontrol[j].classList.toggle("text-light");
        formcontrol[j].classList.toggle("border-dark");
    }
}

//Fonction qui prend en argument une carte et qui affiche son editeur
function toggleCard(el) {
    if (el.parentElement.querySelector("#editsection").style.display == "none") {
        el.parentElement.querySelector("#editsection").style.display = "block";
    } else {
        el.parentElement.querySelector("#editsection").style.display = "none";
    }
}

//Fonction qui prend en argument une carte et qui va modifier ses entrées 
function editCard(el) {
    let card = el.parentElement.parentElement;
    let cardTitle = card.querySelector("#card-title");
    let cardText = card.querySelector("#card-text");
    const newCardTitle = el.parentElement.querySelector("#edit-field-title");
    const newCardText = el.parentElement.querySelector("#edit-field-text");
    if (newCardTitle.value.trim().length === 0) {
        newCardTitle.classList.add("is-invalid");
    } else {
        newCardTitle.classList.remove("is-invalid");
        cardTitle.textContent = newCardTitle.value;
        cardText.textContent = newCardText.value;
        toggleCard(card);
        newCardTitle.value = "";
        newCardText.value = "";
    }
}

//Fonction qui prend en argument une carte, qui la supprime et qui met à jour le compteur de la liste
function deleteCard(el) {
    const listParent = el.parentNode.parentNode.parentNode.id;
    el.parentNode.parentNode.remove();
    updateChildElementCount(listParent);
}

//Fonction qui prend en argument une catégorie et qui met à jour le compteur de la liste
function updateChildElementCount(cat) {
    let gridItems = document.getElementById(cat);
    gridItems.querySelector("h2").textContent = categoriesName.get(cat) + " (" + (gridItems.childElementCount - 1) + ")";
}

//Fonction qui prend en argument une carte et qui récupère les données de la carte 
function dragStart(el) {
    el.dataTransfer.effectAllowed="move";
    el.dataTransfer.setData("text", el.target.getAttribute("id"));
    currentElToDrag = el.target;
    prevElParent = el.currentTarget;
}

//Fonction qui permet de survoler les catégories sans deplacer les cartes sans relachement du clic
function dragOver(el) {
    el.preventDefault();
    return false;
}

//Fonction qui transfert la carte en argument dans la nouvelle catégorie
function dragDrop(el) {
    let ob=el.dataTransfer.getData("text");
    let category = el.currentTarget.getAttribute("id");
    el.currentTarget.appendChild(currentElToDrag);
    updateChildElementCount(el.currentTarget.id);
    updateChildElementCount(prevElParent.id);
}

//Programme appliqué lors de la pression du bouton qui permet de cloner la carte 
addButton.addEventListener("click", ()=> {
    if (title.value.trim().length === 0) {
        title.classList.add("is-invalid");
    } else {
        title.classList.remove("is-invalid");
        let cardClone = card.cloneNode(true);
        cardClone.style.display = "block";
        cardClone.querySelector("#card-title").textContent = title.value;
        cardClone.querySelector("#card-text").textContent = text.value;
        let gridItems = document.getElementById(category);
        gridItems.appendChild(cardClone);
        updateChildElementCount(category);
    }
})

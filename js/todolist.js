var category = "todo"

let title = document.getElementById("add-field-title");
let text = document.getElementById("add-field-text");
let button = document.getElementById("add-button");

function changeCategory(arg) {
    category = arg
    console.log(category)
}

function deleteCard(el) {
    el.parentNode.parentNode.remove();
}

button.addEventListener("click", ()=> {
    let card = document.getElementById("card")
    let cardClone = card.cloneNode(true)
    cardClone.style.display = "block";
    cardClone.querySelector("#card-title").textContent = title.value;
    cardClone.querySelector("#card-text").textContent = text.value;
    gridItems = document.getElementById(category)
    gridItems.appendChild(cardClone)
})
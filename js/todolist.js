var category = "todo"

let field = document.getElementById("add-field");
let button = document.getElementById("add-button");

function changeCategory(arg) {
    category = arg
    console.log(category)
}

button.addEventListener("click", ()=> {
    let text = field.value;
    console.log(text);

    let card = document.getElementById("card")
    let cardClone = card.cloneNode(true)
    gridItems = document.getElementById(category)
    gridItems.appendChild(cardClone)
})
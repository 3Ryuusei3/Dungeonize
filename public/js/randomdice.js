const strBtn = document.getElementById("strength-button")
const strVal = document.getElementById("strength-value")
const dexBtn = document.getElementById("dexterity-button")
const dexVal = document.getElementById("dexterity-value")
const conBtn = document.getElementById("constitution-button")
const conVal = document.getElementById("constitution-value")
const intBtn = document.getElementById("intelligence-button")
const intVal = document.getElementById("intelligence-value")
const wisBtn = document.getElementById("wisdom-button")
const wisVal = document.getElementById("wisdom-value")
const chaBtn = document.getElementById("charisma-button")
const chaVal = document.getElementById("charisma-value")

let min = 6
let max = 18
    

function genRandomNum() {
    return Math.floor((Math.random() * (max - min) + min))
}


function createValue(btn, val) {
    btn.addEventListener("click", () => {
        if (val.value === "0") {
            val.style.color = "#81130c"
            val.value = genRandomNum()
        }
    })
}

createValue(strBtn, strVal)
createValue(dexBtn, dexVal)
createValue(conBtn, conVal)
createValue(intBtn, intVal)
createValue(wisBtn, wisVal)
createValue(chaBtn, chaVal)

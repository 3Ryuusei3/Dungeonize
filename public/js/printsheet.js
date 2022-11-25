let printBtn = document.querySelector(".print-btn")
let charForm = document.querySelector(".toPrint").innerHTML
let originalContents = document.body.innerHTML

printBtn.onclick = () => {
    document.body.innerHTML = charForm
    window.print()
    document.body.innerHTML = originalContents
}
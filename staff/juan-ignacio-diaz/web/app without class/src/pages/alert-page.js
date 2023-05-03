import { hide, show } from "../ui.js"

const alertPage = document.querySelector(".alert")

alertPage.querySelector(".button").onclick = function(event){
    alertPage.querySelector("p").innerText = ""
    hide(alertPage)
}

export function msAlert(message) {  
    alertPage.querySelector("p").innerText = message
    show(alertPage)
}
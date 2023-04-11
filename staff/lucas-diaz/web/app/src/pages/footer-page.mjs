//*VARIABLES DE FOOTER
import { show } from "../ui.mjs";
import { postModal } from "./home-page.mjs";


export const footerSite = document.querySelector(".footer");
const footerButton = document.querySelector(".footer-button");

footerButton.onclick = () => {
    show(postModal);
    
}

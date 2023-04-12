//*VARIABLES DE FOOTER
import { show } from "../ui.js";
import { postModal, postsListPanel } from "./home-page.js";


export const footerSite = document.querySelector(".footer");
const footerButton = document.querySelector(".footer-button");

footerButton.onclick = () => {
    show(postModal);
    postsListPanel.classList.add("fade");
}

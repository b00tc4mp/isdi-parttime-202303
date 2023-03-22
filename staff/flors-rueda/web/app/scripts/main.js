import { changeView, registerUser } from "./displayTools.js";


const register = document.querySelector(".register");
const login = document.querySelector(".login");
const home = document.querySelector(".home");

const checkbox = document.querySelector(".mode-checkbox");
const submitRegister = document.querySelector(".register-submit");
const registerForm = document.querySelector(".register-form");
const changeViewLinks = document.querySelectorAll(".change-view-link");

checkbox.addEventListener("change", (event) => {
  event.preventDefault();
  document.body.classList.toggle("dark-mode");
});

changeViewLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        changeView(register, login);
    })
});

registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    registerUser(register, login);
})


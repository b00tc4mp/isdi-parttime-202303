const registerPage = document.querySelector(".register");
const logInPage = document.querySelector(".login")
const homePage = document.querySelector(".home");

const registerForm = document.querySelector(".register form");
const logInForm = document.querySelector(".login form")

registerForm.addEventListener('submit', function (event) {
    event.preventDefault();
    registerPage.classList.add("off");
    logInPage.classList.remove("off");
})

logInForm.addEventListener('submit', function (event) {
    event.preventDefault();
    logInPage.classList.add("off");
    homePage.classList.remove("off");
})


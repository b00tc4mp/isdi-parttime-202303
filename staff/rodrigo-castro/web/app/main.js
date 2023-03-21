document.querySelector(".go-to-sign-in").addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector(".register-page").classList.add("off");
    document.querySelector(".login-page").classList.remove("off")
})

document.querySelector(".register-now-button").addEventListener("click", (event) => {
    // event.preventDefault();
    document.querySelector(".login-page").classList.add("off");
    document.querySelector(".register-page").classList.remove("off");
})

document.querySelector(".register-button").addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector(".login-page").classList.remove("off");
    document.querySelector(".register-page").classList.add("off");
})

document.querySelector(".login-button").addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector(".login-page").classList.add("off");
    document.querySelector(".home-page").classList.remove("off");
})
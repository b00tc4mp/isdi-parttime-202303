const loginMenu = document.querySelector('.submenu-element .login')
const registerMenu = document.querySelector('.submenu-element .register')

window.onload = () => {
    loginMenu.onclick = () => {
        loginMenu.classList.add('hidden')
        registerMenu.classList.remove('hidden')
    }
}

const createFirstNumber = (screenNumber,screenNumbersButton, completeScreenNumber) => {
    let numberButtons = document.querySelectorAll(".numberButton");
    numberButtons.forEach((numberButton) => {
        numberButton.addEventListener("click",function(){
            screenNumber.push(numberButton.textContent);
            setNumberOnScreen(screenNumber,screenNumbersButton,completeScreenNumber);
        })
    })
}
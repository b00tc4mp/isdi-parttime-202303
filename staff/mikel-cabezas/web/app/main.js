const loginMenu = document.querySelector('.submenu-element .login')
const registerMenu = document.querySelector('.submenu-element .register')

window.onload = () => {
    loginMenu.onclick = () => {
        loginMenu.classList.add('hidden')
        registerMenu.classList.remove('hidden')
    }
}
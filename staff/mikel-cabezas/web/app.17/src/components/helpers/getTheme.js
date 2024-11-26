// import { userAccount } from "../../pages/user-account.js"

export  function initTheme() {
    if(!localStorage.theme && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        localStorage.theme = 'dark'
        document.documentElement.setAttribute("data-theme", "dark");
        document.querySelector('html').classList.add('dark')
    } else if(!localStorage.theme && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        localStorage.theme = 'light'
        document.querySelector('html').classList.add('light')
        document.documentElement.setAttribute("data-theme", "light");
    }

    if(localStorage.theme === 'light') {
        localStorage.theme = 'light'
        document.querySelector('html').classList.add('light')
        document.documentElement.setAttribute("data-theme", "light");
    }
    if(localStorage.theme === 'dark') {
        localStorage.theme = 'dark'
        document.documentElement.setAttribute("data-theme", "dark");
        document.querySelector('html').classList.add('dark')
    }

}


export function userToggleTheme(userAccount) {
    if(document.documentElement.getAttribute('data-theme') === 'light') {
        localStorage.theme = 'dark'
        document.documentElement.setAttribute("data-theme", "dark");
        userAccount.querySelector('.user-theme .material-symbols-outlined').innerText = 'toggle_on'
        userAccount.querySelector('.user-theme .material-symbols-outlined').classList.add ('on')
        userAccount.querySelector('.user-theme').classList.add('dark')
        return userAccount.querySelector('.user-theme').classList.remove('light')
    }
    if(document.documentElement.getAttribute('data-theme') === 'dark') {
        localStorage.theme = 'light'
        document.documentElement.setAttribute("data-theme", "light");
        userAccount.querySelector('.user-theme .material-symbols-outlined').innerText = 'toggle_off'
        userAccount.querySelector('.user-theme .material-symbols-outlined').classList.remove ('on')
        userAccount.querySelector('.user-theme').classList.remove('dark')
        return userAccount.querySelector('.user-theme').classList.add('light')
    }
}
import { userAccount } from "../../pages/user-account.js"

export function getTheme() {
    if(!localStorage.theme && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        localStorage.theme = 'dark'
        document.querySelector('html').classList.add('dark')
    } else if(!localStorage.theme && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        localStorage.theme = 'light'
        document.querySelector('html').classList.add('light')
    }

    if(localStorage.theme === 'light') {
        document.documentElement.setAttribute("data-theme", "light");
        userAccount.querySelector('.user-theme .material-symbols-outlined').innerText = 'toggle_off'
        userAccount.querySelector('.user-theme .material-symbols-outlined').classList.remove ('on')
        userAccount.querySelector('.user-theme').classList.remove ('dark')
        userAccount.querySelector('.user-theme').classList.add ('light')
    }
    if(localStorage.theme === 'dark') {
        document.documentElement.setAttribute("data-theme", "dark");
        userAccount.querySelector('.user-theme .material-symbols-outlined').innerText = 'toggle_on'
        userAccount.querySelector('.user-theme .material-symbols-outlined').classList.add ('on')
        userAccount.querySelector('.user-theme').classList.remove ('light')
        userAccount.querySelector('.user-theme').classList.add ('dark')
    }

    userAccount.querySelector('.user-theme').onclick = (event) => {
        event.preventDefault
        if(userAccount.querySelector('.user-theme').classList.contains('light')) {
            localStorage.theme = 'dark'
            document.documentElement.setAttribute("data-theme", "dark");
            userAccount.querySelector('.user-theme .material-symbols-outlined').innerText = 'toggle_on'
            userAccount.querySelector('.user-theme .material-symbols-outlined').classList.add ('on')
            userAccount.querySelector('.user-theme').classList.add('dark')
            return userAccount.querySelector('.user-theme').classList.remove('light')
        }
        if(userAccount.querySelector('.user-theme').classList.contains('dark')) {
            localStorage.theme = 'light'
            document.documentElement.setAttribute("data-theme", "light");
            userAccount.querySelector('.user-theme .material-symbols-outlined').innerText = 'toggle_off'
            userAccount.querySelector('.user-theme .material-symbols-outlined').classList.remove ('on')
            userAccount.querySelector('.user-theme').classList.remove('dark')
            return userAccount.querySelector('.user-theme').classList.add('light')
        }
    }
}
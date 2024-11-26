// import { userAccount } from "../../pages/user-account.js"

// export  function initTheme() {
//     if(!localStorage.theme && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
//         localStorage.theme = 'dark'
//         document.documentElement.setAttribute("data-theme", "dark");
//         document.querySelector('html').classList.add('dark')
//     } else if(!localStorage.theme && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
//         localStorage.theme = 'light'
//         document.querySelector('html').classList.add('light')
//         document.documentElement.setAttribute("data-theme", "light");
//     }

//     if(localStorage.theme === 'light') {
//         localStorage.theme = 'light'
//         document.querySelector('html').classList.add('light')
//         document.documentElement.setAttribute("data-theme", "light");
//     }
//     if(localStorage.theme === 'dark') {
//         localStorage.theme = 'dark'
//         document.documentElement.setAttribute("data-theme", "dark");
//         document.querySelector('html').classList.add('dark')
//     }
// }
export function initTheme() {

    let theme

    if (!localStorage.theme && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        theme = 'dark'
        localStorage.theme = 'dark'
    } else if (!localStorage.theme && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        theme = 'light'
        localStorage.theme = 'light'
    }


    if(localStorage.theme === 'light') {
        theme = 'light'
        localStorage.theme = 'light'
    }
    if(localStorage.theme === 'dark') {
        theme = 'dark'
        localStorage.theme = 'dark'
    }
    return theme
}


export function userToggleTheme() {
    if(localStorage.theme !== 'dark') {
        localStorage.theme = 'dark'
        return document.documentElement.classList.add("dark");
        // userAccount.querySelector('.user-theme .material-symbols-outlined').innerText = 'toggle_on'
        // userAccount.querySelector('.user-theme .material-symbols-outlined').classList.add('on')
        // return userAccount.querySelector('.user-theme').classList.remove('light')
    }
    if(localStorage.theme === 'dark') {
        localStorage.theme = 'light'
        return document.documentElement.classList.remove("dark");
        // userAccount.querySelector('.user-theme .material-symbols-outlined').innerText = 'toggle_off'
        // userAccount.querySelector('.user-theme .material-symbols-outlined').classList.remove('on')
        // userAccount.querySelector('.user-theme').classList.remove('dark')
        // return userAccount.querySelector('.user-theme').classList.add('light')
    }
}
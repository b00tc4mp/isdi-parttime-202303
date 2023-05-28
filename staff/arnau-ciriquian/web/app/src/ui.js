export const context = sessionStorage

export function setTheme (theme) {
    const root = document.querySelector(':root')

    if (theme === 'dark') {
        root.classList.add('dark')
    } else {
        root.classList.remove('dark')
    }

    localStorage.theme = theme
}

export function getTheme () {
    return localStorage.theme || 'light'
}
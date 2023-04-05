console.log('ui loaded')

export const showElement = (...element) => {
    element.forEach(container => container.classList.remove('off'))
}

export const hideElement = (...element) => {
    element.forEach(container => container.classList.add('off'))
}

export const toggleElement = (...element) => {
    element.forEach(container => container.classList.toggle('off'))
}

export const resetPage = (...pages) => {
    pages.forEach(page => page.querySelector('.red-text').textContent = '')
    pages.forEach(page => page.querySelector('form').reset())
    pages.forEach(page => page.classList.add('off'))
    pages.forEach(page => page.classList.remove('green-text'))
}

export const resetHomePage = (homePage) => { // TODO !!!!

}
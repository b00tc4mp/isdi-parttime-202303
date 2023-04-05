const showElement = (...element) => {
    element.forEach(container => container.classList.remove('off'))
}

const hideElement = (...element) => {
    element.forEach(container => container.classList.add('off'))
}

const toggleElement = (...element) => {
    element.forEach(container => container.classList.toggle('off'))
}

const resetPage = (...pages) => {
    pages.forEach(page => page.querySelector('.red-text').textContent = '')
    pages.forEach(page => page.querySelector('form').reset())
    pages.forEach(page => page.classList.add('off'))
}

const resetHomePage = (homePage) => { // TODO !!!!

}
const showElement = (...element) => {
    element.forEach(container => container.classList.remove('off'))
}

const hideElement = (...element) => {
    element.forEach(container => container.classList.add('off'))
}

const toggleElement = (...element) => {
    element.forEach(container => container.classList.toggle('off'))
}
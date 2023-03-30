loginPage.querySelector('.input__password--show').onclick = function(event) {
    event.preventDefault()

    showHidePassword()
}

function showHideContainer(...containers) {
    containers.forEach(container => container.classList.toggle('off'))
}
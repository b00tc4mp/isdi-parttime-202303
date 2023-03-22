document.querySelector('.section.register form.register-form').addEventListener('submit', function(event) {
    event.preventDefault()
    document.querySelector('.section.register').classList.add('off')
    document.querySelector('.section.login.section').classList.remove('off')
})
document.querySelector('.section.login form.login-form').addEventListener('submit', function(event) {
    event.preventDefault()
    document.querySelector('.section.login').classList.add('off')
    document.querySelector('.section.home').classList.remove('off')
})
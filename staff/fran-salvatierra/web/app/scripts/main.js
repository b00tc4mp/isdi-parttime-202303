var registerPage = document.querySelector('.s-register')
var loginPage = document.querySelector('.s-login')
var homePage = document.querySelector('.s-home')
var navBar = document.querySelector('.header-menu-toggle')
var authenticatedEmail

loginPage.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault()
    // TODO how to get all data from inputs
    // var email = loginPage.querySelector('input[name=email]').value
    // var password = loginPage.querySelector('input[name=password]').value
    // var result = authenticateUser(email, password)

    // if (!result) {
    //     alert('wrong email or password')
    // } else {
    //     authenticatedEmail = email
    //     loginPage.classList.add('off')
    //     homePage.classList.remove('off')
    //     navBar.classList.remove('off')
    // }

    loginPage.classList.add('off')
        homePage.classList.remove('off')
        navBar.classList.remove('off')
    alert(`Welcome,` )
})

registerPage.querySelector('button').addEventListener('click', function (event) {
    event.preventDefault()
    
    // var registerName = registerPage.querySelector('input[name=name]').value
    // var registerEmail = registerPage.querySelector('input[name=email]').value
    // var registerPassword = registerPage.querySelector('input[name=password]').value
    
    // var result = registerUser(registerName, registerEmail, registerPassword)
    
    // if (!result) {
    //     alert('Used mail')
    // } else {
    //     registerPage.classList.add('off')
    //     loginPage.classList.remove('off')
    // }
    registerPage.classList.add('off')
        loginPage.classList.remove('off')

})

loginPage.querySelector('.login-form__link').addEventListener('click', function (event) {
    event.preventDefault()
    
        loginPage.classList.add('off')
        registerPage.classList.remove('off')
})

navBar.addEventListener('click', function (event) {
    event.preventDefault()
})

homePage.querySelector('.profile-panel__button').addEventListener('click', function (event) {
    event.preventDefault()
})

homePage.querySelector('.profile-logout__button').addEventListener('click', function (event) {
    event.preventDefault()
    homePage.classList.add('off')
    loginPage.classList.remove('off')
})


// TODO show 'hello, username on login
// TODO add link to profile in home page and open a profile panel. Panales de una pagina.
// TODO add a form in profile panel to allow the user to update his/her password (asking current password, and new password and new password confirmation) && update change mail [be sure the user cant not use the prev ones.]
/* - al crear password, que aparezca la información  de como de segura es la contraseña.
- Añadir la posibilidad en la creación de perfil, añadir una foto.
pattern que compruebe los digitos y los caracteres de los campos rellenados en el formulario.
//TODO create a alert system to show all the errors, success and info messages to the user.
//TODO create a logic to dont allow the user to create an account with the same email.
TODO input validation for all the fields
*/

//Revisar clase y proyecto pusheado por manu para hacer más logica de requisitos y peticiones en creación de perfil. Dotar de funcionalidad a la aplicación. (nada de strings vacios, monoletras, etc. Hay que contemplar todas las funcionalidades y errores del usuario)


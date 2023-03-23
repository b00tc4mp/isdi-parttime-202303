var registerPage = document.querySelector('.register')
var loginPage = document.querySelector('.login')
var homePage = document.querySelector('.home')

registerPage.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault()

    var newUser = registerPage.querySelector('input[name=name]').value
    var newEmail = registerPage.querySelector('input[name=email]').value
    var newPassword = registerPage.querySelector('input[name=password]').value
    
    var result = registerUser(newUser, newEmail, newPassword)

    if (!result) {
        alert('User already registered!')
    } else {
        registerPage.classList.add('off')
        loginPage.classList.remove('off')
    }
})

loginPage.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault()

    var email = loginPage.querySelector('input[name=email]').value
    var password = loginPage.querySelector('input[name=password]').value

    var result = authenticateUser(email, password)
    
    if (!result) {
        alert('wrong email or password')
    } else {
        loginPage.classList.add('off')
        homePage.classList.remove('off')

    } 
    
    //Easter Egg
    /*if (foundUser === undefined && password === 'orange') {
        document.querySelector('.pattern-hex').classList.add('orange-hex')
        document.querySelector('.pattern-hex').classList.remove('blue-hex')
        document.querySelector('.pattern-color').classList.add('green-gradient')
        document.querySelector('.pattern-color').classList.remove('purple-gradient')
    }*/
    //
})

registerPage.querySelector('a').addEventListener('click', function(event) {
    event.preventDefault()
    
    registerPage.classList.add('off')
    loginPage.classList.remove('off')
})

loginPage.querySelector('a').addEventListener('click', function(event) {
    event.preventDefault()
    
    loginPage.classList.add('off')
    registerPage.classList.remove('off')
})

//TODO:
//User name test
//homePage.querySelector('.home-tittle').innerHTML = `Welcome ${foundUser.name}!`
//a data.js un var loggedUser? per tenir la info del user ja sempre a ma


//add link to profile in home page and open profile panel <a>
//add a form in profile panel to allow the user to update his/her password (ask current password, new password and new password confirmation)
//logout button? <a>

//a logic.js crear la funcio del password
//function changePassword(email, password, newPassword, newPasswordConfirmation) {}
//Add doble password check and empty inputs check
//Add password minimum 8 characters, Mayus, minus and symbol
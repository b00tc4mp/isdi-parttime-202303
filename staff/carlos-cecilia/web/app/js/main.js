var registerPage = document.querySelector('.register')
var loginPage = document.querySelector('.login')
var homePage = document.querySelector('.home')
var authenticatedEmail
var profilePanel = homePage.querySelector('.profile')

registerPage.querySelector('form').addEventListener('submit',
function(event) {
    event.preventDefault()

    var name = registerPage.querySelector('input[name=name]').value
    var email = registerPage.querySelector('input[name=email').value
    var password = registerPage.querySelector('input[name=password').value

    var result = registerUser(name, email, password)

    if(result === false) {
        alert('user already exists')
    } else {
        registerPage.classList.add('off')
        loginPage.classList.remove('off')
    }



})

loginPage.querySelector('form').addEventListener('submit', 
function(event) {
    event.preventDefault ()
    var email = loginPage.querySelector('input[name=email]').value
    var password = loginPage.querySelector('input[name=password]').value

    var result = authenticateUser(email, password)

    if (!result) {
        alert('Email or user used is invalid')
    } else {

        authentificateEmail = email

        //TODO lookup user by email
        var foundUser = retrieveUser(email)
        
    if (!foundUser) {
        alert('user not found')

    } else {
        //TODO lookup paragraph in home page
        //TODO replace paragraph text with saludation to user name

        homePage.querySelector('p').innerText = `Hello, ${foundUser.name}!`
        loginPage.classList.add('off')
        homePage.classList.remove('off')


    }
        
        
        
        
        
        

    }   
})

loginPage.querySelector('a').addEventListener('click', function (event){

    event.preventDefault()

    loginPage.classList.add('off')
    registerPage.classList.remove('off')

})
registerPage.querySelector('a').addEventListener('click', function (event) {
    event.preventDefault()

    registerPage.classList.add('off')
    loginPage.classList.remove('off')

})




// todo show "hello <username>" on login
//TODO add link to profile in home page and open a profile panel
//TODO add a form un profile panel to allow the user to update his/her password, and new password and new passwor dconfirmation

//profilePanel.

homePage.querySelector('a').onclick = function (event) {
    event.preventDefault()

    profilePanel.classList.remove('off')
}

profilePanel.querySelector('form').onsubmit = function (e) {
    e.preventDefault();

    var password = profilePanel.querySelector('input[name=password]').value
    var newPassword = profilePanel.querySelector('input[name=newPassword]').value
    var newPasswordConfirm = profilePanel.querySelector('input[name=newPasswordConfirm]').value

    var result = updateUserPassword(authenticatedEmail, password, newPassword, newPasswordConfirm)

    if(!result)
    alert('password update failed')

    else

    alert('password updated')

}
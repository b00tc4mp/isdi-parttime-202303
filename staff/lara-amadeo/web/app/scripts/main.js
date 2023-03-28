var registrationPage = document.querySelector('.registration')
var loginPage = document.querySelector('.login')
var homePage = document.querySelector('.homepage')

var authenticatedName
var authenticatedEmail
var authenticatedPassword

//Registration
registrationPage.querySelector('form').addEventListener('submit', function(event){
    event.preventDefault()
    
   var registrationName = registrationPage.querySelector('input[name=username]').value
   var registrationEmail = registrationPage.querySelector('input[name=email]').value
   var registrationPassword = registrationPage.querySelector('input[name=password]').value
   var registrationRepPassword = registrationPage.querySelector('input[name=rep-password]').value

   try {
    checkUserExists(registrationName, registrationEmail, registrationPassword,registrationRepPassword)
    registrationPage.classList.add('off')
    loginPage.classList.remove('off')
   } catch (error) {
    registrationPage.querySelector('.error-message').textContent = error.message
   }
   finally {
    registrationPage.querySelector('input[name=password]').value = ''
    registrationPage.querySelector('input[name=rep-password]').value = ''
   }
})

//Already an account
registrationPage.querySelector('a').addEventListener('click', function(event){
    event.preventDefault()
    registrationPage.classList.add('off')
    loginPage.classList.remove('off')
})

//Back to register
loginPage.querySelector('.create-account').querySelector('.link').addEventListener('click', function(event){
    event.preventDefault()

    loginPage.classList.add('off')
    registrationPage.classList.remove('off')
})

//Login
loginPage.querySelector('.primary-button').addEventListener('click', function(event){
    event.preventDefault()

    var inputEmail = loginPage.querySelector('input[name=email]').value
    var inputPassword = loginPage.querySelector('input[name=password]').value

    try{
        checkCredentials(inputEmail, inputPassword)
        authenticatedEmail = inputEmail
        authenticatedPassword = inputPassword
        authenticatedName = users.find((user) => user.email === authenticatedEmail).username

        loginPage.classList.add('off')
        homePage.classList.remove('off')
        homePage.querySelector('.homepage-hello').innerHTML = "Hello " + authenticatedName + "!"
    } catch (error) {
        loginPage.querySelector('.error-message').textContent = error.message
    } finally {
        loginPage.querySelector('input[name=password]').value= ''
    }
})


homePage.querySelector('#logout').addEventListener('click', function(event){
    event.preventDefault()

    homePage.classList.add('off')
    loginPage.classList.remove('off')
})

homePage.querySelector('#update-password').addEventListener('click', function(event){
    event.preventDefault()

    homePage.querySelector('.update-password').classList.remove('off')
})

homePage.querySelector('#update-mail').addEventListener('click', function(event){
    event.preventDefault()

    homePage.querySelector('.update-mail').classList.remove('off')
})

//Confirm update password
homePage.querySelector('#save-update-password').addEventListener('click', function(event){
    event.preventDefault()

    var currentPassword = homePage.querySelector('input[name=currentPassword]').value
    var newPassword = homePage.querySelector('input[name=newPassword]').value
    var confirmNewPassword = homePage.querySelector('input[name=confirmNewPassword]').value

    try{
        updatePassword(users, authenticatedEmail, currentPassword, newPassword, confirmNewPassword)
        homePage.querySelector('.update-password').querySelector('.success-message').textContent = "Your password has been updated!"
    } catch (error) {
        homePage.querySelector('.error-message').textContent = error.message
    } finally {
        homePage.querySelector('.update-password').querySelector('input[name=currentPassword]').value= ''
        homePage.querySelector('.update-password').querySelector('input[name=newPassword]').value = ''
        homePage.querySelector('.update-password').querySelector('input[name=confirmNewPassword]').value = ''
    } 
})


homePage.querySelector('#cancel-update-password').addEventListener('click', function(event){
    event.preventDefault()

    homePage.querySelector('.update-password').classList.add('off')
})

//Confirm update mail
homePage.querySelector('#save-update-email').addEventListener('click', function(event){
    event.preventDefault()

    var currentEmail = homePage.querySelector('input[name=currentEmail]').value
    var newEmail = homePage.querySelector('input[name=newEmail]').value
    var confirmNewEmail = homePage.querySelector('input[name=confirmNewEmail]').value

    try {
        updateEmail(users, authenticatedEmail, currentEmail, newEmail, confirmNewEmail)
        homePage.querySelector('.update-mail').querySelector('.success-message').textContent = "Your email has been updated!"
    } catch (error) {
        homePage.querySelector('.update-mail').querySelector('.error-message').textContent = error.message
    } finally {
        homePage.querySelector('.update-mail').querySelector('input[name=currentEmail]').value = ""
        homePage.querySelector('.update-mail').querySelector('input[name=newEmail]').value = ""
        homePage.querySelector('.update-mail').querySelector('input[name=confirmNewEmail]').value = ""
    }
})

var registrationPage = document.querySelector('.registration')
var registerForm = registrationPage.querySelector('form')

var loginPage = document.querySelector('.login')
var loginForm = loginPage.querySelector('form')

var homePage = document.querySelector('.homepage')
var updatePasswordForm = homePage.querySelector('.update-password')
var updateEmailForm = homePage.querySelector('.update-mail')
var updateAvatarForm = homePage.querySelector('.update-avatar')
var homeProfileLink = homePage.querySelector('a') 
var homeProfile = homePage.querySelector('.profile') 

var authenticatedName
var authenticatedEmail
var authenticatedPassword

//Registration
registerForm.onsubmit = function(event){
    event.preventDefault()
    
   var registrationName = registrationPage.querySelector('input[name=username]').value
   var registrationEmail = registrationPage.querySelector('input[name=email]').value
   var registrationPassword = registrationPage.querySelector('input[name=password]').value
   var registrationRepPassword = registrationPage.querySelector('input[name=rep-password]').value

   try {
    validateEmail(registrationEmail)
    validatePassword(registrationPassword)
    validatePassword(registrationRepPassword, 'new password')
    checkUserExists(registrationName, registrationEmail, registrationPassword,registrationRepPassword)
    hide(registrationPage)
    show(loginPage)
   } catch (error) {
    registrationPage.querySelector('.error-message').textContent = error.message
   }
   finally {
    registrationPage.querySelector('input[name=password]').value = ''
    registrationPage.querySelector('input[name=rep-password]').value = ''
   }
}

//Already an account
registrationPage.querySelector('a').addEventListener('click', function(event){
    event.preventDefault()
    hide(registrationPage)
    show(loginPage)
})

//Back to register
loginPage.querySelector('.create-account').querySelector('.link').addEventListener('click', function(event){
    event.preventDefault()

    hide(loginPage)
    show(registrationPage)
})

//Login
loginForm.onsubmit = function(event){
    event.preventDefault()

    var inputEmail = event.target.email.value
    var inputPassword = event.target.password.value

    try{
        checkCredentials(inputEmail, inputPassword)
        authenticatedEmail = inputEmail
        authenticatedPassword = inputPassword
        authenticatedName = users.find((user) => user.email === authenticatedEmail).username

        hide(loginPage)
        show(homePage)
        homePage.querySelector('.homepage-hello').innerHTML = "Hello " + authenticatedName + "!"
        homeProfileLink.innerHTML = authenticatedName
    } catch (error) {
        loginPage.querySelector('.error-message').textContent = error.message
    } finally {
        loginPage.querySelector('input[name=password]').value= ''
        hide(homeProfile)
    }
}

homeProfileLink.onclick = function(event){
    event.preventDefault()

    toggle(homeProfile)
    hide(updateEmailForm, updatePasswordForm, updateAvatarForm)
}

homeProfile.querySelector('.nav-row-email').onclick = function(event){
    event.preventDefault()

    hide(homeProfile)
    show(updateEmailForm)
}
homeProfile.querySelector('.nav-row-password').onclick = function(event){
    event.preventDefault()

    hide(homeProfile)
    show(updatePasswordForm)
}

homeProfile.querySelector('.nav-row-avatar').onclick = function(event){
    event.preventDefault()

    hide(homeProfile)
    show(updateAvatarForm)
}

homeProfile.querySelector('.link').onclick = function(event){
    event.preventDefault()

    hide(homePage)
    show(loginPage)
}

//Confirm update password
homePage.querySelector('#save-update-password').addEventListener('click', function(event){
    event.preventDefault()

    var currentPassword = homePage.querySelector('input[name=currentPassword]').value
    var newPassword = homePage.querySelector('input[name=newPassword]').value
    var confirmNewPassword = homePage.querySelector('input[name=confirmNewPassword]').value

    try{
        updatePassword(users, authenticatedEmail, currentPassword, newPassword, confirmNewPassword)
        updatePasswordForm.querySelector('.success-message').textContent = "Your password has been updated!"
    } catch (error) {
        homePage.querySelector('.error-message').textContent = error.message
    } finally {
        updatePasswordForm.querySelector('input[name=currentPassword]').value= ''
        updatePasswordForm.querySelector('input[name=newPassword]').value = ''
        updatePasswordForm.querySelector('input[name=confirmNewPassword]').value = ''
    } 
})


homePage.querySelector('#cancel-update-password').addEventListener('click', function(event){
    event.preventDefault()

    hide(updatePasswordForm)
    show(homeProfile)
})

//Confirm update mail
homePage.querySelector('#save-update-email').addEventListener('click', function(event){
    event.preventDefault()

    var currentEmail = homePage.querySelector('input[name=currentEmail]').value
    var newEmail = homePage.querySelector('input[name=newEmail]').value
    var confirmNewEmail = homePage.querySelector('input[name=confirmNewEmail]').value

    try {
        updateEmail(users, authenticatedEmail, currentEmail, newEmail, confirmNewEmail)
        updateEmailForm.querySelector('.success-message').textContent = "Your email has been updated!"
    } catch (error) {
        updateEmailForm.querySelector('.error-message').textContent = error.message
    } finally {
        updateEmailForm.querySelector('input[name=currentEmail]').value = ""
        updateEmailForm.querySelector('input[name=newEmail]').value = ""
        updateEmailForm.querySelector('input[name=confirmNewEmail]').value = ""
    }
})

homePage.querySelector('#cancel-update-email').addEventListener('click', function(event){
    event.preventDefault()

    hide(updateEmailForm)
    show(homeProfile)
})

//Confirm update avatar
homePage.querySelector('.update-avatar').querySelector('.centered-form').onsubmit = function(event){
    event.preventDefault()

    var avatarUrl = homePage.querySelector('.update-avatar').querySelector('input[name=avatar]').value

    try{
        validateAvatarFormat(avatarUrl)
        updateAvatar(authenticatedEmail, avatarUrl)
        
        alert('avatar updted')
        homePage.querySelector('.topbar-avatar').src = avatarUrl
    } catch (error){
        homePage.querySelector('.update-avatar').querySelector('.error-message').textContent = error.message
    }
}

homePage.querySelector('#cancel-update-avatar').addEventListener('click', function(event){
    event.preventDefault()

    hide(updateAvatarForm)
    show(homeProfile)
    toggle(updateAvatarForm.querySelector('.error-message'))
})
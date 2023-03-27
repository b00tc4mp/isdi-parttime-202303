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

   var result = checkUserExists(registrationName, registrationEmail, registrationPassword)

   if(result){
    registrationPage.classList.add('off')
    loginPage.classList.remove('off')
   } else registrationPage.querySelector('.error-message').classList.remove('off')
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

    var result = checkCredentials(inputEmail, inputPassword)

    if (result){
        authenticatedEmail = inputEmail
        authenticatedPassword = inputPassword
        authenticatedName = users.find((user) => user.email === authenticatedEmail).username

        loginPage.classList.add('off')
        homePage.classList.remove('off')
        homePage.querySelector('.profile').classList.add('off')
        homePage.querySelector('.homepage-hello').innerHTML = "Hello " + authenticatedName + "!"

    } else loginPage.querySelector('.error-message').classList.remove('off') 
   
})


homePage.querySelector('#logout').addEventListener('click', function(event){
    event.preventDefault()

    homePage.classList.add('off')
    loginPage.classList.remove('off')
})

homePage.querySelector('#profile').addEventListener('click', function(event){
    event.preventDefault()

    homePage.querySelector('.profile').classList.remove('off')
})

//Confirm update password
homePage.querySelector('.primary-button').addEventListener('click', function(event){
    event.preventDefault()

    var currentPassword = homePage.querySelector('input[name=currentPassword]').value
    var newPassword = homePage.querySelector('input[name=newPassword]').value
    var confirmNewPassword = homePage.querySelector('input[name=confirmNewPassword]').value

    var currentPasswordChecked = checkCurrentPassword(currentPassword)
    var newPasswordsMatching = checkPasswordMatch(newPassword,confirmNewPassword)
    

if (!currentPasswordChecked){
    alert("The password you entered doesn't match your current password")
} else {
    if (currentPassword === newPassword){
        alert(`New password can't be the same as current one`)
    } else {
        if (newPasswordsMatching){
            updatePassword(users, authenticatedEmail, newPassword)
            alert('Password updated')

            homePage.querySelector('input[name=currentPassword]').value = ""
            homePage.querySelector('input[name=newPassword]').value = ""
            homePage.querySelector('input[name=confirmNewPassword]').value = ""
                        
        } else alert("New passwords doesn't match")
    }
}
})


homePage.querySelector('.secondary-button').addEventListener('click', function(event){
    event.preventDefault()

    homePage.querySelector('.profile').classList.add('off')
})

//alerts salgan en pantalla y no en alerts




var registerPage= document.querySelector('.register')
var registerForm = registerPage.querySelector('form')

var loginPage= document.querySelector('.login')
var loginForm= loginPage.querySelector('form')
var homePage= document.querySelector('.home')
var authenticateEmail 
// es util porque nos serviran los datos para el cambio de sesion...
var homeMenu = homePage.querySelector('.home-header').querySelector('.home-menu')
var myProfileLink = homeMenu.querySelector('a')
var homeProfileEdit = homePage.querySelector('.profile-edit') 
var homeProfileEditAvatarForm= homeProfileEdit.querySelector('.profile-edit-avatar-form')
var homeProfileEditPasswordForm = homePage.querySelector('.profile-edit-password')


//REGISTER PAGE

// capture datas Register form
registerForm.onsubmit = function(event) {
    event.preventDefault()

    var name = registerForm.querySelector('input[name=name]').value
    var email = registerForm.querySelector('input[name=email]').value
    var password = registerForm.querySelector('input[name=password]').value

    try{
        var result = registerUser(name,email,password)
        if (result === false) throw new Error ('User does exist')

        registerForm.reset()
        registerPage.classList.add('off')
        loginPage.classList.remove('off')

    } catch (error) {
        alert(error.message)
    }
}

// LOGIN PAGE

//capture datas Login form
loginForm.onsubmit = function (event) {
    event.preventDefault()

    var email = loginForm.querySelector('input[name=email]').value
    var password = loginForm.querySelector('input[name=password]').value
    
    try{
        var result = authenticateUser(email,password)
        if(result === false) throw new Error ('wrong email or password')

        authenticateEmail = email

        var foundUser = retrieveUser(email)

        homeMenu.querySelector('.myProfile').innerText = `${foundUser.name}`

        //TODO añadir avatar image -- clase 28/03/2023

        loginForm.reset()

        loginPage.classList.add('off')
        homePage.classList.remove('off')

    } catch(error) {
    alert(error.message)
    }
}


//configurate anchor <a> Login

loginPage.querySelector('a').onclick = function(event){
    event.preventDefault()

    loginForm.reset()
    loginPage.classList.add('off')
    registerPage.classList.remove('off')
}

//configurate anchor <a> register

registerPage.querySelector('a').conclick = function(event){
    event.preventDefault()

    registerForm.reset()
    registerPage.classList.add('off')
    loginPage.classList.remove('off')
}

//HOME PAGE

//Menu my Profile
// configurate home--button myprofile--con anchor

homeMenu.querySelector('.myProfile').onclick = function(event){
    event.preventDefault()

   homeProfileEdit.classList.remove('off')
}



//configurate home--button--update avatar --con anchor

homeProfileEdit.querySelector('.updateAvatar').onclick = function(event){
    event.preventDefault()
    homeProfileEdit.querySelector('.profile-edit-avatar-form').classList.remove('off')
}


//configurate home--button--update password --con anchor

homeProfileEdit.querySelector('.updatePassword').onclick = function(event){
    event.preventDefault()

    homeProfileEdit.querySelector('.profile-edit-password').classList.remove('off')
}



//configurate form to change avatar

homeProfileEditAvatarForm.onsubmit = function (event){
    event.preventDefault()

    var newAvatar = homeProfileEditAvatarForm.querySelector('input[name=avatar-url]').value
    //otras formas de hacerlo 
    //var url1 = event.target.avatar-url.value (la mas usual) 
    //var url2= homeProfileEdit.querySelector('profile-edit-avatar-form').avatar-url.value 
    //var url3 = this.avatar-url.value //(no recomendado)

    try{
        var result = updateUserAvatar(authenticateUser, newAvatar)
        if(result === false) throw new Error ('Update avatar failed')

        alert('your avatar has been updated')
    }catch(error) {
        alert(error.message)
    }

}

//configurate form to change password (3 inputs)

homeProfileEditPasswordForm.onsubmit = function(event){
    event.preventDefault()

    var password= homeProfileEditPasswordForm.querySelector('input[name=password]').value
    var userNewPassword = homeProfileEditPasswordForm.querySelector('input[name=new-password]').value
    var userConfirmNewPassword = homeProfileEditPasswordForm.querySelector('input[name=confirm-new-password]').value
    
    try{
        var result = validatedNewPassword (authenticateEmail, password, userNewPassword, userConfirmNewPassword)

        if(result === false) throw new Error ('Validate New password failed')
    
        alert('your new password has been validated')
    }catch(error) {
        alert(error.message)
    }
    homeProfileEditPasswordForm.reset()
}

//home-header-Logout 

homePage.querySelector('.home-header').querySelector('.home-header-logout').querySelector('.logout').onclick = function(event) {
    event.preventDefault() 
    //no necesario al estar fuera de un formulario

    homePage.classList.add('off') 
    homeProfileEdit.classList.add('off') 
    homeProfileEditAvatarForm.classList.add('off')
    homeProfileEditPasswordForm.classList.add('off')
    loginPage.classList.remove('off')
}






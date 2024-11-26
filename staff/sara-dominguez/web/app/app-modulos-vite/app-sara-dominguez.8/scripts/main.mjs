import { registerUser, authenticateUser, retrieveUser, updateUserAvatar, validatedNewPassword } from './logic.mjs'

const registerPage= document.querySelector('.register')
const registerForm = registerPage.querySelector('form')

const loginPage= document.querySelector('.login')
const loginForm= loginPage.querySelector('form')
const homePage= document.querySelector('.home')
let authenticadedUserId  
// es util porque nos serviran los datos para el cambio de sesion...
const homeMenu = homePage.querySelector('.home-header').querySelector('.home-menu')
const myProfileLink = homeMenu.querySelector('.myProfile')
const homeProfileEdit = homePage.querySelector('.profile-edit') 
const homeProfileEditAvatarForm= homeProfileEdit.querySelector('.profile-edit-avatar-form')
const homeProfileEditPasswordForm = homePage.querySelector('.profile-edit-password-form')


//REGISTER PAGE

// capture datas Register form
registerForm.onsubmit = function(event) {
    event.preventDefault()

    const name = registerForm.querySelector('input[name=name]').value
    const email = registerForm.querySelector('input[name=email]').value
    const password = registerForm.querySelector('input[name=password]').value

    try{
        registerUser(name,email,password)
        
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

    const email = loginForm.querySelector('input[name=email]').value
    const password = loginForm.querySelector('input[name=password]').value
    
    try{
        authenticadedUserId = authenticateUser(email,password)
        
        const user = retrieveUser(authenticadedUserId)

        myProfileLink.innerText = `${user.name}`

        if(user.avatar){
            homeMenu.querySelector('.home-header-avatar').src = user.avatar
        }


        loginForm.reset()

        loginPage.classList.add('off')
        homePage.classList.remove('off')

        
        }   catch (error) {
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

    const newAvatar = homeProfileEditAvatarForm.querySelector('input[name=avatar-url]').value
    
    //otras formas de hacerlo 
    //const url1 = event.target.avatar-url.value (la mas usual) 
    //const url2= homeProfileEdit.querySelector('profile-edit-avatar-form').avatar-url.value 
    //const url3 = this.avatar-url.value //(no recomendado)

    try{
        updateUserAvatar(authenticadedUserId, newAvatar)
       
        alert('your avatar has been updated')
        homeMenu.querySelector('.home-header-avatar').src = newAvatar
    }catch(error) {
        alert(error.message)
    }

}

//configurate form to change password (3 inputs)

homeProfileEditPasswordForm.onsubmit = function(event){
    event.preventDefault()

    const password= homeProfileEditPasswordForm.querySelector('input[name=password]').value
    const userNewPassword = homeProfileEditPasswordForm.querySelector('input[name=new-password]').value
    const userConfirmNewPassword = homeProfileEditPasswordForm.querySelector('input[name=confirm-new-password]').value
    
    try{
        validatedNewPassword (authenticadedUserId , password, userNewPassword, userConfirmNewPassword)

    
    alert('your new password has been validated')
    }catch(error) {
        alert(error.message)
    }
    
    homeProfileEditPasswordForm.reset()
    homeProfileEdit.querySelector('.profile-edit-password').classList.add('off')
}

console.log('load main') 

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






import { show, hide, toggle} from './ui.mjs'
import { registerUser, authenticateUser, retrieveUser, updateUserAvatar, validatedNewPassword } from './logic.mjs'

const registerPage= document.querySelector('.register')
const registerForm = registerPage.querySelector('form')

const loginPage= document.querySelector('.login')
const loginForm= loginPage.querySelector('form')

const homePage= document.querySelector('.home')
let authenticadedUserId  

const homeMenu = homePage.querySelector('.home-header').querySelector('.home-menu')
const myProfileLink = homeMenu.querySelector('.myProfile')

const homeProfileEdit = homePage.querySelector('.profile-edit') 
const homeProfileEditAvatarForm= homeProfileEdit.querySelector('.profile-edit-avatar-form')
const homeProfileEditPasswordForm = homePage.querySelector('.profile-edit-password-form')


//REGISTER PAGE

// capture datas Register form
registerForm.onsubmit = function(event) {
    event.preventDefault()

    const name = event.target.name.value
    const email = event.target.email.value
    const password = event.target.password.value

    try{
        registerUser(name,email,password)
        
        registerForm.reset()
        hide(registerPage)
        show(loginPage)

    } catch (error) {
        alert(error.message)
    }
}

// LOGIN PAGE

//capture datas Login form
loginForm.onsubmit = function (event) {
    event.preventDefault()

    const email = event.target.email.value
    const password = event.target.password.value
    
    try{
        authenticadedUserId = authenticateUser(email,password)
        
        const user = retrieveUser(authenticadedUserId)

        myProfileLink.innerText = `${user.name}`

        if(user.avatar){
            homeMenu.querySelector('.home-header-avatar').src = user.avatar
        }


        loginForm.reset()

        hide (loginPage)
        show(homePage)

        
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
    hide(registerPage)
    show(loginPage)
}

//HOME PAGE

//Menu my Profile
// configurate home--button myprofile--con anchor

homeMenu.querySelector('.myProfile').onclick = function(event){
    event.preventDefault()

   show(homeProfileEdit)
}



//configurate home--button--update avatar --con anchor

homeProfileEdit.querySelector('.updateAvatar').onclick = function(event){
    event.preventDefault()
    show(homeProfileEdit.querySelector('.profile-edit-avatar-form'))
}


//configurate home--button--update password --con anchor

homeProfileEdit.querySelector('.updatePassword').onclick = function(event){
    event.preventDefault()

    show(homeProfileEdit.querySelector('.profile-edit-password'))
}



//configurate form to change avatar

homeProfileEditAvatarForm.onsubmit = function (event){
    event.preventDefault()

    const newAvatar = event.target.avatarUrl.value
    
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

    const password= event.target.password.value
    const userNewPassword = event.target.newPassword.value
    const userConfirmNewPassword = event.target.confirmNewPassword.value
    
    try{
        validatedNewPassword (authenticadedUserId , password, userNewPassword, userConfirmNewPassword)

    
    alert('your new password has been validated')
    }catch(error) {
        alert(error.message)
    }
    
    homeProfileEditPasswordForm.reset()
    hide(homeProfileEdit.querySelector('.profile-edit-password'))
}

console.log('load main') 

//home-header-Logout 

homePage.querySelector('.home-header').querySelector('.home-header-logout').querySelector('.logout').onclick = function(event) {
    event.preventDefault() 
    //no necesario al estar fuera de un formulario

    hide(homePage)
    hide(homeProfileEdit)
    hide(homeProfileEditAvatarForm)
    hide(homeProfileEditPasswordForm)
    show(loginPage)
}






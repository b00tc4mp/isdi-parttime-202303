console.log('load home-page')

import { show, hide, context } from "../ui.js"
import { loginPage } from "./login-page.js"
import { updateUserAvatar } from '../logic/update-user-avatar.js'
import { validatedNewPassword } from "../logic/validated-user-newpassword.js"
import createPost from "../logic/create-post.js"
import retrievePosts from "../logic/retrieve-posts.js"


export const DEFAULT_AVATAR_URL = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"

export const homePage= document.querySelector('.home')
export const homeMenu = homePage.querySelector('.home-header').querySelector('.home-menu')
export const myProfileLink = homeMenu.querySelector('.myProfile')
export const avatarImage =homeMenu.querySelector('.home-header-avatar')

const homeProfileEdit = homePage.querySelector('.profile-edit') 
const homeProfileEditAvatarForm= homeProfileEdit.querySelector('.profile-edit-avatar-form')
const homeProfileEditPasswordForm = homePage.querySelector('.profile-edit-password-form')

const addPostButton = homePage.querySelector('.add-post-button')
const addPostPanel = homePage.querySelector('.add-post')
const addPostForm = addPostPanel.querySelector('.add-post-form')

const postListPanel = homePage.querySelector('.post-list')

//HOME PAGE

//Menu my Profile
// configurate home--button myprofile--con anchor

myProfileLink.onclick = function(event){
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
        updateUserAvatar(context.userId , newAvatar)
       
        alert('your avatar has been updated')
        avatarImage.src = newAvatar

    }catch(error) {
        alert(error.message)
    }
    homeProfileEditAvatarForm.reset()
    hide(homeProfileEditAvatarForm)
}

//configurate form to change password (3 inputs)

homeProfileEditPasswordForm.onsubmit = function(event){
    event.preventDefault()

    const password= event.target.password.value
    const userNewPassword = event.target.newPassword.value
    const userConfirmNewPassword = event.target.confirmNewPassword.value
    
    try{
        validatedNewPassword (context.userId  , password, userNewPassword, userConfirmNewPassword)

    
    alert('your new password has been validated')
    }catch(error) {
        alert(error.message)
    }
    
    homeProfileEditPasswordForm.reset()
    hide(homeProfileEdit.querySelector('.profile-edit-password'))
}

// add post button

addPostButton.onclick = function(event){
    show(addPostPanel)
}

//create post / post form

addPostForm.onsubmit = function(event){
    event.preventDefault()

    const imageUrl = event.target.imageUrl.value
    const text = event.target.text.value
    

    try{
        createPost(context.userId, imageUrl, text)

        alert('your post has been created')
    }catch(error) {
        alert(error.message)
    }
    addPostForm.reset()
    renderPosts()
    hide(addPostPanel)
}

//button cancel post

addPostForm.querySelector('.cancel').onclick = function(event){
    preventDefault()

    addPostForm(reset)
    hide(addPostPanel)
}

//home-header-Logout 

homePage.querySelector('.home-header').querySelector('.home-header-logout').querySelector('.logout').onclick = function(event) {
    event.preventDefault() //no sería necesario al estar fuera de un formulario, podriamos omitirlo

    context.userId = null
    avatarImage.src = DEFAULT_AVATAR_URL
    
    hide(homePage, homeProfileEdit, homeProfileEditAvatarForm, homeProfileEditPasswordForm)
    show(loginPage)
}

export function renderUser() {
    //mantenemos el usuario, su nombre y su avatar en session storage
    try{
        const user = retrieveUser(context.userId)

        myProfileLink.innerText = user.name

        avatarImage.src = user.avatar? user.avatar : DEFAULT_AVATAR_URL

        return true
    }catch(error){
        alert(error.message)

        return false
    }
}

export function renderPosts() {
    
    try{
        const posts = retrievePosts(context.userId)
        
        /*
        //forma imperativa 

        //vaciar el panel antes de pintar de nuevo todos los posts
        postListPanel.innerHTML = '' 
        posts.forEach(post => {
            const postItem =document.createElement('article')

            const image = document.createElement('img')
            image.src = post.image

            const text = document.createElement('p')
            text.innerText = post.text

            const date= document.createElement('time')
            date.innerText = post.date().toLocaleString()

            postItem.append(image, text)

            postListPanel.appendChild(postItem)

        });
        */

        //forma declarativa
        postListPanel.innerHTML = posts.reduce((accum, post) => {
            return accum + `<article>
                <img src="${post.image}"> 
                <p>${post.text}</p>
                <time>${post.date.toLocaleString()}</time>
            </article>`
        }, '')

    }catch(error){
    alert(error.message)
    }
}
 
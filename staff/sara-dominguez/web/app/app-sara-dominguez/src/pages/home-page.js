console.log('load home-page')

import { show, hide, context } from "../ui.js"
import { loginPage } from "./login-page.js"
import { updateUserAvatar } from '../logic/update-user-avatar.js'
import { validatedNewPassword } from "../logic/validated-user-newpassword.js"
import createPost from "../logic/create-post.js"
import retrievePosts from "../logic/retrieve-posts.js"
import retrieveUser from "../logic/retrieve-user.js"
import {updatePost} from "../logic/update-post.js"

const DEFAULT_AVATAR_URL = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"

export const homePage= document.querySelector('.home')
export const homeMenu = homePage.querySelector('.home-header').querySelector('.home-menu')
const myProfileLink = homeMenu.querySelector('.myProfile')
const avatarImage =homeMenu.querySelector('.home-header-avatar')

const homeProfileEdit = homePage.querySelector('.profile-edit') 
const homeProfileEditAvatarForm= homeProfileEdit.querySelector('.profile-edit-avatar-form')
const homeProfileEditPasswordForm = homePage.querySelector('.profile-edit-password-form')

const addPostPanel = homePage.querySelector('.add-post')
const addPostForm = addPostPanel.querySelector('.add-post-form')
const addPostButton = homePage.querySelector('.add-post-button')

const editPostPanel = homePage.querySelector('.edit-post')
const editPostForm = editPostPanel.querySelector('.edit-post-form')
//edit button no existe como tal, está en cada uno de mis posts. Con Javascript no puedo ponerle un onclick a un elemento creado de forma declarativa. Hay que declararlo imperativamente si o si. Con Reac si podriamos.


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

//button cancel post (add post)

addPostForm.querySelector('.cancel').onclick = function(event){
    event.preventDefault()

    addPostForm.reset()
    hide(addPostPanel)
}

//edit post (update post) / post form

editPostForm.onsubmit = function(event){
    event.preventDefault()

    const postId= event.target.postId.value
    const imageUrl = event.target.imageUrl.value
    const text = event.target.text.value
    
    try{
        updatePost(context.userId, postId, imageUrl, text)

        alert('your post has been updated')
    }catch(error) {
        alert(error.message)
    }
    renderPosts()
    hide(editPostPanel)
}

//button cancel post (update post)

editPostForm.querySelector('.cancel').onclick = function(event){
    event.preventDefault()

    editPostForm.reset()
    hide(editPostPanel)
}


//home-header-Logout 

homePage.querySelector('.logout').onclick = function (event) {
    event.preventDefault()
    delete context.userId
    avatarImage.src = DEFAULT_AVATAR_URL
    
    hide(homePage, homeProfileEdit, homeProfileEditAvatarForm, homeProfileEditPasswordForm)
    show(loginPage)
}

export function renderPosts() {
    
    try{
        const posts = retrievePosts(context.userId)
        
        
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
            date.innerText = post.date.toLocaleString()

            if(post.author === context.userId) {
                const button = document.createElement('button')
                button.innerText = 'Edit'

                // TODO add onclick listener
                button.onclick = () =>{
                    editPostForm.querySelector('input[type=hidden]').value = post.id
                    editPostForm.querySelector('input[type=url]').value = post.image
                    editPostForm.querySelector('textarea').value = post.text

                    show (editPostPanel)
                }


                postItem.append(image, text, date, button)

            }else{

                postItem.append(image, text, date)
            }

            postListPanel.appendChild(postItem)

        });
        

        /*//forma declarativa
        postListPanel.innerHTML = posts.reduce((accum, post) => {
            return accum + `<article>
                <img src="${post.image}"> 
                <p>${post.text}</p>
                <time>${post.date.toLocaleString()}</time>
                ${post.author === context.userId ? '<button>Edit</button>' : ' '}
            </article>`
        }, '')*/

        return true
    }catch(error){
    alert(error.message)
    return false
    }
}
 
export function renderUser() {
    //mantenemos el usuario, su nombre y su avatar en session storage
    try{
        const user = retrieveUser(context.userId)

        myProfileLink.innerText = user.name

        avatarImage.src = user.avatar ? user.avatar : DEFAULT_AVATAR_URL

        return true
    }catch(error){
        alert(error.message)


        return false
    }
}

console.log('load home-page')

import { show, hide, context } from "../ui.js"
import { loginPage } from "./login.js"
import retrievePosts from "../logic/retrieve-posts.js"
import retrieveUser from "../logic/retrieve-user.js"
import initProfilePanel from "../components/profile-edit-panel.js"
import initAddPostPanel from "../components/add-post-panel.js"
import initEditPostPanel from "../components/edit-post-panel.js"
import toggleLikePost from "../logic/toogle-like-post.js"

const DEFAULT_AVATAR_URL = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"

export const homePage= document.querySelector('.home')
export const homeMenu = homePage.querySelector('.home-header').querySelector('.home-menu')
const myProfileLink = homeMenu.querySelector('.myProfile')
export const avatarImage =homeMenu.querySelector('.home-header-avatar')

const {homeProfileEdit, homeProfileEditAvatarForm, homeProfileEditPasswordForm} = initProfilePanel(homePage, avatarImage)
initAddPostPanel(homePage, renderPosts)
const {editPostPanel, editPostForm} = initEditPostPanel (homePage, renderPosts)

const postListPanel = homePage.querySelector('.post-list')


//HOME PAGE

//Menu my Profile
// configurate home--button myprofile--con anchor

myProfileLink.onclick = function(event){
    event.preventDefault()

   show(homeProfileEdit)
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

            const likeButton = document.createElement('button')
            const countLikes = post.likes && post.likes.length || 0
            likeButton.innerText = post.likes && post.likes.includes(context.userId) ? `❤️ ${countLikes}` : '🤍'

            likeButton.onclick = () =>{
                try {
                    toggleLikePost(context.userId, post.id)
                    renderPosts()
                }catch(error){
                    alert(error.message)
                }
            }
            postItem.appendChild(likeButton)
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

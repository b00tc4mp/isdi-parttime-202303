console.log('load home page')

import {showElement, hideElement, toggleElement, resetPage, context} from '../ui.js'
import { updateUserAvatar } from '../logic/update-user-avatar.js'
import { changeEmail } from '../logic/update-user-email.js'
import { changePassword } from '../logic/update-user-password.js'
import { loginPage } from './login-page.js'
import createPost from '../logic/create-post.js'
import { posts, savePosts, saveUsers } from '../data.js'
import retrievePosts from '../logic/retrieve-posts.js'
import { retrieveUser } from '../logic/retrieve-user.js'
import { findUserById } from '../logic/helpers/data-managers.js'
import editPost from '../logic/edit-post.js'

export const homePage = document.querySelector('.home-page')
const horizontalMenu = document.querySelector('.horizontal-menu')
const myProfileButton = horizontalMenu.querySelector('li[name=my-profile]')

const newPostButton = horizontalMenu.querySelector('li[name=new-post]')
const newPostModal = homePage.querySelector('section[name=modal-new-post]')
const cancelModal = newPostModal.querySelector('.cancel-post')
const postListPanel = homePage.querySelector('.post-list')

// TODO VER BOTON EDICION DE POST const editPostButton = 
const editPostModal = homePage.querySelector('section[name=modal-edit-post]')
const cancelEdition = homePage.querySelector('.cancel-edition')


const profileOptionsModal = homePage.querySelector('section[name=modal-profile-options]')
export const changeEmailMenu = homePage.querySelector('section[name=modal-change-email]')
const changePasswordMenu = homePage.querySelector('section[name=modal-change-password]')
const closeProfileOptions = homePage.querySelector('.close-profile-options')

const changeAvatarMenu = homePage.querySelector('section[name=modal-change-avatar]')
const changeAvatarButton = homePage.querySelector('.change-avatar')
const changeAvatarForm = homePage.querySelector('.change-avatar-menu').querySelector('form')
export const avatarImg = homePage.querySelector('.horizontal-menu').querySelector('.user-avatar')
const DEFAULT_AVATAR_URL = 'https://avatarfiles.alphacoders.com/157/thumb-157567.jpg'

newPostButton.onclick = () => {
    showElement(newPostModal)
}

cancelModal.onclick = () => {
    hideElement(newPostModal)
}

newPostModal.querySelector('form').onsubmit = (event) => {
    event.preventDefault()
    const image = newPostModal.querySelector('[name=url]').value
    const text = newPostModal.querySelector('[name=text]').value
    
    try {
        createPost(context.userId, image, text)

        newPostModal.querySelector('form').reset()

        hideElement(newPostModal)

        alert('post created')

        savePosts()

        renderPosts()
    } catch(error){
            alert(error.message)
            console.log(error)
    }
}

cancelEdition.onclick = () => {
    hideElement(editPostModal)
}

// editPostModal.querySelector('form').onsubmit = (event) => {
//     event.preventDefault()
//     const image = editPostModal.querySelector('[name=url]').value
//     const text = editPostModal.querySelector('[name=text]').value
    
//     try {
//         const postId = renderPosts()
//         console.log(postId)
//         // editPost(context.userId, postId, image, text) FALTA ESTA LOGICA
        
//         editPostModal.querySelector('form').reset()
        
//         hideElement(editPostModal)
        
//         alert('Post updated')
        
//         savePosts()
//     } catch(error){
//             alert(error.message)
//             console.log(error)
//     }
// }

myProfileButton.addEventListener('click', () => {
    toggleElement(profileOptionsModal)
    resetPage(changeAvatarMenu, changePasswordMenu, changeEmailMenu)
})

homePage.querySelector('.change-email').onclick = () => {
    hideElement(profileOptionsModal)
    showElement(changeEmailMenu)
}

changeEmailMenu.querySelector('form').onsubmit = (event) => {
    event.preventDefault()
    try {
        changeEmail(context.userId, homePage, changeEmailMenu)
        saveUsers()
    } catch(error){
        if(error.cause === 'ownError'){
            changeEmailMenu.querySelector('.red-text').textContent = error.message
        } else {
            console.log(error)
        }
    }
}

homePage.querySelector('.cancel-email-change').onclick = () => {
    hideElement(changeEmailMenu) //TODO: VER SI HAY QUE LIMPIAR
}

homePage.querySelector('.change-password').addEventListener('click', () => { 
    resetPage(changePasswordMenu)
    hideElement(profileOptionsModal)
    showElement(changePasswordMenu)
})

changePasswordMenu.querySelector('form').onsubmit = function(event) { 
    event.preventDefault();
    try {
        changePassword(context.userId, changePasswordMenu)
        saveUsers()
    } catch(error){
        if(error.cause === 'ownError'){
            changePasswordMenu.querySelector('.red-text').textContent = error.message
        } else {
            console.log(error)
        }
    }
}

homePage.querySelector('.cancel-password-change').onclick = () => {
    hideElement(changePasswordMenu)
}

changeAvatarButton.onclick = function() {
    showElement(changeAvatarMenu)
    hideElement(profileOptionsModal)
}

changeAvatarForm.onsubmit = function(event) {
    event.preventDefault()
    var avatarUrl = event.target.avatarurl.value

    try {
        updateUserAvatar(context.userId, avatarUrl, avatarImg)
        changeAvatarForm.reset()
        saveUsers()
    } catch(error){
        if(error.cause === 'ownError'){
            alert(error.message)
            // changePasswordMenu.querySelector('.red-text').textContent = error.message -> TODO: ACOMODAR!!!!
        } else {
            console.log(error)
        }
    }
}

homePage.querySelector('.cancel-avatar-change').onclick = () => {
    hideElement(changeAvatarMenu)
}

closeProfileOptions.onclick = function() {
    hideElement(profileOptionsModal) // TODO: VER SI HAY QUE LIMPIAR
}

export function renderUsers() {
    try{
        const user = retrieveUser(context.userId)
        
        // homePage.querySelector('span[name=authenticated-user-name]').textContent =`${user.name}`
        
        if(user.avatar)
        avatarImg.src = user.avatar
        
        return true
    } catch(error){
        alert(error.message)
        
        console.log(error)
        
        return false
    }
}

export function renderPosts() {
    try {
        const posts = retrievePosts(context.userId)
        
        postListPanel.innerHTML = ''

        posts.forEach(post => {
            const postItem = document.createElement('article')
            postItem.classList.add('post-container')

            const postImg = document.createElement('img')
            postImg.src = post.image

            const postCaption = document.createElement('p')
            postCaption.innerText = post.text

            const postFooter = document.createElement('div')

            const postFooterLeft = document.createElement('div')

            const postFooterLeftTime = document.createElement('time')
            postFooterLeftTime.innerText = post.date

            if(post.author === context.userId) {
                const postEditButton = document.createElement('button')
                postEditButton.classList.add('edit-button')
    
                const postEditButtonIcon = document.createElement('i')
                postEditButtonIcon.classList.add('uil')
                postEditButtonIcon.classList.add('uil-edit')
    
                postEditButton.append(postEditButtonIcon)

                const user = findUserById(post.author)
    
                postFooterLeft.append(postFooterLeftTime, ` by ${user.name}`)
    
                postFooter.append(postFooterLeft, postEditButton)
    
                postItem.append(postImg, postCaption, postFooter)
    
                postListPanel.appendChild(postItem)

                postEditButton.onclick = () => {
                    showElement(editPostModal)
                    
                    editPostModal.querySelector('input[name=url]').value = post.image
                    editPostModal.querySelector('textarea[name=text]').value = post.text

                    editPostModal.querySelector('form').onsubmit = (event) => {
                        event.preventDefault()
                        const image = editPostModal.querySelector('[name=url]').value
                        const text = editPostModal.querySelector('[name=text]').value
                        
                        try {
                            editPost(context.userId, post.id, image, text)
                            
                            editPostModal.querySelector('form').reset()
                            
                            hideElement(editPostModal)
                            
                            alert('Post updated')
                            
                            savePosts()

                            renderPosts()
                        } catch(error){
                                alert(error.message)
                                console.log(error)
                        }
                    }
                }
            } else {
                const user = findUserById(post.author)
    
                postFooterLeft.append(postFooterLeftTime, ` by ${user.name}`)
    
                postFooter.append(postFooterLeft)
    
                postItem.append(postImg, postCaption, postFooter)
    
                postListPanel.appendChild(postItem)
            }
        })

        return true
    } catch(error){
        alert(error.message)
        console.log(error)
        
        return false
    }
}

horizontalMenu.querySelector('li[name=logout]').addEventListener('click', () => {
    hideElement(homePage, changeAvatarMenu, changePasswordMenu, profileOptionsModal, changeEmailMenu, newPostModal)
    showElement(loginPage)
    avatarImg.src = DEFAULT_AVATAR_URL
    delete context.userId
})
console.log('load home page')

import {showElement, hideElement, toggleElement, resetPage, context} from '../ui.js'
import { loginPage } from './login-page.js'
import retrievePosts from '../logic/retrieve-posts.js'
import { retrieveUser } from '../logic/retrieve-user.js'
import { findPostById, findUserById } from '../logic/helpers/data-managers.js'
import editPost from '../logic/edit-post.js'
import initProfilePanel from '../components/profile-panel.js'
import initNewPostModal from '../components/add-post-panel.js'
import toggleLikePost from '../logic/toggle-like-post.js'

export const homePage = document.querySelector('.home-page')
const horizontalMenu = document.querySelector('.horizontal-menu')
const myProfileButton = horizontalMenu.querySelector('li[name=my-profile]')

const { profileOptionsModal, changeEmailMenu, changePasswordMenu, changeAvatarMenu, avatarImg, DEFAULT_AVATAR_URL } = initProfilePanel(homePage)
const { newPostModal } = initNewPostModal(homePage)

const newPostButton = horizontalMenu.querySelector('li[name=new-post]')
const postListPanel = homePage.querySelector('.post-list')

// TODO VER BOTON EDICION DE POST const editPostButton = 
const editPostModal = homePage.querySelector('section[name=modal-edit-post]')
const cancelEdition = homePage.querySelector('.cancel-edition')

newPostButton.onclick = () => {
    showElement(newPostModal)
}


cancelEdition.onclick = () => {
    hideElement(editPostModal)
}

editPostModal.querySelector('form').onsubmit = (event) => {
    event.preventDefault()
    const image = editPostModal.querySelector('input[name=url]').value
    const text = editPostModal.querySelector('textarea[name=text]').value
    const postId = editPostModal.querySelector('input[name=hidden]').value
    
    try {
        editPost(context.userId, postId, image, text)
        
        editPostModal.querySelector('form').reset()
        
        hideElement(editPostModal)
        
        alert('Post updated')

        renderPosts()
    } catch(error){
            alert(error.message)
            console.log(error)
    }
}

myProfileButton.addEventListener('click', () => {
    toggleElement(profileOptionsModal)
    resetPage(changeAvatarMenu, changePasswordMenu, changeEmailMenu)
})


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

            const postHeader = document.createElement('div')
            const user = findUserById(post.author)

            const avatar = document.createElement('img')
            avatar.src = user.avatar ? user.avatar : DEFAULT_AVATAR_URL
            avatar.classList.add('user-avatar')

            const name = document.createElement('p')
            name.classList.add('author-name')
            name.innerText = user.name

            const time = document.createElement('time')
            const date = post.date
            const day = date.getDate().toString().padStart(2, '0')
            const month = (date.getMonth() + 1).toString().padStart(2, '0')
            const year = date.getFullYear()
            time.innerText = `· ${day}/${month}/${year}`

            postHeader.append(avatar, name, time)
            postHeader.classList.add('post-header')

            const postImg = document.createElement('img')
            postImg.src = post.image

            const footer = document.createElement('div')

            const postCaption = document.createElement('p')
            postCaption.innerText = post.text
            
            const captionName = document.createElement('p')
            captionName.classList.add('author-name')
            captionName.innerText = user.name

            // const likesContainer = document.createElement('div')
            
            const likesCounter = document.createElement('p')
            likesCounter.classList.add('likes-counter')
            
            if((post.likedBy).length > 1) {
                likesCounter.innerText = `${(post.likedBy).length} likes`
            } else if((post.likedBy).length > 0){
                likesCounter.innerText = `${(post.likedBy).length} like`
            }
            
            const likeButton = document.createElement('button')
            likeButton.classList.add('like-button')
            
            const likeHeart = document.createElement('i')
            likeHeart.classList.add('uil')
            likeHeart.classList.add('uil-heart-sign')
            if(post.likedBy.includes(context.userId))
            likeHeart.classList.add('liked')
            
            likeButton.append(likeHeart)
            
            // likesContainer.append(likesCounter, likeButton)
            
            footer.append(captionName, postCaption)

            if(post.author === context.userId) {
                const postEditButton = document.createElement('button')
                postEditButton.classList.add('edit-button')
    
                const postEditButtonIcon = document.createElement('i')
                postEditButtonIcon.classList.add('uil')
                postEditButtonIcon.classList.add('uil-edit')
    
                postEditButton.append(postEditButtonIcon)

                postHeader.append(postEditButton)
    
                postItem.append(postHeader, postImg, likeButton, likesCounter, footer)
    
                postListPanel.appendChild(postItem)

                postEditButton.onclick = () => {
                    showElement(editPostModal)
                    
                    editPostModal.querySelector('input[name=hidden]').value = post.id
                    editPostModal.querySelector('input[name=url]').value = post.image
                    editPostModal.querySelector('textarea[name=text]').value = post.text
                }
            } else {
                postItem.append(postHeader, postImg, likeButton, likesCounter, footer)
    
                postListPanel.appendChild(postItem)
            }

            likeButton.onclick = () => {
                likeHeart.classList.toggle('liked')
                toggleLikePost(context.userId, post.id)
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
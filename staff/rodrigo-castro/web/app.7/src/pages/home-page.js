console.log('load home page')

import {showElement, hideElement, toggleElement, resetPage, context} from '../ui.js'
import { loginPage } from './login-page.js'
import retrievePosts from '../logic/retrieve-posts.js'
import { retrieveUser } from '../logic/retrieve-user.js'
import { findPostById, findUserById } from '../logic/helpers/data-managers.js'
import editPost from '../logic/edit-post.js'
import initProfilePanel from '../components/profile-panel.js'
import initNewPostModal from '../components/add-post-panel.js'
import { savePost } from '../data.js'

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

            const postImg = document.createElement('img')
            postImg.src = post.image

            const postCaptionAndLike = document.createElement('div')

            const postCaption = document.createElement('p')
            
            const postCaptionBold = document.createElement('b')
            postCaptionBold.innerText = post.text

            
            const likesContainer = document.createElement('div')
            
            const likesCounter = document.createElement('p')
            
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
            
            likesContainer.append(likesCounter, likeButton)
            
            postCaption.append(postCaptionBold)
            postCaptionAndLike.append(postCaption, likesContainer)
            
            const postFooter = document.createElement('div')

            const postFooterLeft = document.createElement('div')

            const postFooterLeftTime = document.createElement('time')

            const postDate = post.date //.toLocaleString('en-UK')

            const day = postDate.getDate().toString().padStart(2, '0')
            const month = (postDate.getMonth() + 1).toString().padStart(2, '0')
            const year = postDate.getFullYear()

            postFooterLeftTime.innerText = `${day}/${month}/${year}-`

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
    
                postItem.append(postImg, postCaptionAndLike, postFooter)
    
                postListPanel.appendChild(postItem)

                postEditButton.onclick = () => {
                    showElement(editPostModal)
                    
                    editPostModal.querySelector('input[name=hidden]').value = post.id
                    editPostModal.querySelector('input[name=url]').value = post.image
                    editPostModal.querySelector('textarea[name=text]').value = post.text
                }
            } else {
                const user = findUserById(post.author)
    
                postFooterLeft.append(postFooterLeftTime, ` by ${user.name}`)
    
                postFooter.append(postFooterLeft)
    
                postItem.append(postImg, postCaptionAndLike, postFooter)
    
                postListPanel.appendChild(postItem)
            }

            const foundUser = findUserById(context.userId)
            const foundPost = findPostById(post.id)

            likeButton.onclick = () => {
                likeHeart.classList.toggle('liked')

                if(!foundPost.likedBy.includes(foundUser.id)){
                    foundPost.likedBy.push(foundUser.id)
                    savePost(foundPost)
                    return renderPosts()
                } else {
                    const index = foundPost.likedBy.indexOf(foundUser.id)
                    foundPost.likedBy.splice(index, 1)
                    savePost(foundPost)
                    return renderPosts()
                }
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
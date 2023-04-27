console.log('load home-page')

import { context, show, hide } from '../ui.js'
import { loginPage } from './login-page.js'
import retrievePosts from '../logic/retrieve-posts.js'
import retrieveUser from '../logic/retrieve-user.js'
import updatePost from '../logic/update-post.js'
import initProfilePanel from '../components/profile-panel.js'
import initAddPostPanel from '../components/add-post-panel.js'
import toggleLikePost from '../logic/toggle-like-post.js'

const DEFAULT_AVATAR_URL = 'https://img.icons8.com/color/512/avatar.png'

export const homePage = document.querySelector('.home')
const avatarImage = homePage.querySelector('.home-header-avatar')
const profileLink = homePage.querySelector('a')
const addPostButton = homePage.querySelector('.add-post-button')

const profilePanel = initProfilePanel(homePage, avatarImage)
const addPostPanel = initAddPostPanel(homePage, renderPosts)

const postListPanel = homePage.querySelector('.post-list')

const editPostPanel = homePage.querySelector('.edit-post')
const editPostForm = editPostPanel.querySelector('form')

profileLink.onclick = function (event) {
    event.preventDefault()

    show(profilePanel)
}

homePage.querySelector('.home-header-logout').onclick = function () {
    delete context.userId
    avatarImage.src = DEFAULT_AVATAR_URL

    hide(homePage, profilePanel)
    show(loginPage)
}

addPostButton.onclick = () => show(addPostPanel)

editPostForm.onsubmit = event => {
    event.preventDefault()

    const postId = event.target.postId.value
    const image = event.target.image.value
    const text = event.target.text.value

    try {
        updatePost(context.userId, postId, image, text)

        hide(editPostPanel)

        renderPosts()
    } catch (error) {
        alert(error.message)
    }
}

editPostForm.querySelector('.cancel').onclick = event => {
    event.preventDefault()

    editPostForm.reset()

    hide(editPostPanel)
}

export function renderPosts() {
    try {
        const posts = retrievePosts(context.userId)

        postListPanel.innerHTML = ''

        posts.forEach(post => {
            const postItem = document.createElement('article')

            const image = document.createElement('img')
            image.src = post.image

            const text = document.createElement('p')
            text.innerText = post.text

            const date = document.createElement('time')
            date.innerText = post.date.toLocaleString()

            if (post.author === context.userId) {
                const button = document.createElement('button')
                button.innerText = 'Edit'

                button.onclick = () => {
                    editPostForm.querySelector('input[type=hidden]').value = post.id
                    editPostForm.querySelector('input[type=url]').value = post.image
                    editPostForm.querySelector('textarea').value = post.text

                    show(editPostPanel)
                }

                postItem.append(image, text, date, button)
            } else {
                postItem.append(image, text, date)
            }

            const likeButton = document.createElement('button')
            const countLikes = post.likes && post.likes.length || 0
            likeButton.innerText = post.likes && post.likes.includes(context.userId) ? `❤️ (${countLikes})` : `🤍 (${countLikes})`
            
            likeButton.onclick = () => {
                try {
                    toggleLikePost(context.userId, post.id)

                    renderPosts()
                } catch(error) {
                    alert(error.message)
                }
            }

            postItem.appendChild(likeButton)

            postListPanel.appendChild(postItem)
        })

        return true
    } catch (error) {
        alert(error.message)

        return false
    }
}

export function renderUser() {
    try {
        const user = retrieveUser(context.userId)

        profileLink.innerText = user.name

        avatarImage.src = user.avatar ? user.avatar : DEFAULT_AVATAR_URL

        return true
    } catch (error) {
        alert(error.message)

        return false
    }
}
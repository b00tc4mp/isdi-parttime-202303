import { homePage } from "../../pages/home-page.js";
import {loginPage} from "../../pages/login-page.js";
import { posts, users } from '../../data.js'
import { cutText} from '../../components/helpers/max-characters.js'
import {returnUserImage } from "../users/get-user-image.js";
import { findUserById } from "../helpers/data-managers.js"
import { renderAllUserLikedPost } from "../../components/helpers/render-users-liked-post.js";
import { savePostToFavorites, userLikedPost } from "./posts-data.js";
import { showEditPost } from "../../components/helpers/edit-post-panel.js";
import { renderEntirePost } from "../../components/helpers/render-entire-post.js";
import { validateId } from "../helpers/validators.js";
import { context, deleteClassOnContainer, addClassOnContainer } from "../../ui.js";
export function renderPosts(userId) {
    validateId(userId)
    if (!context.userId) {
        throw new Error('Not logged In')
    }

    deleteClassOnContainer(homePage, 'off')
    addClassOnContainer(loginPage, 'off')

    const _posts = posts()
    const _users = users()
    const existentArticleElement = homePage.querySelector('.posts')
    existentArticleElement.innerHTML = ''
    if( _posts.length >= 1) {
        let recentPostsFirst = _posts.toReversed()
        recentPostsFirst.forEach(article => {
            try {
                const date = article.date
                const currentUser = findUserById(userId)
                const authorID = _users.find(user => user.id === article.author).id
                const postId = article.id
                const postsList = existentArticleElement
                const postContainer = document.createElement('article')
                postContainer.classList.add(postId)
                postContainer.setAttribute('style', `background:  linear-gradient(180deg, rgba(0,0,0,.2) 0%, rgba(0,0,0,0) 10%, rgba(0,0,0,0) 50%, rgba(0,0,0,.6) 100%),  url(${article.image}) center / cover`)
                postsList.appendChild(postContainer)
                returnUserImage(postContainer, article.author, 'userName')
                const postAuthor = postContainer.querySelector('.post-author')
                const spaceImage = document.createElement('div')
                spaceImage.classList.add('space-image')
                postContainer.appendChild(spaceImage)
                const titleAndInteractions = document.createElement('div')
                titleAndInteractions.classList.add('title-and-interactions')
                postContainer.appendChild(titleAndInteractions)
                const totalPostLikes = document.createElement('div')
                const postTitle = document.createElement('h3')
                postTitle.classList.add('title')
                postContainer.appendChild(postTitle)
                postTitle.innerText = article.title
                
                const postExcerpt = document.createElement('p')
                postExcerpt.classList.add('excerpt')
                postContainer.appendChild(postExcerpt)
                postExcerpt.innerText = cutText(article.text, 35)
                
                postContainer.appendChild(totalPostLikes)
                
                const totalCommentsPost = document.createElement('div')
                totalCommentsPost.classList.add('comments-count')

                postContainer.appendChild(totalCommentsPost)
        


                if (article.likes.length === 1) {
                    totalPostLikes.innerText = article.likes.length + ' like'
                }
                if (article.likes.length > 1) {
                    totalPostLikes.innerText = article.likes.length + ' likes'
                }

                if (article.comments.length === 1) {
                    totalCommentsPost.innerText = article.comments.length + ' comment'
                }
                if (article.comments.length > 1) {
                    totalCommentsPost.innerText = article.comments.length + ' comments'
                }

                const likePost = document.createElement('div')
                likePost.classList.add('material-symbols-outlined')
                const favoritePost = document.createElement('div')
                favoritePost.classList.add('material-symbols-outlined')
                likePost.classList.add('like')
                totalPostLikes.classList.add('total-likes-post')
                titleAndInteractions.appendChild(likePost)
                likePost.innerText = 'favorite'



                const commentPost = document.createElement('div')
                commentPost.classList.add('material-symbols-outlined')
                commentPost.classList.add('comment')
                commentPost.innerText = 'maps_ugc'
                titleAndInteractions.appendChild(commentPost)
        

                favoritePost.classList.add('save')
                titleAndInteractions.appendChild(favoritePost)
                favoritePost.innerText = 'bookmark'
                const isLikedPost = article.likes.find(user => user === userId)
                const findFavPost = currentUser.likedPosts.find(post => post === article.id)

                if(isLikedPost === userId) {
                    likePost.classList.add('filled')
                }
                if(findFavPost === article.id) {
                    favoritePost.classList.add('filled')
                }
                for(let i = 0; i < article.likes.length; i++) {
                    if(i < 6) {
                        const userId = article.likes[i]
                        const usersLikedPost = document.createElement('div')
                        usersLikedPost.classList.add('users-liked-post')
                        totalPostLikes.appendChild(usersLikedPost)
                        returnUserImage(usersLikedPost, userId)
                    }
                }
                totalPostLikes.onclick = () => renderAllUserLikedPost(postContainer, article)
                favoritePost.onclick = () => savePostToFavorites(article, favoritePost, userId)
                likePost.onclick = () => userLikedPost(userId, article, likePost, totalPostLikes)
                console.log(userId)
                spaceImage.onclick = () => {
                    renderEntirePost(article, existentArticleElement, userId)
                    document.body.classList.add('block-scroll')
                }
                commentPost.onclick = () => {
                    renderEntirePost(article, existentArticleElement, userId)
                    document.body.classList.add('block-scroll')
                }
                const postDate = document.createElement('time')
                postDate.classList.add('post-date')
                postContainer.appendChild(postDate)
                postDate.innerText = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

                if(article.lastModify) {
                    const isEdited = document.createElement('div')
                    isEdited.classList.add('post-edited')
                    isEdited.innerText = '(Edited)'
                    postDate.appendChild(isEdited)
                }
                if(userId === authorID) {
                    const editButton = document.createElement('button')
                    const editButtonIcon = document.createElement('i')
                    editButtonIcon.classList.add('uil-pen')
                    editButtonIcon.classList.add('uil')
                    editButton.classList.add('edit')
                    editButton.classList.add(postId)
                    editButton.innerText = 'edit'
                    postAuthor.appendChild(editButton)
                    editButton.appendChild(editButtonIcon)
                    editButton.onclick = (event) => showEditPost(article.id, homePage, posts)
                }
            } catch (error) {
                console.log(error.message)
                console.log(error.stack)
            }
        })
    }
}
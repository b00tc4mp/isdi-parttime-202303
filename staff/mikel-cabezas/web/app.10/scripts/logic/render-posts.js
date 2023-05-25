import { homePage } from "../pages/home-page.js";
import {loginPage} from "../pages/login-page.js";
import { posts, users } from '../data.js'
import { cutText} from './max-characters.js'
import { deleteClassOnContainer, addClassOnContainer } from "../ui.js";
import {returnUserImage } from "./helpers/get-user-image.js";
import { findUserById } from "./helpers/data-managers.js"
import { renderAllUserLikedPost } from "../components/posts/render-users-liked-post.js";
import { imageToBase64 } from "../localImagesBase64.js";
import { savePostToFavorites, userLikedPost } from "./posts/posts-data.js";
import { showEditPost } from "../components/posts/edit-post.js";

export function renderPosts(userId) {
    deleteClassOnContainer(homePage, 'off')
    addClassOnContainer(loginPage, 'off')
    const existentArticleElement = homePage.querySelector('.posts')
    existentArticleElement.innerHTML = ''
    if( posts.length >= 1) {
        let recentPostsFirst = posts.toReversed()
        recentPostsFirst.forEach(article => {
            try {
                const date = article.date
                const currentUser = findUserById(userId)
                const authorID = users.find(user => user.id === article.author).id
                const postId = article.id
                const postsList = existentArticleElement
                const postContainer = document.createElement('article')

                postContainer.classList.add(postId)
                postsList.appendChild(postContainer)

                returnUserImage(postContainer, article.author, 'userName')
                const postAuthor = postContainer.querySelector('.post-author')
                const postImage = document.createElement('img')
                postContainer.appendChild(postImage)
                postImage.src = article.image

                const titleAndInteractions = document.createElement('div')
                titleAndInteractions.classList.add('title-and-interactions')
                postContainer.appendChild(titleAndInteractions)
                const totalLikesPost = document.createElement('div')
                
                const postTitle = document.createElement('h3')
                postTitle.classList.add('title')
                postContainer.appendChild(postTitle)
                postContainer.appendChild(totalLikesPost)
                postTitle.innerText = article.title
                
                if (article.likes.length === 1) {
                    totalLikesPost.innerText = article.likes.length + ' like'
                }
                if (article.likes.length > 1) {
                    totalLikesPost.innerText = article.likes.length + ' likes'
                }

                const likePost = document.createElement('div')
                likePost.classList.add('material-symbols-outlined')

                const favoritePost = document.createElement('div')
                favoritePost.classList.add('material-symbols-outlined')

                likePost.classList.add('like')
                totalLikesPost.classList.add('total-likes-post')
                titleAndInteractions.appendChild(likePost)
                likePost.innerText = 'favorite'

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
                        totalLikesPost.appendChild(usersLikedPost)
                        returnUserImage(usersLikedPost, userId)
                    }
                }
                totalLikesPost.onclick = () => renderAllUserLikedPost(postContainer, article)
                favoritePost.onclick = () => savePostToFavorites(article, favoritePost, userId)
                likePost.onclick = () => userLikedPost(userId, article, likePost, totalLikesPost)

                const postExcerpt = document.createElement('p')
                postExcerpt.classList.add('excerpt')
                postContainer.appendChild(postExcerpt)
                postExcerpt.innerText = cutText(article.text, 35)

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
                    editButton.onclick = (event) => showEditPost(event, homePage, posts)
                }
            } catch (error) {
                console.log(error.message)
            }
        })
    }
}
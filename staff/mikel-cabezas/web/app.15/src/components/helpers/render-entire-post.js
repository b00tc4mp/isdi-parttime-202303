import { returnUserImage } from "../../logic/users/get-user-image"
import { posts, users } from '../../data.js'
// import { homePage } from "../../pages/_home-page.js"
import { userLikedPost, savePostToFavorites } from "../../logic/posts/posts-data.js"
import { cutText } from "./max-characters.js"
import renderComments from "./render-comments.js"
import createNewComment from "../../logic/posts/create-post-comment"

export function renderEntirePost(articleId, containerToRender, userId) {
    // const _posts = posts()
    const _users = users()
    validatePost(articleId)
    try {
        const postsContainer = homePage.querySelector('.posts')
        const article = articleId

        const singlePostContainer = document.createElement('div')
        singlePostContainer.classList.add('overlay')
        singlePostContainer.classList.add(`single-post`)
        postsContainer.appendChild(singlePostContainer)
       
        const date = article.date
        const authorID = _users.find(user => user.id === article.author).id
        const postId = article.id
        const postsList = singlePostContainer
        const postContainer = document.createElement('article')
        postContainer.classList.add(postId)
        postContainer.classList.add('single')
        postContainer.classList.add('post')
        postsList.appendChild(postContainer)

        const closeButton = document.createElement('div')
        closeButton.classList.add(`material-symbols-outlined`)
        closeButton.classList.add(`close`)
        closeButton.innerText = 'close'
        postContainer.appendChild(closeButton)
        
        const postImageContainer = document.createElement('div')
        postImageContainer.classList.add('post-image-container')
        postContainer.appendChild(postImageContainer)

        const postImage = document.createElement('img')
        postImageContainer.appendChild(postImage)
        postImage.src = article.image

        const postInfoContainer = document.createElement('div')
        postInfoContainer.classList.add('post-info-container')
        postContainer.appendChild(postInfoContainer)
        returnUserImage(postInfoContainer, article.author, 'userName')
        const postAuthor = postInfoContainer.querySelector('.post-author')

        const postTitle = document.createElement('h3')
        postTitle.classList.add('title')
        postInfoContainer.appendChild(postTitle)
        postTitle.innerText = article.title

        const favoritePost = document.createElement('div')
        favoritePost.classList.add('material-symbols-outlined')
        const findFavPost = _users.find(user => user.likedPosts === article.id)
        if(findFavPost === article.id) {
            favoritePost.classList.add('filled')
        }
        
        const postExcerpt = document.createElement('p')
        postExcerpt.classList.add('excerpt')
        postInfoContainer.appendChild(postExcerpt)
        postExcerpt.innerText = cutText(article.text, 35)
        const postDate = document.createElement('time')
        postDate.classList.add('post-date')
        postInfoContainer.appendChild(postDate)
        postDate.innerText = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

        const totalLikesPost = document.createElement('div')
        const totalCommentsPost = document.createElement('div')

        postInfoContainer.appendChild(totalLikesPost)
        postInfoContainer.appendChild(totalCommentsPost)
        
        if (article.likes.length === 1) 
            totalLikesPost.innerText = article.likes.length + ' like'
        if (article.likes.length > 1) 
            totalLikesPost.innerText = article.likes.length + ' likes'
        if (article.comments.length === 1) 
            totalCommentsPost.innerText = article.comments.length + ' comment'
        if (article.comments.length > 1) 
            totalCommentsPost.innerText = article.comments.length + ' comments'

        const likePost = document.createElement('div')
        likePost.classList.add('material-symbols-outlined')
        likePost.classList.add('like')
        totalLikesPost.classList.add('total-likes-post')

        const commentsContainer = document.createElement('div')
        commentsContainer.classList.add('comments-container')
        postInfoContainer.appendChild(commentsContainer)

        renderComments(article, commentsContainer )

        const titleAndInteractions = document.createElement('div')
        titleAndInteractions.classList.add('title-and-interactions')
        postInfoContainer.appendChild(titleAndInteractions)
        
        titleAndInteractions.appendChild(likePost)
        likePost.innerText = 'favorite'
        favoritePost.classList.add('save')
        titleAndInteractions.appendChild(favoritePost)
        favoritePost.innerText = 'bookmark'

        const isLikedPost = article.likes.find(user => user === userId)

        if(isLikedPost === userId) 
            likePost.classList.add('filled')

        for(let i = 0; i < article.likes.length; i++) {
            if(i < 6) {
                const userId = article.likes[i]
                const usersLikedPost = document.createElement('div')
                usersLikedPost.classList.add('users-liked-post')
                totalLikesPost.appendChild(usersLikedPost)
                returnUserImage(usersLikedPost, userId)
            }
        }

        const newCommentContainer = document.createElement('div')
        newCommentContainer.classList.add('new-comment-container')
        postInfoContainer.appendChild(newCommentContainer)

        const newCommentForm = document.createElement('form')
        newCommentForm.classList.add('new-comment-form')
        newCommentContainer.appendChild(newCommentForm)

        const newCommentInput = document.createElement('input')
        newCommentInput.setAttribute('type', 'text')
        newCommentInput.setAttribute('name', 'comment')
        newCommentForm.appendChild(newCommentInput)

        const newCommentSubmit = document.createElement('button')
        newCommentSubmit.setAttribute('type', 'submit')
        newCommentSubmit.setAttribute('name', 'post-comment')
        newCommentSubmit.innerText = 'Post'
        newCommentForm.appendChild(newCommentSubmit)

        newCommentSubmit.onclick = (event) => {
            event.preventDefault()
            console.log(newCommentInput.value)
            createNewComment (article, userId, newCommentForm, newCommentInput.value)
            newCommentForm.reset()
            renderComments(article, commentsContainer)
        }

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
        totalLikesPost.onclick = () => renderAllUserLikedPost(postInfoContainer, article)
        favoritePost.onclick = () => savePostToFavorites(article, favoritePost, userId)
        likePost.onclick = () => userLikedPost(userId, article, likePost, totalLikesPost)
        closeButton.onclick = () => {
            singlePostContainer.remove()
            document.body.classList.remove('block-scroll')
        }
        window.onkeydown = (event) => {
            if(event.keyCode == 27){
               homePage.querySelector('.overlay.single-post').remove()
               document.body.classList.remove('block-scroll')
            }
        }
    } catch (error) {
        console.log(error.message)
        console.log(error.stack)
    }                 
}
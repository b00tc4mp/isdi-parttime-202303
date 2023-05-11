import { returnUserImage } from "../../logic/users/get-user-image"

export default function renderComments (article, commentsContainer) {
    commentsContainer.innerHTML = '' 
    article.comments.forEach(comment => {
        const singleCommentContainer = document.createElement('div')
        singleCommentContainer.classList.add('single-comment-container')
        commentsContainer.appendChild(singleCommentContainer)
        returnUserImage(singleCommentContainer, comment.user)

        const userComment = document.createElement('div')
        userComment.classList.add('user-comment')
        singleCommentContainer.appendChild(userComment)
        returnUserImage(userComment, comment.user, 'userName', 'hideUserImage')


        const textComment = document.createElement('div')
        textComment.classList.add('comment')
        userComment.appendChild(textComment)
        textComment.innerText = comment.comment
    })
}
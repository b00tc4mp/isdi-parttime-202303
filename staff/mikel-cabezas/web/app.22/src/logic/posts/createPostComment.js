import { savePost } from "../../data.js"

export default function createNewComment (article, userId, newCommentForm, newCommentInput) {
    article.comments.push({
        user: userId,
        comment: newCommentInput
    })
    savePost(article)
}
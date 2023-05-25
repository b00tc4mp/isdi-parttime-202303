import { context } from '../ui'
import toggleLikePost from '../logic/toggleLikePost'
import deletePost from '../logic/deletePost'

export default function Post({ post: { id, image, text, date, likes, author }, onEditPost, onToggledLikePost, onPostDeleted }) {
    console.log('Post -> render')

    const handleEditPost = () => onEditPost(id)

    const handleToggleLikePost = () => {
        try {
            toggleLikePost(context.userId, id)

            onToggledLikePost()
        } catch(error) {
            alert(error.message)
        }
    }

    const handleDeletePost = () => {
        try {
            deletePost(context.userId, id)

            onPostDeleted()
        } catch(error) {
            alert(error.message)
        }
    }

    return <article>
        <img src={image} width="200px" />
        <p>{text}</p>
        <time>{date.toLocaleString()}</time>
        <button onClick={handleToggleLikePost}>{likes && likes.includes(context.userId) ? '❤️' : '🤍'} ({likes ? likes.length : 0})</button>
        {author === context.userId && <button onClick={handleEditPost}>📝</button>}
        {author === context.userId && <button onClick={handleDeletePost}>🗑</button>}
    </article>
}
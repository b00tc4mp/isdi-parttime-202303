import { context } from '../ui'
import toggleLikePost from '../logic/toogleLikePost'
import deletePost from '../logic/deletePost'
import toggleFavPost from '../logic/toggleFavPost'

export default function Post({ post: { id, image, text, date, likes, author }, onEditPost, onToggledLikePost, onPostDeleted, onToggledSavePost, user: { favs } }) {
    const handleEditPost = () => onEditPost(id)

    const handleToggleLikePost = () => {
        try {
            toggleLikePost(context.userId, id)

            onToggledLikePost()
        } catch (error) {
            alert(error.message)
        }
    }

    const handleDeletePost = () => {
        try {
            deletePost(context.userId, id, error => {
                if (error) {
                    alert(error.message)

                    return
                }

                onPostDeleted()
            })
        } catch (error) {
            alert(error.message)
        }
    }

    const handleToggleSavePost = () => {
        try {
            toggleFavPost(context.userId, id, error => {
                if (error) {
                    alert(error.message)

                    return
                }

                onToggledSavePost()
            })
        } catch (error) {
            alert(error.message)
        }
    }

    console.log('Post -> render')

    return <article>
        <img src={image} width="200px" />
        <p>{text}</p>
        <time>{date.toLocaleString()}</time>
        <button onClick={handleToggleLikePost}>{likes.includes(context.userId) ? '❤️' : '🤍'} ({likes ? likes.length : 0})</button>
        {author === context.userId && <button onClick={handleEditPost}>📝</button>}
        {author === context.userId && <button onClick={handleDeletePost}>🗑</button>}
        <button onClick={handleToggleSavePost}>{favs.includes(id)? '⭐️' : '✩'}</button>
    </article>
}
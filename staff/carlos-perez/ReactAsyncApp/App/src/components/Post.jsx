import { context } from '../main'
import toggleLikePost from '../logic/toggleLikePost'
import deletePost from '../logic/deletePost'
import toggleFavPost from '../logic/toggleFavPost'
import { useContext } from 'react'
import Context from '../Context'

export default function Post({ post: { id, image, text, date, likes, author, fav }, onEditPost, onToggledLikePost, onPostDeleted, onToggledSavePost }) {
    console.log('Post -> render')
    const { alert } = useContext(Context)

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

    console.debug('Post -> render')

    return <article>
        <img src={image} width="200px" />
        <p>{text}</p>
        <time>{date.toLocaleString()}</time>
        <div className='article--buttons'>
        <button onClick={handleToggleLikePost}>{likes && likes.includes(context.userId) ? '❤️' : '🤍'} ({likes ? likes.length : 0})</button>
        {author === context.userId && <button onClick={handleEditPost}>📝</button>}
        {author === context.userId && <button onClick={handleDeletePost}>🗑</button>}
        <button onClick={handleToggleSavePost}>{fav ? '⭐️' : '✩'}</button>
        </div>
    </article>
}
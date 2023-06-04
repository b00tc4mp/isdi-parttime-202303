/* eslint-disable react/prop-types */
import { context } from '../ui'
import toggleLikePost from '../logic/toggleLikePost'
import toggleFavPost from '../logic/toggleFavPost'
import deletePost from '../logic/deletePost'
import './post.css'


export default function Post({ post: { id, image, text, date, likes, author, fav }, onEditPost, onToggledLikePost, onPostDeleted, onToggledSavePost}) {
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
            deletePost(context.userId, id)

            onPostDeleted()
        } catch (error) {
            alert(error.message)
        }
    }

    const handleToggleSavePost = () => {
        try {
            toggleFavPost(context.userId, id)

            onToggledSavePost()
        } catch (error) {
            alert(error.message)
        }
    }



    console.log('Post -> render')


    return <article>
        <img src={image} width="200px" />
        <p>{text}</p>
        <time>{date.toLocaleString()}</time>
        <div className='buttons-container'>
            <button onClick={handleToggleLikePost}>{likes && likes.includes(context.userId) ? '❤️' : '🤍'} ({likes ? likes.length : 0})</button>
            {author === context.userId && <button onClick={handleEditPost}>📝</button>}
            {author === context.userId && <button onClick={handleDeletePost}>🗑</button>}
            <button onClick={handleToggleSavePost}>{fav? '⭐️' : 'X'}</button>
            {author === context.userId && <button onClick={null}>🤑</button>}
            <button onClick={null}>$ VALOR</button>
        </div>
    </article>
}
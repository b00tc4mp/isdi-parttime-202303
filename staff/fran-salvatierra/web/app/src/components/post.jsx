/* eslint-disable react/prop-types */
import { context } from '../ui'
import toggleLikePost from '../logic/toggleLikePost'
import deletePost from '../logic/deletePost'
import './post.css'
import retrieveUser from '../logic/retrieveUser'

export default function Post({ post: { id, image, text, date, likes, author }, onEditPost, onToggledLikePost, onPostDeleted }) {
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

    console.log('Post -> render')

    const _user = retrieveUser(author)

    return <article>
        <div className="user-info__post">
            <img src={_user.avatar} alt="" />
            <p>{_user.name}</p>
        </div>
        <img src={image} width="200px" />
        <p>{text}</p>
        <time>{date.toLocaleString()}</time>
        <div className='buttons-container'>
            <button onClick={handleToggleLikePost}>{likes && likes.includes(context.userId) ? '❤️' : '🤍'} ({likes ? likes.length : 0})</button>
            {author === context.userId && <button onClick={handleEditPost}>📝</button>}
            {author === context.userId && <button onClick={handleDeletePost}>🗑</button>}
            <button onClick={null}>⭐️</button>
            {author === context.userId && <button onClick={null}>🤑</button>}
            <button onClick={null}>$ VALOR</button>
        </div>
    </article>
}
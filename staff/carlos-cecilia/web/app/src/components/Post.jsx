import { context } from '../ui'
import toggleLikePost from '../logic/toggleLikePost'
import deletePost from '../logic/deletePost'

export default function Post({ post: { id, image, text, date, likes, author }, onEditPost, onToggledLikePost, onPostDeleted }) { 
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

    console.log('Post -> render')

    return <article class="post">
        <div class="post__top">
            <img src={image} width="200px" />
            <div class="post__interact">
                <button  class="post__like" onClick={handleToggleLikePost}>{likes && likes.includes(context.userId) ? '❤️' : '🤍'} ({likes ? likes.length : 0})</button>
                <button class="post__fav" onClick={null}>⭐️</button>
            </div>

        </div>
        <div class="post__content">
            <div>
            <time><p class="post__content-date">{date.toLocaleString()}</p></time>
                <p class="post__content-text">{text}</p>

            </div>
            <div class="post__content-edit">
                {author === context.userId && <button onClick={handleEditPost}>📝</button>}<br></br>
                {author === context.userId && <button onClick={handleDeletePost}>🗑</button>}
            </div>
        </div>

    </article>
}
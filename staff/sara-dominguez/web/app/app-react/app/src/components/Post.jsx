import { context } from '../ui'
import toggleLikePost from '../logic/toogleLikePost'
import deletePost from '../logic/deletePost'
import toggleFavPost from '../logic/toggleFavPost'
import { useContext } from 'react'
import Context from '../components/Context.js'
import Container from '../library/Container.jsx'

export default function Post({ post: { id, image, text, date, likes, author, fav }, onEditPost, onToggledLikePost, onPostDeleted, onToggledSavePost }) {
    const { alert, freeze, unfreeze } = useContext(Context)

    const handleEditPost = () => onEditPost(id)

    const handleToggleLikePost = () => {
        try {
            freeze()
            toggleLikePost(context.userId, id, error => {
                unfreeze()
                
                if (error) {
                    alert(error.message)


                    return
                }

                onToggledLikePost()
            })

        } catch (error) {
            alert(error.message)
        }
    }

    const handleDeletePost = () => {
        try {
            freeze()
            deletePost(context.userId, id, error => {
                unfreeze()
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
            freeze()
            toggleFavPost(context.userId, id, error => {
                unfreeze()
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
        <h2><img src={author.avatar} width="20px" /> {author.name}</h2>
        <img src={image} width="200px" />
        <p>{text}</p>
        <time>{date.toLocaleString()}</time>
        <button onClick={handleToggleLikePost}>{likes.includes(context.userId) ? '❤️' : '🤍'} {likes ? likes.length : 0}</button>
        {author.id === context.userId && <button onClick={handleEditPost}>📝</button>}
        {author.id === context.userId && <button onClick={handleDeletePost}>🗑</button>}
        <button onClick={handleToggleSavePost}>{fav ? '⭐️' : '✩'}</button>
    </article>
}

import { context } from '../ui'
import toggleLikePost from '../logic/toogleLikePost'
import deletePost from '../logic/deletePost'
import toggleFavPost from '../logic/toggleFavPost'
import useAppContext from '../hooks/UseAppContext'
import Container from '../library/Container.jsx'
import { utils } from 'com'

const { extractSubFromToken } = utils

export default function Post({ post: { id, image, text, date, likes, author, fav }, onEditPost, onToggledLikePost, onPostDeleted, onToggledSavePost }) {
    const { alert, freeze, unfreeze } = useAppContext()

    const handleEditPost = () => onEditPost(id)

    const handleToggleLikePost = () => {
        try {
            // freeze()
            // toggleLikePost(context.token, id, error => {
            //     unfreeze()
            //     if (error) {
            //         alert(error.message)
            //         return
            //     }
            //     onToggledLikePost()
            // })

            freeze()
            toggleLikePost(context.token, id)
                // unfreeze()
                .then((id) => onToggledLikePost(id))
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }

    const handleDeletePost = () => {
        try {
            freeze()
            deletePost(context.token, id, error => {
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
            toggleFavPost(context.token, id, error => {
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

    const userId = extractSubFromToken(context.token)

    return <article>
        <h2><img src={author.avatar} width="20px" /> {author.name}</h2>
        <img src={image} width="200px" />
        <p>{text}</p>
        <time>{date}</time>
        <button onClick={handleToggleLikePost}>{likes.includes(userId) ? '❤️' : '🤍'} {likes ? likes.length : 0}</button>
        {author.id === userId && <button onClick={handleEditPost}>📝</button>}
        {author.id === userId && <button onClick={handleDeletePost}>🗑</button>}
        <button onClick={handleToggleSavePost}>{fav ? '⭐️' : '✩'}</button>
    </article>
}

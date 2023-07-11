// import toggleLikePost from '../logic/toggleLikePost'
import deletePost from '../logic/deletePost'
import toggleFavPost from '../logic/toggleFavPost'
import { useAppContext } from '../hooks'
import isCurrentUser from '../logic/isCurrentUser'
import getUserId from '../logic/getUserId'

export default function Post({ post: { id, image, text, date, likes, author, fav }, onEditPost, onToggledLikePost, onPostDeleted, onToggledSavePost }) {
    console.debug('Post -> render')

    const { alert, freeze, unfreeze } = useAppContext()

    const handleEditPost = () => onEditPost(id)

    const handleToggleLikePost = () => {
        try {
            freeze()

            // TODO update
            // toggleLikePost(context.userId, id, error => {
            //     unfreeze()

            //     if (error) {
            //         alert(error.message)

            //         return
            //     }

            //     onToggledLikePost()
            // })

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

    const isCurrentUserPost = isCurrentUser(author.id)

    return <article>
        <h2><img src={author.avatar} width="20px" /> {author.name}</h2>
        <img src={image} width="200px" />
        <p>{text}</p>
        <time>{date.toLocaleString()}</time>
        <button onClick={handleToggleLikePost}>{likes.includes(getUserId()) ? '❤️' : '🤍'} ({likes ? likes.length : 0})</button>
        {isCurrentUserPost && <button onClick={handleEditPost}>📝</button>}
        {isCurrentUserPost && <button onClick={handleDeletePost}>🗑</button>}
        <button onClick={handleToggleSavePost}>{fav ? '⭐️' : '✩'}</button>
    </article>
}
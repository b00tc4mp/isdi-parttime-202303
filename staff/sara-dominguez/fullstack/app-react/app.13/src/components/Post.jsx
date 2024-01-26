import toggleLikePost from '../logic/toogleLikePost'
import deletePost from '../logic/deletePost'
import toggleFavPost from '../logic/toggleFavPost'
import useAppContext from '../hooks/UseAppContext'
import Container from '../library/Container.jsx'
import { utils } from 'com'
import isCurrentUser from '../logic/isCurrentUser'
import getUserId from '../logic/getUserId'

const { extractSubFromToken } = utils

export default function Post({ post: { id, image, text, date, likes, author, fav }, onEditPost, onToggledLikePost, onPostDeleted, onToggledSavePost }) {
    const { alert, freeze, unfreeze } = useAppContext()

    const handleEditPost = () => onEditPost(id)

    const handleToggleLikePost = () => {
        try {
            freeze()
            toggleLikePost(id)
                .then((id) => onToggledLikePost(id))
                .catch(error => alert(error.message))
                .finally(unfreeze)
        } catch (error) {
            alert(error.message)
            unfreeze()
        }
    }

    const handleDeletePost = () => {
        try {
            freeze()
            deletePost(id, error => {
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
            toggleFavPost(id, error => {
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

    const isCurrentUserPost = isCurrentUser(author.id)

    return <article>
        <h2><img src={author.avatar} width="20px" /> {author.name}</h2>
        <img src={image} width="200px" />
        <p>{text}</p>
        <time>{date}</time>
        <button onClick={handleToggleLikePost}>{likes.includes(getUserId()) ? '❤️' : '🤍'} {likes ? likes.length : 0}</button>
        {isCurrentUserPost && <button onClick={handleEditPost}>📝</button>}
        {isCurrentUserPost && <button onClick={handleDeletePost}>🗑</button>}
        <button onClick={handleToggleSavePost}>{fav ? '⭐️' : '✩'}</button>
    </article>
}

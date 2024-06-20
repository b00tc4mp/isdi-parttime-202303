import './Post.css'
import deletePost from '../../logic/deletePost'
import toggleLikePost from '../../logic/toggleLikePost'
import toggleFavPost from '../../logic/toggleFavPost'
import { useAppContext, useHandleErrors } from '../hooks'
import isCurrentUser from '../../logic/isCurrentUser'
import getUserId from '../../logic/getUserId'


export default function Post({ post: { id, image, location, title, text, date, likes, author, fav }, onEditPost, onToggledLikePost, onPostDeleted, onToggledSavePost}) {
    console.debug('Post -> render')
    
    const { alert, freeze, unfreeze } = useAppContext()

    const handleErrors = useHandleErrors()

    const handleEditPost = () => onEditPost(id)

    const handleDeletePost = () => {
        try {
            freeze()

            handleErrors(async () => {
                await deletePost(id)
                onPostDeleted()
                unfreeze()
            })

        } catch (error) {
            unfreeze()
            alert(error.message)
        }
    }

    const handleToggleLikePost = () => {
        try {
            freeze()
            
            handleErrors(async () => {
                await toggleLikePost(id)
                onToggledLikePost()
                unfreeze()
            })

        } catch (error) {
            unfreeze()
            alert(error.message)
        }
    }

    const handleToggleSavePost = () => {
        try {
            freeze()

            handleErrors(async () => {
                await toggleFavPost(id)
                onToggledSavePost()
                unfreeze()
            })
        } catch (error) {
            unfreeze()
            alert(error.message)
        }
    }

    const isCurrentUserPost = isCurrentUser(author.id)
     
    return <article className='post-container'>
      
        <img className='post-image' src={image} />
        
        <div className='post-data-container'>
            <div className='post-top-container'>
                <div className='post-info-container'>
                    <div className="post-author-container">
                        <img className="post-author-avatar" src={author.avatar}/> 
                        <h1>{author.name}</h1>
                    </div>
                    <div className='post-date-container'>
                        <time>{date.toLocaleString()}</time>
                    </div>
                </div>

                <div className='post-buttons-container'>
                    {isCurrentUserPost && <button className='post-button' onClick={handleEditPost}>📝</button>}
                    {isCurrentUserPost && <button className='post-button' onClick={handleDeletePost}>🗑</button>}
                    <button className='post-button'onClick={handleToggleLikePost}>{likes.includes(getUserId()) ? '❤️' : '🤍'} ({likes ? likes.length : 0})</button>
                    <button className='post-button'onClick={handleToggleSavePost}>{fav ? '⭐️' : '✩'}</button>
                </div>
            </div>

            <div className='post-bottom-container'>
            <h1 className='post-location-text'>{location}</h1>
            <h1>{title}</h1>
            <p>{text}</p>
            </div>

        </div>
    </article>
}
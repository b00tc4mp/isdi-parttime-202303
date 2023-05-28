import { context } from '../ui'
import toggleLikePost from '../logic/toggleLikePost'
import deletePost from '../logic/deletePost'
import toggleSavePost from '../logic/toggleSavePost'
import './Post.css'

export default function Post({ post: { id, image, location, title, text, date, likes, author }, onEditPost, onToggledLikePost, onPostDeleted, onToggledSavedPost}) {
    
    const handleEditPost = () => onEditPost(id)

    const handleToggleLikePost = () => {
        try {
            toggleLikePost(context.userId, id, error => {
                if(error){
                    alert(error.message)
                    return
                }
                onToggledLikePost()
            })

        } catch(error) {
            alert(error.message)
        }
    }

    const handleDeletePost = () => {
        try {
            deletePost(context.userId, id, error => {
                if(error){
                    alert(error.message)
                    return
                }

                onPostDeleted()
            })

        } catch(error) {
            alert(error.message)
        }
    }

    const handleToggleSavePost = () => {
        try {
            toggleSavePost(context.userId, id, error => {
                if(error){
                    alert(error.message)
                    return
                }

                onToggledSavedPost()
            })
            
        } catch(error) {
            alert(error.message)
        }
    }

    console.log('Post -> render')
    
    return <article className='post-container'>
      
        <img className='post-image' src={image} />
        
        <div className='post-data-container'>
        <div className='post-top-container'>
        <time>{date.toLocaleString()}</time>
        <button onClick={handleToggleLikePost}>{likes && likes.includes(context.userId) ? '❤️' : '🤍'} ({likes ? likes.length : 0})</button>
        {author === context.userId && <button onClick={handleEditPost}>📝</button>}
        {author === context.userId && <button onClick={handleDeletePost}>🗑</button>}
        {author === context.userId && <button onClick={handleToggleSavePost}>🔰</button>}
        </div>

        <div className='post-bottom-container'>
        <p className='post-location-text'>{location}</p>
        <p>{title}</p>
        <p>{text}</p>
        </div>

        </div>
    </article>
}
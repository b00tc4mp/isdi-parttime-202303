import { context } from '../ui'
import toggleLikePost from '../logic/toggleLikePost'
import deletePost from '../logic/deletePost'
import toggleFavPost from '../logic/toggleFavPost'
import './Post.css'
import { useAppContext } from '../hooks'

export default function Post({ post: { id, image, location, title, text, date, likes, author, fav }, onEditPost, onToggledLikePost, onPostDeleted, onToggledSavePost}) {
    
    const { alert, freeze, unfreeze } = useAppContext()

    const handleEditPost = () => onEditPost(id)

    const handleToggleLikePost = () => {
        try {
            freeze()
            toggleLikePost(context.userId, id, error => {
                unfreeze()
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
            freeze()
            deletePost(context.userId, id, error => {
                unfreeze()
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
            freeze()
            toggleFavPost(context.userId, id, error => {
                unfreeze()
                if(error){
                    alert(error.message)
                    return
                }

                onToggledSavePost()
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
                    {author.id === context.userId && <button className='post-button' onClick={handleEditPost}>📝</button>}
                    {author.id === context.userId && <button className='post-button' onClick={handleDeletePost}>🗑</button>}
                    <button className='post-button'onClick={handleToggleLikePost}>{likes && likes.includes(context.userId) ? '❤️' : '🤍'} ({likes ? likes.length : 0})</button>
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
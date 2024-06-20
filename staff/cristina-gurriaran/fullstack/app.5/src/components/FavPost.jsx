import { context } from '../ui'
import './Post.css'
import { useAppContext } from '../hooks'


export default function FavPost({ post: { _id, image, location, title, text, date, likes, author, favs }, onEditPost, onToggledLikePost, onPostDeleted, onToggledSavePost}) {
    
    const { alert } = useAppContext()

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

      
            </div>

            <div className='post-bottom-container'>
            <h1 className='post-location-text'>{location}</h1>
            <h1>{title}</h1>
            </div>

        </div>
    </article>
}
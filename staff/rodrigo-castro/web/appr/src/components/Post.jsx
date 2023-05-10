import { findUserById } from "../logic/helpers/dataManagers"
import { context } from "../ui"
import toggleLikePost from '../logic/toggleLikePost'
import './Post.css'
import PropTypes from 'prop-types'

export default function Post({post: {id, image, text, date, likedBy, author}, onLike, onEdit}) {
    Post.propTypes = {
        post: PropTypes.object,
        onLike: PropTypes.func,
        onEdit: PropTypes.func
    }

    const day = date.getDate().toString()
    const month = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'][date.getMonth()]
    const year = date.getFullYear()
    
    const user = findUserById(author)
    
    const handleLike = () => {
        try{
            toggleLikePost(context.userId, id)

            onLike()
        } catch(error){
            alert(error.message)
        }
    }

    const handleEdit = () => {
        onEdit(id)
    }

    return <article className="post-container">
        <div className="post-header">
            <img src={user.avatar} className="user-avatar"/>
            <p className="author-name">{user.name}</p>
            <time>· {day} {month} {year}</time>
            {author === context.userId? <button className="edit-button" onClick={handleEdit}><i className="uil uil-edit"></i></button> : ''}
        </div>
        <img src={image}/>
        <button className={likedBy.includes(context.userId) ? "like-button liked" : "like-button"} onClick={handleLike}><i className="uil uil-heart-sign"></i></button>
        {likedBy.length > 0? <p className="likes-counter">{likedBy.length} {likedBy.length > 1? 'likes' : 'like'}</p> : ''}
        <div>
            <p className="author-name">{user.name}</p><p>{text}</p>
        </div>
    </article>
}
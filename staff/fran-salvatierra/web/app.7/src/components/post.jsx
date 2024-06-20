import { findUserById } from "../logic/helpers/dataManagers"
import { context } from "../ui"
import toggleLikePost from '../logic/toggleLikePost'
import toggleSavePost from '../logic/toggleSavePost'
import './Post.css'
import PropTypes from 'prop-types'

export default function Post({post: {id, image, text, date, likedBy, author}, onToggledLikePost, onEdit, onToggleSavePost}) {
    Post.propTypes = {
        post: PropTypes.object,
        onToggledLikePost: PropTypes.func,
        onEdit: PropTypes.func,
        onToggleSavePost: PropTypes.func
    }

    const day = date.getDate().toString()
    const month = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'][date.getMonth()]
    const year = date.getFullYear()
    
    let user

    try {
        user = findUserById(author)
    } catch(error){
        alert(error.message)
    }
    
    const handleToggleLikePost = () => {
        try{
            toggleLikePost(context.userId, id)

            onToggledLikePost()
        } catch(error){
            alert(error.message)
        }
    }

    const handleToggleSavePost = () => {
        try{
            toggleSavePost(context.userId, id)

            onToggleSavePost()
        } catch(error){
            alert(error.message)
        }
    }

    const handleEdit = () => {
        onEdit(id)
    }

    console.log('Post -> render')

    return <article className="post-container">
        <div className="post-header">
            <img src={user.avatar} className="user-avatar"/>
            <p className="author-name">{user.name}</p>
            <time>· {day} {month} {year}</time>
            {author === context.userId? <button className="edit-button" onClick={handleEdit}><span className="material-symbols-rounded">edit</span></button> : ''}
        </div>
        <img src={image}/>
        <div className="post-options">
            <button className={`post-button ${likedBy && likedBy.includes(context.userId) ? 'liked' : ''}`} onClick={handleToggleLikePost}><span className="material-symbols-rounded">favorite</span></button>
            <button className={`post-button ${user.savedPosts && user.savedPosts.includes(id) ? 'liked' : ''}`} onClick={handleToggleSavePost}><span className="material-symbols-rounded">bookmark</span></button>
        </div>
        {likedBy && likedBy.length > 0? <p className="likes-counter">{likedBy.length} {likedBy.length > 1? 'likes' : 'like'}</p> : ''}
        <div>
            <p className="author-name">{user.name}</p><p>{text}</p>
        </div>
    </article>
}
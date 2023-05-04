import { findUserById } from "../logic/helpers/dataManagers.js"
import { context } from "../ui.js"
import PropTypes from 'prop-types'

export default function Post({post: {image, text, date, likedBy, author}}) {
    Post.propTypes = {
        post: PropTypes.object
    }

    const day = date.getDate().toString().padStart(2, '0')
    const month = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'][date.getMonth()]
    const year = date.getFullYear()

    const user = findUserById(author)
    
    return <article className="post-container">
        <div className="post-header">
            <img src={user.avatar} className="user-avatar"/>
            <p className="author-name">{user.name}</p>
            <time>· {day} {month} {year}</time>
            {author === context.userId? <button className="edit-button"><i className="uil uil-edit"></i></button> : ''}
        </div>
        <img src={image}/>
        <button className={likedBy.includes(context.userId) ? "like-button liked" : "like-button"} ><i className="uil uil-heart-sign"></i></button>
        {likedBy.length > 0? <p className="likes-counter">{likedBy.length} {likedBy.length > 1? 'likes' : 'like'}</p> : ''}
        <div>
            <p className="author-name">{user.name}</p><p>{text}</p>
        </div>
    </article>
}
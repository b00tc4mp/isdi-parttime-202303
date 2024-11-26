import { context } from "../ui"
import UserImage from "./UserImage"
import { findUserById } from "../logic/helpers/dataManagers"
import { userLikedPost, savePostToFavorites } from "../../../app.15_lastVanilla/src/logic/posts/posts-data"
import './Post.css'


export default function Post( { post, post: {image, title, text, comments, likes, id, date, author, lastModify }, onToggleLikePost, onToggleSavePost, onEditPostButton } ) {
    
    const postStyle = {
        background: `linear-gradient(180deg, rgba(0,0,0,.2) 0%, rgba(0,0,0,0) 10%, rgba(0,0,0,0) 50%, rgba(0,0,0,.6) 100%), url(${image}) center / cover`
    }
    const userId = context.userId
    const currentUser = findUserById(userId)
    const postDate = date
    const now = new Date()
    const isLikedPost = post.likes.find(user => user === userId)

    const difference = now - postDate
    let newDate

    if (difference > 86400000) 
    newDate = `${Math.ceil(difference / (1000 * 3600 * 24))} days ago`
    if (difference < 86400000)
        newDate = `${Math.ceil(difference / (1000 * 3600))} hours ago`
    if (difference < 3600000)
        newDate = `${Math.ceil(difference / (1000 * 3600 / 60))} minutes ago`
    if (difference < 60000)
        newDate = `less than ${Math.ceil(difference / (1000 * 3600 / 60))} minute`

        let countLikes
    if(likes.length === 1) {
        countLikes = `${likes.length} like`
    }
    if(likes.length > 1) {
        countLikes = `${likes.length} likes`
    }
    function handleToggleLike(event) {
        userLikedPost(userId, post, event)
        onToggleLikePost()
    }
    function handleToggleSave(event) {
        savePostToFavorites(userId, post, event)
        onToggleSavePost()
    }
    
    
    function handleEditPostButton(id) {
        onEditPostButton(id)
    }
    return <article className={id} style={postStyle}>
    <div className="post-author"><UserImage userId={author}/>
    {userId === author ? <button className={`edit ${id}`} onClick={() => handleEditPostButton(id)}>edit <span className="material-symbols-outlined pencil edit-post">edit</span></button> : ''}
    </div>
    <img className="space-image" />
    <div className="title-and-interactions">
        <div className={`material-symbols-outlined like ${isLikedPost === userId ? ' filled' : ''}`}
 onClick={handleToggleLike}>favorite</div>
        <div className="material-symbols-outlined comment">maps_ugc</div>
        <div className={currentUser.likedPosts.find(post => post === id) === id ? 'material-symbols-outlined save filled' : 'material-symbols-outlined save'} onClick={handleToggleSave}>bookmark</div>
    </div>
    <h3 className="title">{title}</h3>
    <p className="excerpt">{text}</p>
    <div className="post-likes">{likes.length < 1 ? '' : countLikes }</div>
    <div className="comments-count">{comments.length} comments</div>
    <time className="post-date">{newDate} {lastModify ? <span className="post-edited">Edited</span> : ''}</time>
</article>
}




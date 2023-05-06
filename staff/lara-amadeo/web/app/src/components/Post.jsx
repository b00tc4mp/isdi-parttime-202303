import { users } from "../data"
import formatPostDate from '../logic/formatPostDate'
import { findUserbyId } from '../logic/helpers/data-managers'
import { context, errorToast, generateToast } from "../ui"
import  likeAndUnlike from '../logic/likeAndUnlikePost'
import saveAndUnsavePost from '../logic/saveAndUnsavePost'

export default function Post(props){

    const _users = users()
    const userLogged = findUserbyId(context.userId)
    
    function handleLikedPost(){
        try{
            likeAndUnlike(props.post, context.userId)

            props.onLikeButtonClick()
        
        } catch(error){
            generateToast({
                message: error.message,
                type: errorToast
            })
        }
    }

    function handleSavedPost(){
        try{
            saveAndUnsavePost(props.post, context.userId)

            props.onSaveButtonClick()
        } catch(error){
            generateToast({
                message: error.message,
                type: errorToast
            })
        }
    }

    function handleOpenEditPostModal(id){
        props.onEditPostButton(id) 
        
    }

    return <div className="post">
    <div className="header-post">
        <div className="post-user-data">

            <img className="post-avatar" src={(_users.find((_user => _user.id === props.post.author))).avatar}/>
            <div className="post-user-data-info">
                <p className="post-user-data-info-username small-text-bold">{(_users.find((_user => _user.id === props.post.author))).username}</p>
                <p className="post-user-data-info-time tiny-text">{formatPostDate(props.post.date)}</p>
            </div>

        </div>
        {userLogged.id === props.post.author ? <button className="button-XS secondary-button" onClick={() => handleOpenEditPostModal(props.post.id)}>Edit post</button> : '' }
    </div>

    <div className="post-image">
        <img className="user-post-image" src={props.post.image}/>
    </div>

    <div className="post-caption">

        <p className="post-caption-text small-text">{props.post.text}</p>

        <div className="post-action-icons">
            <div className="icon-s-container" onClick={handleSavedPost}>
                {/* <span className="save-icon material-symbols-rounded icon-s pointer ${userLogged.savedPosts && userLogged.savedPosts.includes(post.id)? 'save-icon-filled' : ''}">bookmark</span> */}
                <span className={userLogged.savedPosts && userLogged.savedPosts.includes(props.post.id)? 'save-icon-filled save-icon material-symbols-rounded icon-s pointer' : 'save-icon material-symbols-rounded icon-s pointer'}>bookmark</span>    
            </div>

            <div className="icon-s-container" onClick={handleLikedPost}>
                {/* <span className="{like-icon material-symbols-rounded icon-s pointer ${post.likes && post.likes.includes(context.userId)? 'like-icon-filled' : ''}">favorite</span> */}
                <span className={props.post.likes && props.post.likes.includes(context.userId)? 'like-icon-filled like-icon material-symbols-rounded icon-s pointer' : 'like-icon material-symbols-rounded icon-s pointer'}>favorite</span>

            </div>
        </div>
    </div>
</div>
}
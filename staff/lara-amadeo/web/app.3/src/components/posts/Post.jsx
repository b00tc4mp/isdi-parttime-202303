import { users } from "../../data"
import formatPostDate from '../../logic/formatPostDate'
import { findUserbyId } from '../../logic/helpers/data-managers'
import { context, errorToast, generateToast } from "../../ui"
import  likeAndUnlike from '../../logic/likeAndUnlikePost'
import saveAndUnsavePost from '../../logic/saveAndUnsavePost'
import './Post.css'

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

    function handleOpenEditPostModal(){
        props.onEditPostButton(props.post.id) 
        
    }

    function handleOpenDeletionModal(){
        props.onDeletePostButton(props.post.id)
    }

    return <div className="post">
        {console.log('Post -> render')}
    <div className="header-post">
        <div className="post-user-data">

            <img className="post-avatar" src={(_users.find((_user => _user.id === props.post.author))).avatar}/>
            <div className="post-user-data-info">
                <p className="post-user-data-info-username small-text-bold">{(_users.find((_user => _user.id === props.post.author))).username}</p>
                <p className="post-user-data-info-time tiny-text">{formatPostDate(props.post.date)}</p>
            </div>

        </div>
        <div className="header-post-actions">
            {userLogged.id === props.post.author ? <button className="button-XS secondary-button" onClick={handleOpenEditPostModal}>Edit</button> : '' }

            {userLogged.id === props.post.author ? <button className="critical-button icon-button" onClick={handleOpenDeletionModal}><div className="icon-s-container"><span className="material-symbols-rounded icon-s icon-critical pointer">delete</span></div></button> : '' }
        </div>
    </div>

    <div className="post-image-div">
        <img className="post-image" src={props.post.image}/>
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

<button className="button-XS"><div className="icon-s-container"><span className="material-symbols-rounded icon-s pointer">delete</span></div></button>
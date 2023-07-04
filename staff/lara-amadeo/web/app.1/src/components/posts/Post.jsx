import formatPostDate from '../../logic/formatPostDate'
import { context, errorToast, generateToast } from "../../ui"
import  likeAndUnlike from '../../logic/likeAndUnlikePost'
import saveAndUnsavePost from '../../logic/saveAndUnsavePost'
import './Post.css'
import { useState } from '../react'
import ContextualModalBox from '../ContextualModalBox'


export default function Post({ post, onLikeButtonClick, onSaveButtonClick, onEditPostButton, onDeletePostButton, onVisibilityButton }){

    const [modal, setModal] = useState('close')
    
    function handleLikedPost(){
        try{
            likeAndUnlike(post.id, context.userId, error => {
                if(error){
                    generateToast({
                        message: error.message + error.stack,
                        type: errorToast
                    })
                    return
                }
                onLikeButtonClick()
            })
        
        } catch(error){
            generateToast({
                message: error.message,
                type: errorToast
            })
        }
    }

    function handleSavedPost(){
        try{
            saveAndUnsavePost(post.id, context.userId, error => {
                if(error){
                    generateToast({
                        message: error.message + error.stack,
                        type: errorToast
                    })
                }
                onSaveButtonClick()
            })
        } catch(error){
            generateToast({
                message: error.message,
                type: errorToast
            })
        }
    }

    function handleOpenEditPostModal(){
        onEditPostButton(post.id) 
        setModal('close')
    }

    function handleOpenDeletionModal(){
        onDeletePostButton(post.id)
        setModal('close')
    }

    function handleOpenModal(){
        setModal('open')
    }

    function handleVisibility(){
        onVisibilityButton(post.id)
        setModal('close')
    }

    function handleCloseModal(){
        setModal('close')
    }

    return <div className="post">
        {modal === 'open' && <ContextualModalBox
        option1={'Edit post'}
        option2={`Make post ${post.visibility === 'private' ? 'public' : 'private'}`}
        option3={'Delete post'}
        onOptionOne={handleOpenEditPostModal}
        onOptionTwo={handleVisibility}
        onOptionThree={handleOpenDeletionModal}
        critical={'option 3'}
        onAnywhereClick={handleCloseModal}
        />}
        {console.log('Post -> render')}
    <div className="header-post">
        <div className="post-user-data">

            {post && <>
            <img className="post-avatar" src={post.author.avatar}/>
            <div className="post-user-data-info">

                <div className='post-username-n-visibility'>
                <p className="post-user-data-info-username small-text-bold">{post.author.username}</p>
                {post.author.id === context.userId && <span className="material-symbols-rounded icon-xs ">{post.visibility === 'private' ? 'lock' : 'language'}</span>}
                </div>
                
                <p className="post-user-data-info-time tiny-text">{formatPostDate(post.date)}</p>
            </div>
            </>}

        </div>
        <div className="header-post-actions">
            {/* {context.userId === post.author.id && <button className="button-XS secondary-button" onClick={handleOpenEditPostModal}>Edit</button>}

            {context.userId === post.author.id && <button className="critical-button icon-button" onClick={handleOpenDeletionModal}><div className="icon-s-container"><span className="material-symbols-rounded icon-s icon-critical pointer">delete</span></div></button>} */}

            {context.userId === post.author.id && <button className="secondary-button icon-button" onClick={handleOpenModal}><div className="icon-s-container"><span className="material-symbols-rounded icon-s pointer">more_vert</span></div></button>}
        </div>
    </div>

    <div className="post-image-div">
        <img className="post-image" src={post.image}/>
    </div>

    <div className="post-caption">

        <p className="post-caption-text small-text">{post.text}</p>

        {<div className="post-action-icons">
            <div className="icon-s-container" onClick={handleSavedPost}>
                <span className={`save-icon material-symbols-rounded icon-s pointer ${post.favs ? 'save-icon-filled' : ''}`} >bookmark</span>
            </div>

            <div className="icon-s-container" onClick={handleLikedPost}>
                <span className={`like-icon material-symbols-rounded icon-s pointer ${post.likes && post.likes.includes(context.userId)? 'like-icon-filled' : ''}`} >favorite</span>
            </div>
        </div>}
    </div>
</div>
}

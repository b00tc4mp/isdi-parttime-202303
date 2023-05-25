import formatPostDate from '../../logic/formatPostDate'
import { context } from "../../ui"
import  likeAndUnlike from '../../logic/likeAndUnlikePost'
import saveAndUnsavePost from '../../logic/saveAndUnsavePost'
import './Post.css'
import { useState } from 'react'
import ContextualModalBox from '../ContextualModalBox'
import { useContext } from 'react'
import Context from '../../Context'
import Spinner from '../library/Spinner'

export default function Post({ post, onLikeButtonClick, onSaveButtonClick, onEditPostButton, onDeletePostButton, onVisibilityButton, onSellPostButton, onBuyPostButton }){

    const [modal, setModal] = useState('close')
    const { generateToast, freeze, unfreeze } = useContext(Context)
    
    function handleLikedPost(){
        freeze()
        try{
            likeAndUnlike(post.id, context.userId, error => {
                unfreeze()
                if(error){
                    generateToast(error.message,'error')
                    console.log(error.stack)
                    return
                }
                onLikeButtonClick()
            })
        
        } catch(error){
            unfreeze()
            generateToast(error.message,'error')
            console.log(error.stack)
        }
    }

    function handleSavedPost(){
        freeze()
        try{
            saveAndUnsavePost(post.id, context.userId, error => {
                unfreeze()
                if(error){
                    generateToast(error.message,'error')
                    console.log(error.stack)
                }
                onSaveButtonClick()
            })
        } catch(error){
            unfreeze()
            generateToast(error.message,'error')
            console.log(error.stack)
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

    function handleOpenSellPost(){
        onSellPostButton(post.id)
        setModal('close')
    }

    function handleOpenBuyPost(){
        onBuyPostButton(post.id)
        setModal('close')
    }


    return <div className="post">
       {modal === 'open' && <ContextualModalBox

            options={[
                {text: 'Edit post', onClick: handleOpenEditPostModal},
                {text: `Make post ${post.visibility === 'private' ? 'public' : 'private'}`, onClick: handleVisibility},
                {text: 'Sell post', onClick: handleOpenSellPost},
                {text: 'Delete post', onClick: handleOpenDeletionModal, critical:true},
            ]}
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
            {/* {(context.userId !== post.author.id && post.price > 0) && <button className="button-XS primary-button" onClick={null}>Buy post</button>} */}
            {(context.userId !== post.author.id && post.price > 0) && <a className="link" onClick={handleOpenBuyPost}>Buy post</a>}
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

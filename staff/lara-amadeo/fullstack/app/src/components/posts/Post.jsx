import formatPostDate from '../../logic/formatPostDate'
import { context } from "../../ui"
import  toggleLikePost from '../../logic/toggleLikePost'
import toggleSavePost from '../../logic/toggleSavePost'
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
        // freeze()
        try{
            toggleLikePost(post.id, context.userId, error => {
                // unfreeze()
                if(error){
                    generateToast(error.message,'error')
                    console.log(error.stack)
                    return
                }
                onLikeButtonClick()
            })
        
        } catch(error){
            // unfreeze()
            generateToast(error.message,'error')
            console.log(error.stack)
        }
    }

    function handleSavedPost(){
        // freeze()
        try{
            toggleSavePost(post.id, context.userId, error => {
                // unfreeze()
                if(error){
                    generateToast(error.message,'error')
                    console.log(error.stack)
                }
                onSaveButtonClick()
            })
        } catch(error){
            // unfreeze()
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


    return <div className="w-full relative flex flex-col gap-[8px]">
       {modal === 'open' && <ContextualModalBox

            options={[
                {text: 'Edit post', onClick: handleOpenEditPostModal},
                {text: `Make post ${post.visibility === 'private' ? 'public' : 'private'}`, onClick: handleVisibility},
                {text: 'Sell post', onClick: handleOpenSellPost},
                {text: 'Delete post', onClick: handleOpenDeletionModal, critical:true},
            ]}
            onAnywhereClick={handleCloseModal}
        />}
    <div className="flex justify-between w-[100%]">
        <div className="w-auto flex items-center justify-start gap-[16px] relative">

            {post && <>
            <img className="w-[32px] h-[32px] rounded-lg object-cover" src={post.author.avatar}/>
            <div>
                <div className="flex gap-[4px] items-center">
                <p className="small-text-bold">{post.author.username}</p>
                {post.author.id === context.userId && <span className="material-symbols-rounded icon-xs ">{post.visibility === 'private' ? 'lock' : 'language'}</span>}
                </div>
                <p className="tiny-text">{formatPostDate(new Date(post.date))}</p>
            </div>
            </>}

        </div>
        <div className="flex gap-[8px] items-center">
            {(context.userId !== post.author.id && post.price > 0) && <a className="link" onClick={handleOpenBuyPost}>Buy post</a>}
            {context.userId === post.author.id && <button className="secondary-button icon-button" onClick={handleOpenModal}><div className="icon-s-container"><span className="material-symbols-rounded icon-s pointer">more_vert</span></div></button>}
        </div>
    </div>

    <div className="w-full relative aspect-square">
        <img className="w-full aspect-square object-cover" src={post.image}/>
    </div>

    <div className="w-full h-auto flex justify-between items-center">

        <p className="post-caption-text small-text">{post.text}</p>

        {<div className="flex gap-[8px]">
            <div className="icon-s-container" onClick={handleSavedPost}>
                <span className={`material-symbols-rounded icon-s pointer text-[22px] ${post.favs ? 'save-icon-filled' : ''}`} >bookmark</span>
            </div>

            <div className="icon-s-container" onClick={handleLikedPost}>
                <span className={`material-symbols-rounded icon-s pointer ${post.likes && post.likes.includes(context.userId)? 'like-icon-filled' : ''}`} >favorite</span>
            </div>
        </div>}
    </div>
</div>

}

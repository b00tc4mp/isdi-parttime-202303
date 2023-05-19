import { context } from "../ui"
import toggleLikePost from '../logic/toggleLikePost'
import toggleSavePost from '../logic/toggleSavePost'
import './Post.css'
import PropTypes from 'prop-types'
// import { retrieveUser } from "../logic/retrieveUser"
// import { useEffect, useState } from 'react'

export default function Post({post: {id, image, text, date, likedBy, author: {authorId, name, avatar}, isFav}, onToggledLikePost, onEdit, onToggleSavePost}) {
    Post.propTypes = {
        post: PropTypes.object,
        onToggledLikePost: PropTypes.func,
        onEdit: PropTypes.func,
        onToggleSavePost: PropTypes.func
    }
    
    const day = date.getDate().toString()
    const month = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'][date.getMonth()]
    const year = date.getFullYear()
    
    const handleToggleLikePost = () => {
        try{
            toggleLikePost(context.userId, id, error => {
                if(error){
                    alert(error.message)

                    return
                }

                onToggledLikePost()
            })
        } catch(error){
            alert(error.message)
        }
    }

    const handleToggleSavePost = () => {
        try{
            toggleSavePost(context.userId, id, error => {
                if(error){
                    alert(error.message)

                    return
                }
                
                onToggleSavePost()
            })

        } catch(error){
            alert(error.message)
        }
    }

    const handleEdit = () => {
        onEdit(id)
    }

    console.log('Post -> render')

    return <>
    {authorId && <><article className="post-container">
        <div className="post-header">
            <img src={avatar} className="user-avatar"/>
            <p className="author-name">{name}</p>
            <time>· {day} {month} {year}</time>
            {authorId === context.userId? <button className="edit-button" onClick={handleEdit}><span className="material-symbols-rounded">edit</span></button> : ''}
        </div>
        <img src={image}/>
        <div className="post-options">
            <button className={`post-button ${likedBy && likedBy.includes(context.userId) ? 'liked filled' : ''}`} onClick={handleToggleLikePost}><span className="material-symbols-rounded">favorite</span></button>
            <button className={`post-button ${isFav ? 'filled' : ''}`} onClick={handleToggleSavePost}><span className="material-symbols-rounded">bookmark</span></button>
        </div>
        {likedBy.length > 0? <p className="likes-counter">{likedBy.length} {likedBy.length > 1? 'likes' : 'like'}</p> : ''}
        <div>
            <p className="author-name">{name}</p><p>{text}</p>
        </div>
    </article></>}
    </>
}
import { context } from '../ui'
import { useAppContext } from '../hooks'

export const DEFAULT_AVATAR_URL = "https://img.icons8.com/color/512/avatar.png"

import toggleLikePost from '../logic/toggleLikePost'
import toggleSavePost from '../logic/toggleSavePost'
import deletePost from '../logic/deletePost'
import toggleLockPost from '../logic/toggleLockPost'
import updateBuyPost from '../logic/updateBuyPost'

import { utils } from 'com'

const { extractSubFromToken } = utils

import './Post.css'

export default function Post ({ post: { id, author, image, text, date, likes, dateLastModified, fav, lock, price}, onModifyPost, onEditPost, onAddPriceToPost}) {
    console.log('Post -> render')

    const { alert, freeze, unfreeze } = useAppContext()

    const handleLikePost = () => {
        try {
            freeze()
            toggleLikePost(context.token, id)
                .then(onModifyPost())
                .catch(error => alert(error.message))
                .finally(() => unfreeze())
        }
        catch(error){
            unfreeze()
            alert(error.message)
        }
    }

    const handleSavePost = () => {
         try {
            freeze()
            toggleSavePost(context.token, id)
                .then(onModifyPost())
                .catch(error => alert(error.message))
                .finally(() => unfreeze())
        }
        catch(error){
            unfreeze()
            alert(error.message)
        }
    }

    const handleEditPost = () => onEditPost(id)

    const handleDeletePost = () => {
        try{
            freeze()
            deletePost(context.token, id)
                .then(onModifyPost())
                .catch(error => alert(error.message))
                .finally(() => unfreeze())
        }
        catch(error){
            unfreeze()
            alert(error.message)
        }
    }

    const handleLockPost = () => {
        try{
            freeze()
            toggleLockPost(context.token, id)
                .then(onModifyPost())
                .catch(error => alert(error.message))
                .finally(() => unfreeze())            
        }
        catch(error){
            unfreeze()
            alert(error.message)
        }
    }

    const handleBuyPost = () => {
        try{
            freeze()
            updateBuyPost(context.token, id)
                .then(onModifyPost())
                .catch(error => alert(error.message))
                .finally(() => unfreeze())
        }
        catch(error){
            unfreeze()
            alert(error.message)
        }
    }

    const handlePriceToPost = () => onAddPriceToPost(id)

    const userId = extractSubFromToken(context.token)

    return <>
        <article className="post-article post-text">
            <div className="post-Author">
                <img className="home-header-avatar" src={author.avatar? author.avatar : DEFAULT_AVATAR_URL} alt=""/>
                <h1 className="name">{author.name}</h1>
            </div>
            <div className = "post-menssage">
                <img src={image} className="post-image"/>
                <p>{text}</p>
            </div>
            <div className = "post-button">
                <div>
                    <button className = "button-likes" onClick={handleLikePost}>{likes.includes(userId) ? '❤️' : '🤍'} ({likes? likes.length : 0})</button>
                    <button className = "button-save" onClick={handleSavePost}> {fav ? '📌' : '🔘'}</button>
                </div>
                <div>
                    {userId === author.id ? <button onClick={handleEditPost}>🖍</button> : ''} 
                    {userId === author.id ? <button onClick={handleDeletePost}>🗑</button> : ''}   
                    {userId === author.id ? <button onClick={handleLockPost}>{lock ? '🔒' : '🔓'}</button> : ''}   
                    {userId === author.id ? <button onClick={handlePriceToPost}>{price +'€'}</button> : ''}      
                    {userId !== author.id && price !== 0 ? <button onClick={handleBuyPost}>{price+'€'}</button> : ''}
                </div>
            </div>
            <div className = "post-info">
                <time>📎 {date.toLocaleString()}</time>
                <time>{dateLastModified ? '✏ ' + dateLastModified.toLocaleString(): ''}</time>                          
            </div>
        </article>
    </>
}
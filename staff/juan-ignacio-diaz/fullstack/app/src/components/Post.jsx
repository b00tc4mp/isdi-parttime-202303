import { useAppContext } from '../hooks'

export const DEFAULT_AVATAR_URL = "https://img.icons8.com/color/512/avatar.png"

import { isCurrentUser, toggleLikePost, toggleSavePost, deletePost, toggleLockPost, updateBuyPost } from '../logic'

import { utils } from 'com'

const { extractSubFromToken } = utils

import './Post.css'

export default function Post ({ post: { id, author, image, text, date, likes, dateLastModified, fav, lock, price}, onModifyPost, onEditPost, onAddPriceToPost}) {
    console.log('Post -> render')

    const { alert, freeze, unfreeze } = useAppContext()

    const handleLikePost = () => {
        try {
            freeze()
            toggleLikePost(id)
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
            toggleSavePost(id)
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
            deletePost(id)
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
            toggleLockPost(id)
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
            updateBuyPost(id)
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

    const isCurrentUserPost = isCurrentUser(author.id)

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
                    {isCurrentUserPost ? <button onClick={handleEditPost}>🖍</button> : ''} 
                    {isCurrentUserPost ? <button onClick={handleDeletePost}>🗑</button> : ''}   
                    {isCurrentUserPost ? <button onClick={handleLockPost}>{lock ? '🔒' : '🔓'}</button> : ''}   
                    {isCurrentUserPost ? <button onClick={handlePriceToPost}>{price +'€'}</button> : ''}      
                    {!isCurrentUserPostd && price !== 0 ? <button onClick={handleBuyPost}>{price+'€'}</button> : ''}
                </div>
            </div>
            <div className = "post-info">
                <time>📎 {date.toLocaleString()}</time>
                <time>{dateLastModified ? '✏ ' + dateLastModified.toLocaleString(): ''}</time>                          
            </div>
        </article>
    </>
}
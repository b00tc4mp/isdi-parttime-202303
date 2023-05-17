import { context } from '../ui'
export const DEFAULT_AVATAR_URL = "https://img.icons8.com/color/512/avatar.png"

import retrieveUser from '../logic/retrieveUser'
import toggleLikePost from '../logic/toggleLikePost'
import toggleSavePost from '../logic/toggleSavePost'
import deletePost from '../logic/deletePost'

import './Post.css'


export default function Post ({ post: { id, author, image, text, date, likes, dateLastModified}, onModifyPost, onEditPost, onMenssageAlert}) {
    //console.log('Post  -> render')

    const handleLikePost = () => {
        try {
            toggleLikePost(context.userId, id)

            onModifyPost()
        }
        catch(error){
            onMenssageAlert(error.message)
        }
    }

    const handleSavePost = () => {
         try {
            toggleSavePost(context.userId, id)

            onModifyPost()
        }
        catch(error){
            onMenssageAlert(error.message)
        }
    }

    const handleEditPost = () => onEditPost(id)

    const handleDeletePost = () => {
        try{
            deletePost(context.userId, id)

            onModifyPost()
        }
        catch(error){
            onMenssageAlert(error.message)
        }
    }

    try {
        const activeUser = retrieveUser(context.userId)
        const postUser = retrieveUser(author)

        return <>
            <article className="post-article post-text">
                <div className="post-Author">
                    <img className="home-header-avatar" src={postUser.avatar? postUser.avatar : DEFAULT_AVATAR_URL} alt=""/>
                    <h1 className="name">{postUser.name}</h1>
                </div>
                <div className = "post-menssage">
                    <img src={image} className="post-image"/>
                    <p>{text}</p>
                </div>
                <button className = "button-likes" onClick={handleLikePost}>{likes && likes.includes(context.userId) ? '❤️' : '🤍'} ({likes? likes.length : 0})</button>
                <button className = "button-save" onClick={handleSavePost}> {activeUser.savePosts && activeUser.savePosts.includes(id)? '📌' : '🔘'}</button>
                <div className = "post-info">
                    <time>📎 {date.toLocaleString()}</time>
                    {postUser.id === activeUser.id ?  <button onClick={handleEditPost}>🖍</button> : ''} 
                    {postUser.id === activeUser.id ?  <button onClick={handleDeletePost}>🗑</button> : ''}           
                    <time>{dateLastModified ? '✏ ' + dateLastModified.toLocaleString(): ''}</time>
                </div>
            </article>
        </>
    }
    catch (error) {
        onMenssageAlert(error.message)
    }
}
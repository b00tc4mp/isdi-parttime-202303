import { loadUsers } from "../data"
import { context } from "../ui"
import toggleLikePost from "../logic/toggleLikePost"
import "./Post.css"
import { deletePost } from "../logic/deletePost"
import { useState } from "react"

export default function Post({ post: { image, text, date, likes, author, id }, onLikePostClick, onEditClick, onDeletePostClick }) {
    const handleLikePostClick = event => {
        event.preventDefault()

        try {
            toggleLikePost(context.userId, id, error => {
                if (error) {
                    alert(error.message)

                    return
                }
                onLikePostClick()
            })
        } catch (error) {
            alert(error.message)
        }
    }

    const handleOpenEditModal = () => onEditClick(id)

    const handleDeletePost = () => {


        console.log('delete me')

        try {
            deletePost(context.userId, id, error => {
                if (error) {
                    alert(error.message)

                    return
                }
                onDeletePostClick()
            })
        } catch (error) {
            alert(error.message)
        }
    }

    console.log('Post -> Render')

    return <article className="inputs__box--feed">
        <div className="post__info--user">
            <div className="post__user">
                <img className="post__avatar" src={author.avatar} />
                <p className="post__name">{author.name}</p>
            </div>
            <div className="post__favorite">
                <img className="favorite--icon" src="../../images/bookmark_empty.png" onClick={handleOpenEditModal} />
            </div>
            <div className="post__date">
                <time className="text">{date}</time>
            </div>
        </div>
        <img className="home__post--image" src={image} />
        <div className="post--text"><p className="text">{text}</p></div>
        <div className="home__post--info">
            <div className="post__like">
                <img className="like-button" src={likes && likes.includes(context.userId) ? './images/heart-filled.png' : './images/heart-empty.png'} onClick={handleLikePostClick} />
                <p>{likes ? likes.length : 0}</p>
            </div>
            <div className="post__edit">
                {author.id === context.userId && <img className="edit--icon" src="../../images/edit.png" onClick={handleOpenEditModal} />}
            </div>
            <div className="post__delete">
                {author.id === context.userId && <img className="delete--icon" src="../../images/delete.png" onClick={handleDeletePost} />}
            </div>
        </div>
    </article>
}
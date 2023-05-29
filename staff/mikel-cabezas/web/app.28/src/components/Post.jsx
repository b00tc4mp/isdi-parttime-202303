import { context } from "../ui"
import UserImage from "./UserImage"
import { userLikedPost, savePostToFavorites } from "../logic/posts/postsData"
import './Post.css'
import retrieveUser from "../logic/users/retrieveUser"
import { useEffect, useState } from "react"
import { findUserById } from "../data"

export default function Post({ post, post: { image, title, text, comments, likes, id, date, author, lastModify }, onToggleLikePost, onToggleSavePost, onEditPostButton, user }) {

    const userId = context.userId

    const [userData, setUserData] = useState()
    const [userSavePost, setUserSavePost] = useState()

    const postStyle = {
        background: `linear-gradient(180deg, rgba(0,0,0,.2) 0%, rgba(0,0,0,0) 10%, rgba(0,0,0,0) 50%, rgba(0,0,0,.6) 100%), url(${image}) center / cover`
    }

    useEffect(() => {
        try {
            retrieveUser(userId, (error, user) => {

                if (error) {
                    alert(error.message)

                    return
                }
                setUserData(user)
            })
        } catch (error) {
            alert(error.message)
        }
    }, [])

    const postDate = date

    const now = new Date()
    const isLikedPost = post.likes.find(user => user === userId)

    const difference = now - postDate
    let newDate

    if (difference > 86400000)
        newDate = `${Math.ceil(difference / (1000 * 3600 * 24))} days ago`
    if (difference < 86400000)
        newDate = `${Math.ceil(difference / (1000 * 3600))} hours ago`
    if (difference < 3600000)
        newDate = `${Math.ceil(difference / (1000 * 3600 / 60))} minutes ago`
    if (difference < 60000)
        newDate = `less than ${Math.ceil(difference / (1000 * 3600 / 60))} minute`

    let countLikes



    if (likes.length === 1) {
        countLikes = `${likes.length} like`
    }
    if (likes.length > 1) {
        countLikes = `${likes.length} likes`
    }


    function handleToggleLike(event) {
        try {
            userLikedPost(userId, post, error => {
                if (error) {
                    alert(error.message)

                    return
                }
                onToggleLikePost()
            })

        } catch (error) {
            alert(error.message)
        }
    }
    function checkUserPostSavedPosts() {
        // const findPost = user.find(user => user.likedPosts === id)
        // if(findPost)
        //     setUserSavePost(false)

        // if(!findPost)
        //     setUserSavePost(true)

    }
    function handleToggleSave(event) {
        // checkUserPostSavedPosts()
        try {
            savePostToFavorites(post, userId, user, error => {
                if(error) {
                    alert(error.message)

                    return
                }
            })
            onToggleSavePost()
        } catch(error) {
            alert(error.message)
        }
    }


    function handleEditPostButton(id) {
        onEditPostButton(id)
    }

    return user && <>

        {/* <p>{user.likedPosts}</p>   ESTO NO */}
        <article className={id} style={postStyle}>
            <div className="post-author">
                <UserImage userId={author.id} />
                {userId === author.id ? <button className={`edit ${id}`} onClick={() => handleEditPostButton(id)}>edit <span className="material-symbols-outlined pencil edit-post">edit</span></button> : ''}
            </div>
            <img className="space-image" />
            <div className="title-and-interactions">
                <div className={`material-symbols-outlined like ${isLikedPost === userId ? ' filled' : ''}`}
                    onClick={handleToggleLike}>favorite</div>
                <div className="material-symbols-outlined comment">maps_ugc</div>
                <div className={user.likedPosts.find(post => post === id) === id ? 'material-symbols-outlined save filled' : 'material-symbols-outlined save'} onClick={handleToggleSave}>bookmark</div>
            </div>
            <h3 className="title">{title}</h3>
            <p className="excerpt">{text}</p>
            <div className="post-likes">{likes.length < 1 ? '' : countLikes}</div>
            {/* <div className="post-likes-array">{likes}</div> */}
            <div className="comments-count">{comments.length} comments</div>
            <time className="post-date">{newDate} {lastModify ? <span className="post-edited">Edited</span> : ''}</time>
        </article>
    </>
}




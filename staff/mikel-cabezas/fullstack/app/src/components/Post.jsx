import { context } from "../ui"
import { toggleLikePost } from "../logic/posts/toggleLikePost"
import { toggleSavePost } from "../logic/posts/toggleSavePost"
import './Post.css'
import { useContext, useEffect, useState } from "react"
import ContextualModalMenu from "./ContextualMenu"
import { deletePost } from "../logic/posts/deletePost"
import retrieveUser from "../logic/users/retrieveUser"
import Context from "../Context"

export default function Post({ post, post: { image, title, text, comments, likes, id, date, author, lastModify, location, visibility }, onToggleLikePost, onToggleSavePost, onEditPostButton, onHideMenuOptions, user }) {

    const userId = context.userId

    const [userData, setUserData] = useState(user)
    const [modalMenu, setModalMenu] = useState('close')
    const {freeze, unfreeze, alert} = useContext(Context)

    const postStyle = {
        background: `linear-gradient(180deg, rgba(0,0,0,.2) 0%, rgba(0,0,0,0) 10%, rgba(0,0,0,0) 50%, rgba(0,0,0,.6) 100%), url(${image}) center / cover`
    }

    useEffect(() => {
        try {
            updateUserLikes()
        } catch (error) {
            alert(error.message)
        }
    }, [])

    const postDate = date
    const now = new Date()
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

    const countLikes = `${likes.length} ${likes.length > 1 ? `likes` : 'like'}`

    function updateUserLikes() {
        retrieveUser(userId, (error, user) => {

            if (error) {
                alert(error.message)

                return
            }
            setUserData(user)
        })
    }
    function handleToggleLike(event) {
        try {
            freeze()
            toggleLikePost(userId, post, error => {
                unfreeze()
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

    function handleToggleSave(event) {
        try {
            freeze()
            toggleSavePost(userId, post.id, error => {
                unfreeze()
                if(error) {
                    alert(error.message)

                    return
                }
                updateUserLikes()
                onToggleSavePost()
            })
        } catch(error) {
            alert(error.message)
        }
    }

    function handleEditPostButton(id) {
        onEditPostButton(id)
    }
    function handleDeletePostButton(id) {
        try {
            deletePost(userId, id, error => {
                if(error)
                    alert(error.message)
            })
            if(deletePost) {
                alert('post deleted')
                setModal('close')
            }
        } catch(error) {
            alert(error.message)
        }
    }

    function handleShowMenuOptions(event) {
        event.stopPropagation()
        event.preventDefault()
        try {
            if(event.target.className !== 'overlay contextual-menu--modal') {
                setModalMenu('open')
            } else {
                setModalMenu('close')
            }
        } catch(error) {
            alert(error.message)
        }
    }

    const handleHideMenuOptions = () => {
        try {
            setModalMenu('close')
        } catch(error) {
            alert(error.message)
        }
        return console.log(modalMenu)

        // onHideMenuOptions()
    }
    function returnLetters() {
        const separateUserName = user.name.split(' ')

        if (!user.image && separateUserName.length === 1) {
            return separateUserName[0][0] + separateUserName[0][1]
        }
        if (!user.image && separateUserName.length > 1) {
            return separateUserName[0][0] + separateUserName[1][0]
        }
    }
    console.log(modalMenu)
    return  <>
        <article className={id} style={postStyle}>
            <div className="post-author">
                <div className="avatar">
                    {!user.image && <div className="letter">{returnLetters()}</div>}
                    {user.image && <img className="image-profile" src={user.image} alt="" />}
                </div>
                <div className="user-name">{user.name}</div>
                {location && <span className="location">{location}</span>}

                {userId === author.id ? <div className={`options`} onClick={handleShowMenuOptions}><span className="material-symbols-outlined pencil edit-post">more_vert</span>
                
                {modalMenu === 'open' && 
                <ContextualModalMenu 
                    items={[
                        {text: 'Edit post', onClick: () => handleEditPostButton(id)},
                        {text: 'Delete post', onClick: () => handleDeletePostButton(id)},
                    ]}
                    onOutterClick={handleHideMenuOptions}
                />
                } </div> : ''}
                
                {/* <ul>
                    <li className={`edit ${id}`} onClick={() => handleEditPostButton(id)}>edit <span className="material-symbols-outlined pencil edit-post">edit</span></li>
                </ul> */}
                
            </div>
            <img className="space-image" />
            <div className="title-and-interactions">
                <div className={`material-symbols-outlined like ${likes.includes(userId) ? ' filled' : ''}`}
                    onClick={handleToggleLike}>favorite</div>
                <div className="material-symbols-outlined comment">maps_ugc</div>
                <div className={userData.favPosts.includes(id) ? 'material-symbols-outlined save filled' : 'material-symbols-outlined save'} onClick={handleToggleSave}>bookmark</div>
            </div>
            <h3 className="title">{title}</h3>
            <p className="excerpt">{text}</p>
            <div className="post-likes">{likes.length < 1 ? '' : countLikes}</div>
            <div className="comments-count">{comments.length} comments</div>
            <time className="post-date">{newDate} {lastModify ? <span className="post-edited">Edited</span> : ''}</time>
        </article>
    </>
}




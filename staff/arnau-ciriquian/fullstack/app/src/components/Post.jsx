import { context } from "../ui"
import toggleLikePost from "../logic/toggleLikePost"
import "./Post.css"
import { deletePost } from "../logic/deletePost"
import toggleFavPost from "../logic/toggleFavPost"
import toggleHidePost from "../logic/toggleHidePost"

export default function Post({ post: { image, text, date, likes, author, _id, favs, visibility }, onLikePostClick, onEditClick, onDeletePostClick, onFavPostClick, onHidePostClick }) {
    const handleLikePostClick = () => {

        console.log(author.username)
        console.log(author.avatar)

        try {
            toggleLikePost(context.userId, _id, error => {
                
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

    const handleFavPostClick = () => {
        try {
            toggleFavPost(_id, context.userId, error => {
                if (error) {
                    alert(error.message)

                    return
                }
                onFavPostClick()
            })
        } catch (error) {
            alert(error.message)
        }
    }

    const handleHidePost = () => {
        try {
            toggleHidePost(context.userId, _id, error => {
                if (error) {
                    alert(error.message)

                    return
                }
                onHidePostClick()
            })
        } catch (error) {
            alert(error.message)
        }
    }

    const handleOpenEditModal = () => onEditClick(_id)

    const handleDeletePost = () => {
        const confirmation = confirm('Are you sure that you want to delete this post? This action cannot be undone!')

        if (confirmation) {
            try {
                deletePost(context.userId, _id, error => {
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
    }

    console.log('Post -> Render')

    if (!visibility && context.userId === author.id) {
        return <article className="inputs__box--feed">
        <div className="post__info--user">
            <div className="post__user">
                <img className="post__avatar" src={author.avatar} />
                <p className="post__name">{author.username}</p>
            </div>
            <div className="post__favorite">
                <img className="favorite--icon" src={favs ? "../../images/bookmark_filled.png" : "../../images/bookmark_empty.png"} onClick={handleFavPostClick} />
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
            <div className="post__hide">
                {(author.id === context.userId && visibility === true && <img className="hide--icon" src="../../images/eye.png" onClick={handleHidePost} />) || (author.id === context.userId && visibility === false && <img className="hide--icon" src="../../images/eye_slashed.png" onClick={handleHidePost} />)}
            </div>
            <div className="post__delete">
                {author.id === context.userId && <img className="delete--icon" src="../../images/delete.png" onClick={handleDeletePost} />}
            </div>
        </div>
    </article>
    }
    
    if (visibility) {
        return <article className="inputs__box--feed">
        <div className="post__info--user">
            <div className="post__user">
                <img className="post__avatar" src={author.avatar} />
                <p className="post__name">{author.username}</p>
            </div>
            <div className="post__favorite">
                <img className="favorite--icon" src={favs ? "../../images/bookmark_filled.png" : "../../images/bookmark_empty.png"} onClick={handleFavPostClick} />
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
            <div className="post__hide">
                {(author.id === context.userId && visibility === true && <img className="hide--icon" src="../../images/eye.png" onClick={handleHidePost} />) || (author.id === context.userId && visibility === false && <img className="hide--icon" src="../../images/eye_slashed.png" onClick={handleHidePost} />)}
            </div>
            <div className="post__delete">
                {author.id === context.userId && <img className="delete--icon" src="../../images/delete.png" onClick={handleDeletePost} />}
            </div>
        </div>
    </article>
    }
}
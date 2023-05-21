import { context } from "../ui"
import toggleLikePost from "../logic/toggleLikePost"
import "./Post.css"
import { deletePost } from "../logic/deletePost"
import toggleFavPost from "../logic/toggleFavPost"
import toggleHidePost from "../logic/toggleHidePost"

export default function Post({ post: { image, text, date, likes, author, id, fav, hidden }, onLikePostClick, onEditClick, onDeletePostClick, onFavPostClick, onHidePostClick }) {
    const handleLikePostClick = () => {
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

    const handleFavPostClick = () => {
        try {
            toggleFavPost(id, context.userId, error => {
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
            toggleHidePost(context.userId, id, error => {
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

    const handleOpenEditModal = () => onEditClick(id)

    const handleDeletePost = () => {
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

    if (hidden && context.userId === author.id) {
        return <article className="inputs__box--feed">
        <div className="post__info--user">
            <div className="post__user">
                <img className="post__avatar" src={author.avatar} />
                <p className="post__name">{author.name}</p>
            </div>
            <div className="post__favorite">
                <img className="favorite--icon" src={fav ? "../../images/bookmark_filled.png" : "../../images/bookmark_empty.png"} onClick={handleFavPostClick} />
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
                {(author.id === context.userId && hidden === false && <img className="hide--icon" src="../../images/eye.png" onClick={handleHidePost} />) || (author.id === context.userId && hidden === true && <img className="hide--icon" src="../../images/eye_slashed.png" onClick={handleHidePost} />)}
            </div>
            <div className="post__delete">
                {author.id === context.userId && <img className="delete--icon" src="../../images/delete.png" onClick={handleDeletePost} />}
            </div>
        </div>
    </article>
    }
    
    if (!hidden) {
        return <article className="inputs__box--feed">
        <div className="post__info--user">
            <div className="post__user">
                <img className="post__avatar" src={author.avatar} />
                <p className="post__name">{author.name}</p>
            </div>
            <div className="post__favorite">
                <img className="favorite--icon" src={fav ? "../../images/bookmark_filled.png" : "../../images/bookmark_empty.png"} onClick={handleFavPostClick} />
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
                {(author.id === context.userId && hidden === false && <img className="hide--icon" src="../../images/eye.png" onClick={handleHidePost} />) || (author.id === context.userId && hidden === true && <img className="hide--icon" src="../../images/eye_slashed.png" onClick={handleHidePost} />)}
            </div>
            <div className="post__delete">
                {author.id === context.userId && <img className="delete--icon" src="../../images/delete.png" onClick={handleDeletePost} />}
            </div>
        </div>
    </article>
    }
}
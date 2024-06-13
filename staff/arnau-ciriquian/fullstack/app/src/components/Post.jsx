import { context } from "../ui"
import toggleLikePost from "../logic/toggleLikePost"
import "./Post.css"
import { deletePost } from "../logic/deletePost"
import toggleFavPost from "../logic/toggleFavPost"
import toggleHidePost from "../logic/toggleHidePost"
import { utils } from "com"
import { useAppContext } from "../hooks"

const { extractSubFromToken } = utils

export default function Post({ post: { image, text, date, likes, author, id, fav, visibility }, onLikePostClick, onEditClick, onDeletePostClick, onFavPostClick, onHidePostClick }) {
    const { alert } = useAppContext()

    const handleLikePostClick = () => {
        try {
            toggleLikePost(context.token, id)
                .then(() => {
                    onLikePostClick()
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }

    const handleFavPostClick = () => {
        try {
            toggleFavPost(context.token, id)
                .then(() => {
                    onFavPostClick()
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }

    const handleHidePost = () => {
        try {
            toggleHidePost(context.token, id)
                .then(() => {
                    onHidePostClick()
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }

    const handleOpenEditModal = () => onEditClick(id)

    const handleDeletePost = () => {
        const confirmation = confirm('Are you sure that you want to delete this post? This action cannot be undone!')

        if (confirmation) {
            try {
                deletePost(context.token, id)
                    .then(() => {
                        onDeletePostClick()
                    })
                    .catch(error => alert(error.message))
            } catch (error) {
                alert(error.message)
            }
        }
    }

    console.log('Post -> Render')

    const userId = extractSubFromToken(context.token)

    if (!visibility && userId === author.id) {
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
                    <img className="like-button" src={likes && likes.includes(userId) ? './images/heart-filled.png' : './images/heart-empty.png'} onClick={handleLikePostClick} />
                    <p>{likes ? likes.length : 0}</p>
                </div>
                <div className="post__edit">
                    {author.id === userId && <img className="edit--icon" src="../../images/edit.png" onClick={handleOpenEditModal} />}
                </div>
                <div className="post__hide">
                    {(author.id === userId && visibility === true && <img className="hide--icon" src="../../images/eye.png" onClick={handleHidePost} />) || (author.id === userId && visibility === false && <img className="hide--icon" src="../../images/eye_slashed.png" onClick={handleHidePost} />)}
                </div>
                <div className="post__delete">
                    {author.id === userId && <img className="delete--icon" src="../../images/delete.png" onClick={handleDeletePost} />}
                </div>
            </div>
        </article>
    }

    if (visibility) {
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
                    <img className="like-button" src={likes && likes.includes(userId) ? './images/heart-filled.png' : './images/heart-empty.png'} onClick={handleLikePostClick} />
                    <p>{likes ? likes.length : 0}</p>
                </div>
                <div className="post__edit">
                    {author.id === userId && <img className="edit--icon" src="../../images/edit.png" onClick={handleOpenEditModal} />}
                </div>
                <div className="post__hide">
                    {(author.id === userId && visibility === true && <img className="hide--icon" src="../../images/eye.png" onClick={handleHidePost} />) || (author.id === userId && visibility === false && <img className="hide--icon" src="../../images/eye_slashed.png" onClick={handleHidePost} />)}
                </div>
                <div className="post__delete">
                    {author.id === userId && <img className="delete--icon" src="../../images/delete.png" onClick={handleDeletePost} />}
                </div>
            </div>
        </article>
    }
}
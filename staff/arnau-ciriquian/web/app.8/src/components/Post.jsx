import { users } from "../data"
import { context } from "../ui"
import toggleLikePost from "../logic/toggleLikePost"

export default function Post({ post: {image, text, date, likes, author, id}, onLikePostClick }) {
    const _users = users()
    let avatar
    let name
    for (const user of _users) {
        if (author === user.id) {
            avatar = user.avatar
            name = user.name
        }
    }

    function handleLikePostClick(event) {
        event.preventDefault()
        
        try {
            toggleLikePost(context.userId, id)
            onLikePostClick()
        }catch (error) {
            alert(error.message)
        }
    }

    return <article className="inputs__box--feed">
    <img className="home__post--image" src={image} />
    <p className="text">{text}</p>
    <div className="home__post--info">
        <div className="post__info--user">
            <img className="post__avatar" src={avatar} />
            <p className="text">{name}</p>
        </div>
        <time className="text">{date}</time>
        <img className="like-button" src={likes && likes.includes(context.userId) ? './images/heart-filled.png' : './images/heart-empty.png'} onClick={handleLikePostClick}/>
        <p>{likes ? likes.length : 0}</p>
        {author === context.userId && <button className="post__edit--button">Edit</button>}
    </div>
</article>
}
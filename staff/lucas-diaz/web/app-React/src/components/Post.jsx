import { context } from "../ui.js";


export default function Post(props) {
    //destructuring de props, para no hacer todo el tiempo props.post.userName
    const { post, user } = props

    function handleEditClick() {

    }
    function handleHeartClick() {

    }
    function handleDeleteClick() {

    }

    try {

    } catch (error) {
        alert(error.message)
    }


    return <article>
        <img className="home-post-content-article-avatar" src={user.avatar} />
        <p className="home-post-content-article-userName">{post.userName}</p>
        {post.author === context.userId ? <span className="material-symbols-rounded bin" onClick={handleDeleteClick}>
            delete
        </span> : null}
        {post.author === context.userId ? <button className="home-edit-post-modal-button" onClick={handleEditClick}>Edit</button> : null}
        <div className="post-image-container">
            <img className="home-post-content-article-img" src={post.image} />
        </div>
        <span className={post.likeCounter.includes(context.userId) ? "material-symbols-rounded material-symbols-rounded-liked" : "material-symbols-rounded"} onClick={handleHeartClick}>favorite</span>
        <p className="home-post-content-article-icon-text">{post.likeCounter.length} {post.likeCounter.length === 1 ? "like" : "likes"}</p>
        <p className="home-post-content-article-text">{post.text}</p>
        <time className="home-post-content-article-date">{post.date.toLocaleString()}</time>
    </article>
}
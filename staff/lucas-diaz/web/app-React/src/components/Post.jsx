import { context } from "../ui.js";


export default function Post(props) {

    try {


    } catch (error) {
        alert(error.message)
    }

    return <article>
        <img className="home-post-content-article-avatar" src= {props.user.avatar}/>
        <p className="home-post-content-article-userName">{props.post.userName}</p>
        <button className="home-edit-post-modal-button">Edit</button>
        <div className="post-image-container">
            <img className="home-post-content-article-img" src={props.post.image} />
        </div>
        <span className="material-symbols-rounded">favorite</span>
        <p className="home-post-content-article-icon-text">{props.post.likeCounter.length} {props.post.likeCounter.length === 1 ? "like" : "likes"}</p>
        <p className="home-post-content-article-text">{props.post.text}</p>
        <time className="home-post-content-article-date">{props.post.date.toLocaleString()}</time>
    </article>
}
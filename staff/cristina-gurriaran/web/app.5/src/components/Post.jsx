import { context } from "../ui"
import toggleLikePost from "../logic/toggleLikePost.js"

export default function Post({ post: { image, text, date, likes, id }, onLikePostClick }) {

    console.log('Post -> render')

    function handleLikePostClick(){

        try{
            toggleLikePost(context.userId, id)
            onLikePostClick()

        } catch (error){
            alert(error.message)
        }
    }


    return <article>
        <img src={image} width="200px" />
        <p>{text}</p>
        <time>{date.toLocaleString()}</time>
        <button onClick={handleLikePostClick}>{likes && likes.includes(context.userId) ? '❤️' : '🤍'} ({likes ? likes.length : 0})</button>
    </article>
}
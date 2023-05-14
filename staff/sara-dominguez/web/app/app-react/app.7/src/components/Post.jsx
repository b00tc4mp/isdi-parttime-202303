import { context } from '../ui.js'
import toogleLikePost from '../logic/toogleLikePost.js'
import deletePost from '../logic/deletePost.js'

export default function Post({ post: { id, image, text, date, likes, author}, onEditPost, onToggledLikePost, onPostDeleted}) {
    console.log('post')

    function handleEditPost() {
       onEditPost(id)
    }

    function handleToggleLikePost() {
        try{
            toogleLikePost(context.userId, id)

            onToggledLikePost()
        } catch(error){
            alert(error.message)
        }
    }

    function handleDeletePost(){
        try{
            deletePost(context.userId, id)

            onPostDeleted()
        } catch(error){
            alert(error.message)
        }
        }
    

    return <article>
        <img src={image} width="250px" />
        <p>{text}</p>
        <time>{date.toLocaleString()}</time>
        <button onClick={handleToggleLikePost}>{likes && likes.includes(context.userId) ? '❤️' : '🤍'}
        {likes? ` ${likes.length}`: ''}</button>
        {author === context.userId && <button onClick={handleEditPost}>Edit</button>}
        {author === context.userId && <button onClick={handleDeletePost}>🗑</button>}
    </article>
}
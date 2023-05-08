import { context } from '../ui.js'

export default function Post({ post: { id, image, text, date, likes, author}, onEditPost}) {
    console.log('post')

    function handleEditPost() {
       onEditPost(id)
    }

    return <article>
        <img src={image} width="250px" />
        <p>{text}</p>
        <time>{date.toLocaleString()}</time>
        <button>{likes && likes.includes(context.userId) ? '❤️' : '🤍'}
        {likes? likes.length: ''}</button>
        {author === context.userId && <button onClick={handleEditPost}>Edit</button>}
    </article>
}
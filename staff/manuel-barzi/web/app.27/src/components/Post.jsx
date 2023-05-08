import { context } from '../ui'

export default function Post({ post: { id, image, text, date, likes, author }, onEditPost }) {
    console.log('Post -> render')

    function handleEditPost() {
        onEditPost(id)
    }

    return <article>
        <img src={image} width="200px" />
        <p>{text}</p>
        <time>{date.toLocaleString()}</time>
        <button>{likes && likes.includes(context.userId) ? '❤️' : '🤍'} ({likes ? likes.length : 0})</button>
        {author === context.userId && <button onClick={handleEditPost}>📝</button>}
    </article>
}
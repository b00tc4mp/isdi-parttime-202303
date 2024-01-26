import { context } from '../ui.js'

export default function Post({ post: { image, text, date, likes } }) {
    console.log('Post -> render')

    return <article>
        <img src={image} />
        <p>{text}</p>
        <time>{date.toLocaleString()}</time>
        <button>{likes && likes.includes(context.userId) ? '❤️' : '🤍'} ({likes ? likes.length : 0})</button>
    </article>
}
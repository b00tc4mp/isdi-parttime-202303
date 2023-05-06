import { context } from '../ui.js'

export default function Post(props) {
    return <article>
        <img src={props.post.image}/>
        <p>{props.post.text}</p>
        <time>{props.post.date.toLocaleString()}</time>
        <button>{props.post.likes && props.post.likes.includes(context.userId) ? '❤️' : '🤍'}
        {props.post.likes? props.post.likes.length: ''}</button>
    </article>
}
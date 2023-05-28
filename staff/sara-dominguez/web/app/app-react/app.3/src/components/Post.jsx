import { context } from '../ui.js'

// export default function Post(props) {
//     return <article>
//         <img src={props.post.image}/>
//         <p>{props.post.text}</p>
//         <time>{props.post.date.toLocaleString()}</time>
//         <button>{props.post.likes && props.post.likes.includes(context.userId) ? '❤️' : '🤍'}
//         {props.post.likes? props.post.likes.length: ''}</button>
//     </article>
// }

// export default function Post(props) {
//     const { post } = props

//     return <article>
//         <img src={post.image}/>
//         <p>{post.text}</p>
//         <time>{post.date.toLocaleString()}</time>
//         <button>{post.likes && post.likes.includes(context.userId) ? '❤️' : '🤍'}
//         {post.likes? post.likes.length: ''}</button>
//     </article>
// }

// export default function Post({ post }) {
//     return <article>
//         <img src={post.image}/>
//         <p>{post.text}</p>
//         <time>{post.date.toLocaleString()}</time>
//         <button>{post.likes && post.likes.includes(context.userId) ? '❤️' : '🤍'}
//         {post.likes? post.likes.length: ''}</button>
//     </article>
// }


export default function Post({ post: { image, text, date, likes } }) {
    console.log('post')

    return <article>
        <img src={image} width="250px" />
        <p>{text}</p>
        <time>{date.toLocaleString()}</time>
        <button>{likes && likes.includes(context.userId) ? '❤️' : '🤍'}
        {likes? likes.length: ''}</button>
    </article>
}
import { Component } from '../library/composito.js';

export default class Post extends Component {
    constructor(post) {
        super(`<article>
            <img src="${post.image}">
            <p>${post.text}</p>
            <time>${post.date.toLocaleString()}</time>
            <button>${post.likes && post.likes.includes(context.userId) ? '❤️' : '🤍'} (${post.likes? post.likes.length : 0})</button>
            </article>`
        );
    }
}
import { Component } from '../library/mew.js' 
import Post from './post-card.js'


export default class Posts extends Component {
    constructor(posts, type) {
        super(`<section class="${type}"></section>`)

        posts.forEach(post => {
            const _post = new Post(post)
            this.add(_post)
        })
    }


}
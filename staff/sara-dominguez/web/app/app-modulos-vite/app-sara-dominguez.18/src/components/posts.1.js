import Component from './library/composito.js'
import Post from './post.js'    

export default class Posts extends Component {
    constructor(posts){
        super(`<section></section>`)

        posts.forEach(post=> {
            const _post = new Post(post)

            _post.onLikeToggled = () => this.onPostLikeToggled()
        
            this.add(_post)
        })
    }
    onPostLikeToggled() {
        throw new Error('Not overridden')
    }
    refreshPosts(posts) {
        this.container.innerHTML = ''
        
        posts.forEach(post=> {
            const _post = new Post(post)

            _post.onLikeToggled = () => this.onPostLikeToggled()
        
            this.add(_post)
        })

    }
}
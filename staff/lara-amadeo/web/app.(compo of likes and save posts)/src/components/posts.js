import { Component } from "../library/master-component"
import { Post } from "./post"

export class Posts extends Component{
    constructor(posts){
        super(`<div class="posts"></div>`)

        posts.forEach(post => {
            const _post = new Post(post)
            
            _post.onLikeButton = () => this.onPostLikeButton()
            _post.onSaveButton = () => this.onPostSavedButton()
            this.add(_post)
        })
    }

    onPostLikeButton(){
        throw new Error ('not overriden')
    }

    onPostSavedButton(){
        throw new Error('not overriden')
    }

    refreshPosts(posts){
        this.container.innerHTML = ''

        posts.forEach(post => {
            const _post = new Post(post)
            
            _post.onLikeButton = () => this.onPostLikeButton()

            this.add(_post)
        })
    }

}
import retrievePosts from "../../../app.(compo of likes and save posts)/src/logic/retrievePosts.js"
import { Component } from "../library/master-component.js"
import { context, errorToast, generateToast } from "../ui.js"
import { Post } from "./post.js"

export class Posts extends Component{
    constructor(){
        super(`
        <div class="feed">
            <div class="header">
                <p class="heading-M-bold">Home</p>
                <button class="button-S primary-button create-post-button">Create</button>
            </div>
            <div class="posts"></div>     
        </div>`)

        this.renderPosts()
    }

    renderPosts() {
        this.container.querySelector('.posts').innerHTML = ''

        try{
            const posts = retrievePosts(context.userId)

            posts.forEach(post => {
                const _post = new Post(post)
                
                _post.onLikeButton = () => this.renderPosts()
                _post.onSaveButton = () => this.renderPosts()

                this.container.querySelector('.posts').append(_post.container)
            })            
        } catch(error){
            generateToast({
                message: error.message,
                type: errorToast,
                length
            })
        }
    }

}
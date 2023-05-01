console.log('home.js')

import Component from "../library/component.js";
import retrievePosts from "../logic/posts/retrieve-posts.js";
import { context } from "../ui.js";
import Posts from '../components/posts.js'


export default class Home extends Component {
    constructor() {
        super(`<section class="section home">
            <div class="top">
                <h1>Home</h1>
                <h2 class="welcome-user"></h2>
                <button class="button--create-post">Create post <i class="material-symbols-outlined">add</i></button>
            </div>
            <div class="overlay create-post off">
                <form class="create-post">
                    <label for="text">Title of your post</label>
                    <input type="text" class="title">
                    <img class="post-image" src="" alt="">
                    <label for="file">Upload your image</label>
                    <input type="file" name="file" id="" accept=".jpg, .jpeg, .png, .webp">
                    <label for="textarea">Write your process</label>
                    <textarea name="" id="" cols="30" rows="5"></textarea>
                    <div class="buttons">
                        <button class="button--create-post_cancel" type="cancel">Cancel</button>
                        <button class="button--create-post_save" type="submit">Create post</button>
                    </div>
                </form>
            </div>
            <div class="overlay edit-post off">
                <form class="edit-post">
                    <input type="hidden">
                    <label for="text">Edit title</label>
                    <input type="text" class="title">
                    <img class="post-image" src="" alt="">
                    <label for="file">Edit your image</label>
                    <input type="file" name="file" id="" accept=".jpg, .jpeg, .png, .webp">
                    <label for="textarea">Edit your process</label>
                    <textarea name="" id="" cols="30" rows="5"></textarea>
                    <div class="buttons">
                        <button class="button--edit-post_cancel" type="cancel">Cancel</button>
                        <button class="button--edit-post_save" type="submit">Update post</button>
                    </div>
                </form>
            </div>
            <div class="posts"></div>
        </section>`)

            const posts = retrievePosts(context.userId)
            const _posts = new Posts(posts)

            this.container.querySelector('.posts').appendChild(_posts.container)

    } 
}
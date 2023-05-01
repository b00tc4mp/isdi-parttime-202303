import { Component } from '../library/composito.js'
import { context } from '../ui.js'

import Posts from '../components/posts.js'
import retrievePosts from "../logic/retrieve-posts.js"


export default class Home extends Component {
    constructor() {
        super(`<div class="home">
    <header class="home-header">
        <h1 class="title">Home</h1>

        <nav class="home-header-nav"> 
            <img class="home-header-avatar" src="" alt="">
            <a class = "name" href="">Profile</a>
        </nav>
        <button class = "button" name = "logout">Logout</button>   
    </header>

    <main></main>

    <footer class="home-footer">
        <button class="add-post-button">+</button>
    </footer>
</div>`)

        // this.container.querySelector("a") .onclick = function (event) {
        //     event.preventDefault()

        //     toggle(profilePanel, postListPanel)
        // }

        this.container.querySelector("button[name=logout]").onclick = () => {
            //avatarImage.src = DEFAULT_AVATAR_URL
            //homePage.querySelector(".name").innerText  = ""

            this.onCloseSession()
        }

        //addPostButton.onclick = () => show(addPostPanel)

        if (context.userId && context.userId !== '') {
            const posts = retrievePosts(context.userId)

            const tmpPosts = new Posts(posts)
            
            tmpPosts.onPostLikeToggled = () => {
                const posts = retrievePosts(context.userId)
                
                tmpPosts.refreshPosts(posts)
            }

            tmpPosts.onPostSaveToggled = () => {
                const posts = retrievePosts(context.userId)
                
                tmpPosts.refreshPosts(posts)
            }

            this.container.querySelector('main').appendChild(tmpPosts.container)
        }
    }

    onCloseSession() {
        throw new Error('not overridden')
    }

    loadPosts() {
        const posts = retrievePosts(context.userId)

        const tmpPosts = new Posts(posts)
        
        tmpPosts.onPostLikeToggled = () => {
            const posts = retrievePosts(context.userId)
            
            tmpPosts.refreshPosts(posts)
        }

        tmpPosts.onPostSaveToggled = () => {
            const posts = retrievePosts(context.userId)
            
            tmpPosts.refreshPosts(posts)
        }

        this.container.querySelector('main').appendChild(tmpPosts.container)
    }
}

/*
    <section class="profile container off">
        <h2>Update avatar</h2>

        <form class="profile-avatar-form">
            <input class="input" type="url" name="url">
            <button class="button" type="submit">Update</button>
        </form>

        <h2>Update password</h2>

        <form class="profile-password-form" action="">
            <input class="input" type="password" name="password" placeholder="password">
            <input class="input" type="password" name="newPassword" placeholder="new password">
            <input class="input" type="password" name="newPasswordConfirm" placeholder="new password confirmation">
            <button class="button" type="submit">Update</button>
        </form>
    </section>

    <section class="add-post container off">
        <form class="container">
            <input class="input" type="url" name="image" placeholder="image url">
            <textarea class="input" name="text" cols="30" rows="10" placeholder="text"></textarea>
            <button class="button" type="submit">Create</button>
            <button class="button cancel" type="button">Cancel</button>
        </form>
    </section>

    <section class="edit-post container off">
        <form class="container">
            <input class="input" type="hidden" name="postId">
            <input class="input" type="url" name="image" placeholder="image url">
            <textarea class="input" name="text" cols="30" rows="10" placeholder="text"></textarea>
            <button class="button" type="submit">Update</button>
            <button class="button cancel" type="button">Cancel</button>
        </form>
    </section>
    
    <section class="post-list">
    </section>
*/
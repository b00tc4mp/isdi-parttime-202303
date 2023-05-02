import Component from "../library/composito.js";
import { createNewPost } from "../logic/create-new-post.js";
import { context } from "../ui.js";

export default class NewPost extends Component {
    constructor() {
        super(`<div class="home__post page">
            <form class="post__form">
                <input class="form__input" type="text" name="newPostImage" placeholder="new post image url">
                <textarea class="form__input--text" name="newPostText" cols="30" rows="10" placeholder="new post text"></textarea>
                <div class="new-post__form--buttons">
                    <button class="form__button" type="submit">Post</button>
                    <button class="form__button cancel__button" type="button">Cancel</button>
                </div>
            </form>
        </div>`)

        this.container.querySelector('.post__form').onsubmit = event => {
            event.preventDefault()
        
            const newPostImage = event.target.newPostImage.value
            const newPostText = event.target.newPostText.value
        
            try {
                createNewPost(context.userID, newPostImage, newPostText)
                
                //homePagePost.querySelector('.post__form').reset()
                
                //retrievePosts(context.userID)

                this.onPostedOrCanceled()
                alert ('Posted!')
            } catch (error) {
                alert(error.message)
            }
            
        }

        this.container.querySelector('.cancel__button').onclick = event => {
            event.preventDefault()

            this.onPostedOrCanceled()
        }
    }

    onPostedOrCanceled() {
        throw new Error('not overriden')
    }
}
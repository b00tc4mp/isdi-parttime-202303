import Component from "../library/composito";
import createPost from "../logic/create-post.js";
import { context } from "../ui";

export default class AddPostModal extends Component {
    constructor() {
        super(`<section class="home-add-post-modal">
        <form class="form">
            <label for="url">Create post:</label>
            <input type="url" class="form-post-url-input form-item" name="url" placeholder="Enter an image by typing a url">
            <textarea name="text" cols="30" rows="5" placeholder="What do yo want to say ??"></textarea>
            <div class="form-buttons">
                <button type="button" class="form-post-cancel-button">Cancel   </button>
                <button type="submit" class="form-post-submit-button">Update post</button>
                <p class="fail-warning red"></p>
            </div>
        </form>
    </section>`)

        this.container.querySelector(".form-post-cancel-button").onclick = () => {
            this.onCancelButton();
        }
        this.container.querySelector("form").onsubmit = event => {
            event.preventDefault();

            const image = event.target.url.value
            const text = event.target.text.value

            try{
                createPost(context.userId , image , text);
                this.onPostCreated()

            }catch(error){
                this.container.querySelector(".fail-warning").textContent = error.message;
            }
        }
    }

    onCancelButton(){
        throw new Error ("Not overriden")
    }

    onPostCreated(){
        throw new Error ("Not overriden")
    }
}
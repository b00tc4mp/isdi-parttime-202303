import Component from '../library/composito.js'
import { context } from '../ui.js'
import createPost from '../logic/create-post.js'

export default class AddPostModal extends Component {
    constructor() {
        super(`<section class="modal-window" name="modal-new-post">
        <form class="form-new-post" action="">
            <input class="input-field" type="url" name="url" placeholder="Insert image url">
            <textarea name="text" cols="30" rows="10" class="post-text input-field" placeholder="Insert caption"></textarea>
            <div class="buttons">
                <button class="submit-buttons submit-post" type="submit">Post</button>
                <button class="submit-buttons cancel-post" type="button">Cancel</button>
            </div>
        </form>
        </section>`)

        this.container.querySelector('.cancel-post').onclick = (event) => {
            event.preventDefault()
            this.cancelPost()
        }

        this.container.querySelector('form').onsubmit = (event) => {
            event.preventDefault()
            const image = this.container.querySelector('input[name=url]').value
            const text = this.container.querySelector('textarea[name=text]').value
    
            try {
                createPost(context.userId, image, text)
    
                this.container.querySelector('form').reset()
    
                alert('post created')
    
                renderPosts()
            } catch(error){
                    alert(error.message)
                    console.log(error)
            }
        }
    }

    cancelPost() {
        throw new Error('Not overriden')
    }

    submitPost() {
        throw new Error('Not overriden')
    }
}
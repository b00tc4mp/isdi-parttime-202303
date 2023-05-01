import { Component } from '../library/composito.js'
import { context } from '../ui.js'
import createPost from '../logic/create-post.js'

export default class AddPostModal extends Component {
    constructor() {
        super(`<section class="add-post container">
        <form class="container">
            <input class="input" type="url" name="image" placeholder="image url">
            <textarea class="input" name="text" cols="30" rows="10" placeholder="text"></textarea>
            <button class="button" type="submit">Create</button>
            <button class="button cancel" type="button">Cancel</button>
        </form>
    </section>`)

        this.container.querySelector('.cancel').onclick = event => {
            event.preventDefault()

            this.onCancel()
        }

        this.container.querySelector('form').onsubmit = event => {
            event.preventDefault()
        
            const image = event.target.image.value
            const text = event.target.text.value
        
            try {
                createPost(context.userId, image, text)
    
                this.onPostCreated()
            } catch (error) {
                alert(error.message)
            }
        }
    }

    onCancel() {
        throw new Error('not overridden')
    }

    onPostCreated() {
        throw new Error('not overridden')
    }
}
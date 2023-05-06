import Component from './library/composito.js'

export default class AddPostModal extends Component {
    constructor() {
        super(
            `<section class="add-post container">
                <form class="add-post-form container">
                    <input class="input" type="url" name="imageUrl" placeholder="image url">
                    <textarea class="input" name="text" cols="30" rows="10" placeholder="text"></textarea>
                    <button class="button" type="submit">Create</button>
                    <button class="button cancel" type="button">Cancel</button> 
                </form>
            </section>`)

    }
}
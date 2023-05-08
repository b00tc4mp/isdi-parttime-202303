import { context } from '../ui'

import updatePost from '../logic/updatePost'

export default function EditPost({ onCancel, onEditedPost, postId, onMenssageAlert}) {
    function handleCancel(event) {  
        event.preventDefault()

        onCancel()
    }

    function handleEditPost(event) {
        event.preventDefault()

        const image = event.target.image.value
        const text = event.target.text.value

        try {
            updatePost (context.userId, postId, image, text)

            onEditedPost()
        } catch(error) {
            onMenssageAlert(error.message)
        }
    }

    return <section className="edit-post container">
    <form className="container" onSubmit={handleEditPost}>
        <input className="input" type="hidden" name="postId"/>
        <input className="input" type="url" name="image" placeholder="image url"/>
        <textarea className="input" name="text" cols="30" rows="10" placeholder="text"></textarea>
        <button className="button" type="submit">Update</button>
        <button className="button cancel" type="button" onClick={handleCancel}>Cancel</button>
    </form>
</section>
}
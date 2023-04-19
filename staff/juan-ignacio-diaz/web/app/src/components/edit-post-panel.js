import updatePost from "../logic/update-post.js"
import { context, hide } from "../ui.js"

import { msAlert } from "../pages/alert-page.js"

export default function initEditPostPanel(homePage, renderPosts) {
    const editPostPanel = homePage.querySelector('.edit-post')
    const editPostForm = editPostPanel.querySelector('form')

    editPostForm.onsubmit = function(event) {
        event.preventDefault()

        const postId = event.target.postId.value
        const image = event.target.image.value
        const text = event.target.text.value

        try {
            updatePost (context.userId, postId, image, text)

            hide(editPostPanel)

            renderPosts()
        } catch (error) {
            msAlert(error.message)
        }
    }

    editPostForm.querySelector('.cancel').onclick = function(event) {
        editPostForm.reset()

        hide(editPostPanel)
    }

    return { editPostPanel, editPostForm }
}
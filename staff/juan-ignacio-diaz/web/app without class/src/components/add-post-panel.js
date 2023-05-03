import createPost from "../logic/create-post.js"
import { context, hide } from "../ui.js" 

import { msAlert } from "../pages/alert-page.js" 

export default function initAddPostPanel(homePage, renderPosts) {
    const addPostPanel = homePage.querySelector(".add-post")
    const addPostFrom = addPostPanel.querySelector("form")

    addPostFrom.onsubmit = function(event) {
        event.preventDefault()

        const image = event.target.image.value
        const text = event.target.text.value
        
        try {
            createPost(context.userId, image, text)

            hide(addPostPanel)
            addPostFrom.reset

            renderPosts()
        } catch(error) {
            msAlert(error.message)
        }
    }

    addPostFrom.querySelector(".cancel").onclick = function() {
        addPostFrom.reset()

        hide(addPostPanel)
    }

    return addPostPanel
}
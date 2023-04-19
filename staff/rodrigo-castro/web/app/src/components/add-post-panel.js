import { renderPosts } from "../pages/home-page.js"
import { hideElement, context } from "../ui.js"
import { savePosts } from "../data.js"
import createPost from "../logic/create-post.js"

export default function initNewPostModal(homePage) {
    const newPostModal = homePage.querySelector('section[name=modal-new-post]')
    const cancelModal = newPostModal.querySelector('.cancel-post')

    cancelModal.onclick = () => {
        hideElement(newPostModal)
    }

    newPostModal.querySelector('form').onsubmit = (event) => {
        event.preventDefault()
        const image = newPostModal.querySelector('[name=url]').value
        const text = newPostModal.querySelector('[name=text]').value

        try {
            createPost(context.userId, image, text)

            newPostModal.querySelector('form').reset()

            hideElement(newPostModal)

            alert('post created')

            savePosts()

            renderPosts()
        } catch(error){
                alert(error.message)
                console.log(error)
        }
    }
    return { newPostModal }
}
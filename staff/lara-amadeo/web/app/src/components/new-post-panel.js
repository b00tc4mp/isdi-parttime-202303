import { createPost } from "../logic/createPost.js"
import { getImageFromLocal } from "../logic/getImageFromLocal.js"
import { showPosts } from "../logic/showPosts.js"
import { hide, context } from "../ui.js"

export const createPostModal = document.querySelector('.creation-post-modal')
const createPostForm = createPostModal.querySelector('form')


//new post image preview
createPostForm.querySelector('input[name=imageUrl]').addEventListener('change', function (event) {
    event.preventDefault()

    const uploadedFile = event.target.files[0]
    const imagePreview = createPostForm.querySelector('.update-avatar-image-preview')
    try {
        getImageFromLocal(uploadedFile, imageUrl => {
            const srcData = imageUrl
            imagePreview.src = srcData
        })
    } catch (error) {
        createPostForm.querySelector('.error-message').textContent = error.message
    } finally{
        createPostForm.querySelector('.error-message').textContent = ''
    }
})

//Confirm create new post
createPostForm.querySelector('#post-publication').onclick = (event) => {
    event.preventDefault()

    const image = createPostForm.querySelector('.update-avatar-image-preview').src
    const caption = createPostForm.querySelector('input[name=caption]').value

    try {
        createPost(context.userId, image, caption)
        createPostForm.querySelector('.success-message').textContent = 'Post created'
        showPosts()
        hide(createPostModal)
    } catch (error) {
        createPostForm.querySelector('.error-message').textContent = error.message
    } finally{
        createPostForm.querySelector('.success-message').innerHTML = ''
        createPostForm.querySelector('.error-message').innerHTML = ''
    }
}

createPostForm.querySelector('#cancel-post-publication').onclick = (event) => {
    event.preventDefault()
    hide(createPostModal)
}

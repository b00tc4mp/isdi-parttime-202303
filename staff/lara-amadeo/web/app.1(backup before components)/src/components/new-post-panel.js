import { createPost } from "../logic/createPost.js"
import { getImageFromLocal } from "../logic/getImageFromLocal.js"
import { showPosts } from "../logic/showPosts.js"
import { hide, context, generateToast, successToast } from "../ui.js"

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
        generateToast({
            message: error.message,
            type: errorToast, 
            length: '3000ms'
        })
    }
})

//Confirm create new post
createPostForm.querySelector('#post-publication').onclick = (event) => {
    event.preventDefault()

    const image = createPostForm.querySelector('.update-avatar-image-preview').src
    const caption = createPostForm.querySelector('input[name=caption]').value

    try {
        createPost(context.userId, image, caption)
        generateToast({
            message: 'Post created!',
            type: successToast,
            length
        })
        showPosts()
        hide(createPostModal)
    } catch (error) {
        generateToast({
            message: error.message,
            type: errorToast, 
            length: '3000ms'
        })
    }
}

createPostForm.querySelector('#cancel-post-publication').onclick = (event) => {
    event.preventDefault()
    hide(createPostModal)
}

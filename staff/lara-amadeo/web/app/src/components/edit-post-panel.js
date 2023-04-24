import { getImageFromLocal } from "../logic/getImageFromLocal.js"
import { showPosts } from "../logic/showPosts.js"
import { hide } from "../ui.js"
import { posts, savePostInStorage } from "../data.js"

export const editPostModal = document.querySelector('.edit-post-modal')

    //edit post image preview
    editPostModal.querySelector('input[type=file]').addEventListener('change', function(event){
        event.preventDefault()
        const uploadedFile = event.target.files[0]
        const imagePreview = editPostModal.querySelector('.edit-post-image-preview')
        try{
            getImageFromLocal(uploadedFile, imageUrl => {
                const srcData = imageUrl
                imagePreview.src = srcData
            })
        } catch(error){
            editPostModal.querySelector('.error-message').textContent = error.message
        } finally {
            editPostModal.querySelector('.error-message').innerHTML = ''
        }
    })
    
    editPostModal.querySelector('#save-edit-post').onclick = (event) => {
        event.preventDefault()
    
        const postId = editPostModal.querySelector('input[type=hidden]').value
        const postImgSrc = editPostModal.querySelector('.edit-post-image-preview').src
        const postCaption = editPostModal.querySelector('.text-area').value
    
        const _posts = posts()
        const post = _posts.find(_post => _post.id === postId)
    
        try{
            post.image = postImgSrc
            post.text = postCaption
            savePostInStorage(post)
            showPosts()
            editPostModal.querySelector('.success-message').innerHTML = 'Post updated'
            hide(editPostModal)
        } catch(error){
            editPostModal.querySelector('.error-message').innerHTML = error.message
        } finally {
            editPostModal.querySelector('.success-message').innerHTML = ''
            editPostModal.querySelector('.success-message').innerHTML = ''
        }
    }
    
    editPostModal.querySelector('#cancel-edit-post').onclick = (event) => {
        event.preventDefault()
        hide(editPostModal)
    }

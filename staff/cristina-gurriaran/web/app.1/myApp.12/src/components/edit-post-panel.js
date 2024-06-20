import { context, hide } from '../ui.js'
import updatePost from '../logic/update-post.mjs'



export default function initEditPostPanel(homePage, renderPosts){


    const editPostPanel = homePage.querySelector('.edit-post')
    const editPostForm = editPostPanel.querySelector('form')


    editPostForm.onsubmit = event => {
        event.preventDefault()
    
        const postId = event.target.postId.value
        const image = event.target.image.value
        const text = event.target.text.value
    
    
        try{
            updatePost(context.userId, postId, image, text)
            hide (editPostPanel)
            renderPosts()
    
        } catch(error) {
            alert(error.message)
        }
    
    }
    
    editPostForm.querySelector('.cancel').onclick = event => {
        event.preventDefault()
        
        editPostForm.reset()
        hide(editPostPanel)
    }

    return editPostPanel

}
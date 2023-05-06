import { context, hide } from "../ui.js"
import { updatePost } from "../logic/update-post.js"

export default function initEditPostPanel (homePage, renderPosts){
    const editPostPanel = homePage.querySelector('.edit-post')
    const editPostForm = editPostPanel.querySelector('.edit-post-form')

    //edit post (update post) / post form
    editPostForm.onsubmit = function(event){
        event.preventDefault()

        const postId= event.target.postId.value
        const imageUrl = event.target.imageUrl.value
        const text = event.target.text.value

        try{
            updatePost(context.userId, postId, imageUrl, text)
            renderPosts()
            alert('your post has been updated')
        }catch(error) {
            alert(error.message)
        }

        hide(editPostPanel)
    }

    //button cancel post (update post)

    editPostForm.querySelector('.cancel').onclick = function(event){
        event.preventDefault()

        editPostForm.reset()
        hide(editPostPanel)
    }
    
    return { editPostPanel, editPostForm }
}

//edit button no existe como tal, está en cada uno de mis posts. Con Javascript no puedo ponerle un onclick a un elemento creado de forma declarativa. Hay que declararlo imperativamente si o si. Con Reac si podriamos.
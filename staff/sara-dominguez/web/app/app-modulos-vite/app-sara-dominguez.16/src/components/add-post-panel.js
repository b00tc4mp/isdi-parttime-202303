import  { show, hide, context } from '../ui.js'
import createPost  from '../logic/create-post.js'


export default function initAddPostPanel (homePage, renderPosts) {
    const addPostPanel = homePage.querySelector('.add-post')
    const addPostForm = addPostPanel.querySelector('.add-post-form')
    const addPostButton = homePage.querySelector('.add-post-button')

    // add post button

    addPostButton.onclick = function(event){
        show(addPostPanel)
    }

    //create post / post form

    addPostForm.onsubmit = function(event){
        event.preventDefault()

        const imageUrl = event.target.imageUrl.value
        const text = event.target.text.value


        try{
            createPost(context.userId, imageUrl, text)

            alert('your post has been created')
        }catch(error) {
            alert(error.message)
        }
        addPostForm.reset()
        renderPosts()
        hide(addPostPanel)
    }

    //button cancel post (add post)

    addPostForm.querySelector('.cancel').onclick = function(event){
        event.preventDefault()

        addPostForm.reset()
        hide(addPostPanel)
    }
}
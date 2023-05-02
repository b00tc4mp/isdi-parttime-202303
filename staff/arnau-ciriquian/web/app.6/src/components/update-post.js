import { updatePost } from "../logic/update-post.js"
import { showHideContainer, context } from "../ui"
import retrievePosts from "../logic/retrive-posts"
import { homePageMain } from "../pages/home-page.js"

export default function initUpdatePost(homePage) {
    const homePostEdit = homePage.querySelector('.home__post--edit')

    homePostEdit.querySelector('.post__form').onsubmit = function(event) {
        event.preventDefault()
    
        const newPostImage = event.target.newPostImage.value
        const newPostText = event.target.newPostText.value
        const postId = homePostEdit.querySelector('input[type=hidden]').value
    
        try {
            updatePost(context.userID, postId, newPostImage, newPostText)
            
            homePostEdit.querySelector('.post__form').reset()
            showHideContainer(homePostEdit, homePageMain)
            retrievePosts(context.userID)
        } catch (error) {
            alert(error.message)
        }
        
        alert ('Updated!')
    }

    return homePostEdit
}


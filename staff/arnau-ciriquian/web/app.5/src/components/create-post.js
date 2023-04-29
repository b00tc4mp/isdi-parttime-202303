import { createNewPost } from "../logic/create-new-post.js"
import { showHideContainer, context } from "../ui"
import retrievePosts from "../logic/retrive-posts"
import { homePageMain } from "../pages/home-page.js"

export default function initCreatePost(homePage) {
    const homePagePost = homePage.querySelector('.home__post')
    
    homePagePost.querySelector('.post__form').onsubmit = function(event) {
        event.preventDefault()
    
        const newPostImage = event.target.newPostImage.value
        const newPostText = event.target.newPostText.value
    
        try {
            createNewPost(context.userID, newPostImage, newPostText)
            
            homePagePost.querySelector('.post__form').reset()
            showHideContainer(homePagePost, homePageMain)
            retrievePosts(context.userID)
        } catch (error) {
            alert(error.message)
        }
        
        alert ('Posted!')
    }

    return homePagePost
}

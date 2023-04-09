import { posts } from "../data.js"
import { findUserbyId } from "./helpers/data-managers.js"
import { feedPost } from "../pages/home-page.js"

export function showPosts(){

    if(posts.length > 1) {
    
        posts.forEach(post =>{
            let postUserAvatar = feedPost.querySelector('.post-avatar')
            let postUsername = feedPost.querySelector('.post-user-data-info-username')
            let postDate = feedPost.querySelector('.post-user-data-info-time')
            let postImage = feedPost.querySelector('.user-post-image')
            let postCaption = feedPost.querySelector('.post-caption-text')
    
            const userId ='user-' + Number((post.id).slice(5))
            const user = findUserbyId(userId)
    
            postUsername.innerHTML = user.username
            postUserAvatar.src = user.avatar
            postImage.src = post.image
            postCaption.innerHTML = post.text
            postDate.innerHTML = post.date 
        })
    }
}

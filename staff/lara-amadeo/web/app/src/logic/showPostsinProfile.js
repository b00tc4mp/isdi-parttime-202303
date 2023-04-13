import { context } from "../ui.js"
import { posts } from "../data.js"

export function showPostsInProfile(){

    const userPost = posts.filter(post => post.author === context.userId)

    document.querySelector('.personal-profile-posts').innerHTML = ''

    userPost.toReversed().forEach(post => {

        const personalProfilePosts = document.querySelector('.personal-profile-posts')

        const personalProfilePostImage = document.createElement('img')
        personalProfilePostImage.src = post.image
        personalProfilePostImage.classList.add('personal-profile-post')

        personalProfilePosts.appendChild(personalProfilePostImage)
    })
}
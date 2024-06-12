import { context } from "../ui.js"
import { posts } from "../data.js"

export function showPostsInProfile(){

    const _posts = posts()
    const userPost = _posts.filter(post => post.author === context.userId)

    document.querySelector('.personal-profile-posts').innerHTML = ''

    userPost.toReversed().forEach(post => {

        const postId = post.id

        const personalProfilePosts = document.querySelector('.personal-profile-posts')

        const postImageContainer = document.createElement('div')
        postImageContainer.classList.add('personal-profile-post-container')

        const personalProfilePostImage = document.createElement('img')
        personalProfilePostImage.src = post.image

        personalProfilePostImage.classList.add('personal-profile-post')
        personalProfilePostImage.classList.add(postId)

        postImageContainer.appendChild(personalProfilePostImage)

        personalProfilePosts.append(postImageContainer)
    })
}
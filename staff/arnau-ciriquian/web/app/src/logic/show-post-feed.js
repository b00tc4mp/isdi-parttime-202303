import { users } from "../data.js"
import { context } from "../ui.js"
import retrievePosts from "./retrivePosts.js"

export default function showPostFeed() {
    try {
        const posts = retrievePosts(context.userID)

        let latestPostImage
        let latestPostText
        let latestPostAuthor
        let latestPostDate
        let latestPost
        let postFeed = ''

        posts.forEach(post => {
            latestPostImage = post.image
            latestPostText = post.text
            for (const user of users) {
                if (post.author === user.id) {
                    latestPostAuthor = user.name
                }
            }
            latestPostDate = post.date.toLocaleString()

            latestPost = `<article class="inputs__box--feed">
                <img class="home__post--image" src="${latestPostImage}">
                <p class="text">${latestPostText}</p>
                <div class="home__post--info">
                <p class="text">${latestPostAuthor}</p>
                <p class="text">${latestPostDate}</p>
                </div></article>`
            
            postFeed += latestPost
        });
        
        return postFeed
    } catch(error) {
        alert(error.message)
    }
}
import { posts, users } from "../data"
import { validateId } from "./helpers/validators"

export function showPostFeed() {
    /*separar en una funcio retriveposts per guardar els post ja reversed (toReverse) i fer les validacions de id validateId(userId) i llavors aqui poder fer un forEach */

    let latestPostImage
    let latestPostText
    let latestPostAuthor
    let latestPostDate
    let latestPost
    let postFeed = ''

    for (let i = posts.length - 1; i >= 0; i-- ) {
        const post = posts[i]
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
    }
    
    return postFeed
}
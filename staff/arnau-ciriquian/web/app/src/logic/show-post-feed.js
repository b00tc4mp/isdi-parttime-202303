import { posts, users } from "../data.js"

export function showPostFeed() {
    const postImage = posts[0].image
    const postText = posts[0].text
    let postAuthor
    for (const element of users) {
        if (posts[0].author === element.id) {
            postAuthor = element.name
        }
    }
    const postDate = posts[0].postDate

    const postFeed = `<div class="inputs__box--feed">
    <img class="home__post--image" src="${postImage}">
    <p class="text">${postText}</p>
    <div class="home__post--info">
    <p class="text">${postAuthor}</p>
    <p class="text">${postDate}</p>
    </div></div>`
    
    return postFeed
}
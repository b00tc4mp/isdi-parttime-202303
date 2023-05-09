import { validateId, validateText, validateUrl } from "./helpers/validators";
import { posts, savePosts } from "../data";
import { findUserById } from "./helpers/data-managers";
import showPostFeed from "./show-post-feed";

export function updatePost(userId, postId, image, text) {
    
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateUrl(image, 'image url')
    validateText(text, 'post text')

    const foundUser = findUserById(userId)
    if (!foundUser) throw new Error(`user not found`)

    if(!posts.find(post => post.id === postId)) throw new Error('post not found')

        // aplicar nomes quan es corregeixin els data-managers a funcions if i daquesta manera crear la const post que se li retorna les dades del post quan es crida la funcio findpostbyid -> if (post.author !== postId) throw new Error('post with id ${postid}  not found')

    posts.forEach(post => {
        if (post.id === postId) {
            post.image = image
            post.text = text
        }
    })

    savePosts()
    showPostFeed()
}
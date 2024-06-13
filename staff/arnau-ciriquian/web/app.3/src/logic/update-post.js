import { validateId, validateText, validateUrl } from "./helpers/validators";
import { savePost } from "../data";
import { findUserById, findpostbyid } from "./helpers/data-managers";
import showPostFeed from "./show-post-feed";

export function updatePost(userId, postId, image, text) {
    
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateUrl(image, 'image url')
    validateText(text, 'post text')

    const user = findUserById(userId)
    if (!user) throw new Error(`user not found`)

    const post = findpostbyid(postId)
    if(!post) throw new Error('post not found')

        // aplicar nomes quan es corregeixin els data-managers a funcions if i daquesta manera crear la const post que se li retorna les dades del post quan es crida la funcio findpostbyid -> if (post.author !== postId) throw new Error('post with id ${postid}  not found')

    post.image = image
    post.text = text
    post.date = (new Date).toLocaleDateString('en-UK')
    
    savePost(post)
    showPostFeed()
}
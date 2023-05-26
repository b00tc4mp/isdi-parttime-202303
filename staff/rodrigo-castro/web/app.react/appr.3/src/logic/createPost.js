import { validateId, validateUrl, validateText } from './helpers/validators'
import { findUserById } from './helpers/dataManagers'
import { posts, savePosts } from '../data'

export function createPost(userId, image, text) {
    validateId(userId)
    validateUrl(image)
    validateText(text)

    const user = findUserById(userId)

    if(!user) throw new Error(`User with id ${userId} not found`) // maybe un something went wrong al usuario y este mensaje por consola

    const _posts = posts()
    
    let id = 'post-1'
    
    const lastPost = _posts[_posts.length - 1]

    if(lastPost)
        id = 'post-' + (parseInt(lastPost.id.slice(5)) + 1)

    const post = {
        id,
        author: userId,
        image,
        text,
        date: new Date,
        likedBy: []
    }

    _posts.push(post)

    savePosts(_posts)
}
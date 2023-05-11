import { validateId, validateUrl, validateText } from './helpers/validators'
import { findUserById, newPostId } from './helpers/dataManagers'
import { posts, savePosts } from '../data'

export default function createPost(userId, image, text) {
    validateId(userId, 'user id')
    validateUrl(image, 'image url')
    validateText(text)

    const user = findUserById(userId)

    if (!user) throw new Error(`user with id ${userId} not found`)

    const tmpPosts = posts()

    tmpPosts.push({
        id: newPostId(),
        author: userId,
        image,
        text,
        date: new Date
    })

    savePosts(tmpPosts)
}
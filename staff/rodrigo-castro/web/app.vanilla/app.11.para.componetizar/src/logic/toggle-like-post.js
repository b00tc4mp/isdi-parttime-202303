import { validateId } from './helpers/validators.js'
import { savePost } from "../data.js"
import { findPostById, findUserById } from "./helpers/data-managers.js"

export default (userId, postId) => {    
    validateId(userId, 'user id')
    validateId(postId, 'post id')

    const user = findUserById(userId)

    if(!user) throw new Error (`User id ${userId} not found`)

    const post = findPostById(postId)

    if(!post) throw new Error (`Post id ${postId} not found`)
    
    if(!post.likedBy.includes(user.id)){
        post.likedBy.push(user.id)
    } else {
        const index = post.likedBy.indexOf(user.id)
        post.likedBy.splice(index, 1)
    }

    savePost(post)
}
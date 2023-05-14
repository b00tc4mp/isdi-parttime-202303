import { validateId } from "./helpers/validators.js"
import { users } from "../data.js"
import { findPostById } from "./helpers/dataManagers.js"


export default function retrievePost(userId, postId) {
    validateId(userId)
    validateId(postId)

    const foundUser = users().some(user => user.id === userId)

    if(!foundUser) throw new Error(`User with ${userId} not found`)

    const post= findPostById(postId)
    if (!post) throw new Error('post not found') 

    return post

}
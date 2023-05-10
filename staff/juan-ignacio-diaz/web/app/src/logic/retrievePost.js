import { users } from "../data"
import { validateId } from "./helpers/validators"
import { findPostById } from './helpers/dataManagers'


export default function retriewePost(userId, postId){
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    
    const user = users().some(user => user.id === userId)

    if (!user) throw new Error(`user with id ${userId} not found`)

    const post = findPostById(postId)

    if (!post) throw new Error(`post with id ${postId} not found`)

    return post
}
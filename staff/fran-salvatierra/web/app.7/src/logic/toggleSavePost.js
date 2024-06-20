import { validateId } from './helpers/validators'
import { saveUser } from "../data"
import { findPostById, findUserById } from "./helpers/dataManagers"

export default (userId, postId) => {    
    validateId(userId, 'user id')
    validateId(postId, 'post id')

    const user = findUserById(userId)

    if(!user) throw new Error (`User id ${userId} not found`)

    const post = findPostById(postId)

    if(!post) throw new Error (`Post id ${postId} not found`)

    if(!user.savedPosts){
        user.savedPosts = [postId]
    } else {
        const index = user.savedPosts.indexOf(postId)

        if(index < 0)
            user.savedPosts.push(postId)
        else{
            user.savedPosts.splice(index, 1)

            if(!user.savedPosts.length) delete user.savedPosts
        }
    }

    saveUser(user)
}
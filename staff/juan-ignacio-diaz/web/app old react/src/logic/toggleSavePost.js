import { findUserById, findPostById } from "./helpers/dataManagers";
import { validateId } from "./helpers/validators";
import { saveUser } from "../data"

export default function toggleSavePost(userId, postId) {
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    
    const user = findUserById(userId)
    
    if (!user) throw new Error("Error to user")

    if (!findPostById(postId)) throw new Error(`post with id ${postId} not found`)

    if (!user.savePosts) {
        user.savePosts = [postId]
    } else {
        const index = user.savePosts.indexOf(postId)

        if (index < 0)
            user.savePosts.push(postId)
        else {
            user.savePosts.splice(index, 1)

            if (!user.savePosts.length) delete user.savePosts
        } 
    }

    saveUser(user)
}
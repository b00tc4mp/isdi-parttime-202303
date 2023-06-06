import { posts } from "../data"
import { findUserById } from "./helpers/dataManagers";
import { validateId } from "./helpers/validators"


export default function retrieweSavePosts(userId){
    validateId(userId, 'user id')
    
    const user = findUserById(userId)

    if (!user) throw new Error(`user with id ${userId} not found`)

    return posts().filter(post => (user.savePosts && user.savePosts.includes(post.id))).toReversed()
}
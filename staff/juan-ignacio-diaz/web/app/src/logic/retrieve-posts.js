import { posts, users } from "../data.js"
import { validateId } from "./helpers/validators.js"


//traverse post
//    add text
//    add date
//    add image

export default function retriewePosts(userId){
    validateId(userId, 'user id')
    
    const found = users.some(user => user.id === userId)

    if (!found) throw new Error(`user with id ${userId} not found`)

    return posts.toReversed()
}
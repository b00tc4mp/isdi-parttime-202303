import { posts, users } from "../data.mjs"
import { validateId } from "./helpers/validators.mjs"


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
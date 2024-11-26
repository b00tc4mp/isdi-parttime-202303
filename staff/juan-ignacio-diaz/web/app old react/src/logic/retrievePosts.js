import { posts, users } from "../data"
import { validateId } from "./helpers/validators"


export default function retriewePosts(userId){
    validateId(userId, 'user id')
    
    const user = users().some(user => user.id === userId)

    if (!user) throw new Error(`user with id ${userId} not found`)

    return posts().toReversed()
}
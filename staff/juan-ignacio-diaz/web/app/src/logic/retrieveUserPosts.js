import { posts, users } from "../data"
import { validateId } from "./helpers/validators"


export default function retrieweUserPosts(userId){
    validateId(userId, 'user id')
    
    const user = users().some(user => user.id === userId)

    if (!user) throw new Error(`user with id ${userId} not found`)

    return posts().filter(post => post.author === userId).toReversed()
}
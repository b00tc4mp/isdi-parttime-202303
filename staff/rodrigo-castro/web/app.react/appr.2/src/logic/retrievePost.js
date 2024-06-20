import { validateId } from "./helpers/validators"
import { users, posts } from "../data"

export default function retrievePost(userId, postId) {
    validateId(userId, 'user id')

    validateId(postId, 'post id')

    const foundUser = users().some(user => user.id === userId)

    if(!foundUser) throw new Error ('User id not valid')

    const foundPost = posts().find(post => post.id === postId)

    if(!foundPost) throw new Error ('Post id not valid')

    return foundPost
}
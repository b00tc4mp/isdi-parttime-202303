import { validateId } from "./helpers/validators"
import { findUserById, findPostById } from "../data"

export default function retrievePost(userId, postId) {
    validateId(userId, 'user id')

    validateId(postId, 'post id')

    const foundUser = findUserById(userId)

    if(!foundUser) throw new Error ('User id not valid')

    const foundPost = findPostById(postId)

    if(!foundPost) throw new Error ('Post id not valid')

    return foundPost
}
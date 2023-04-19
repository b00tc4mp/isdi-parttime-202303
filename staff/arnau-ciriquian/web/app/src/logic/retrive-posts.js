import { posts, users } from "../data.js";
import { validateId } from "./helpers/validators.js";

export default function retrievePosts(userId) {
    validateId(userId, 'user id')

    const user = users.some(user => user.id === userId)

    if (!user) throw new Error(`user with id ${userId} not found`)

    return posts.toReversed()
}
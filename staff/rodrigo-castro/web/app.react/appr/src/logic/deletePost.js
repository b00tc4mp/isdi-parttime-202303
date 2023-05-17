import { validateId } from "./helpers/validators"
import { posts, savePosts, findUserById, findPostById } from "../data"

export default function deletePost(userId, postId) {
    validateId(userId)

    validateId(postId)

    const foundUser = findUserById(userId)

    if(!foundUser) throw new Error('User id not valid')

    const foundPost = findPostById(postId)

    if(!foundPost) throw new Error('Post id not valid')

    if(!foundUser.id === foundPost.author) throw new Error(`Post doesn't belong to this user`)

    const _posts = posts()

    const index = _posts.findIndex(post => post.id === postId)

    _posts.splice(index, 1)

    savePosts(_posts)
}
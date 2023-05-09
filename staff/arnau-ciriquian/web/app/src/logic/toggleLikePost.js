import { validateId } from "./helpers/validators";
import { savePost } from "../data";
import { findUserById, findPostById } from "./helpers/data-managers";
//import showPostFeed from "./show-post-feed";

export default function toggleLikePost(userId, postId) {
    validateId(userId, 'user id')
    validateId(postId, 'post id')

    const user = findUserById(userId)
    if (!user) throw new Error(`user not found`)

    const post = findPostById(postId)
    if(!post) throw new Error('post not found')

    if (!post.likes) {
        post.likes = [userId]
    } else {
        const index = post.likes.indexOf(userId)

        if (index <0)
            post.likes.push(userId)
        else {
            post.likes.splice(index, 1)

            if (!post.likes.length) delete post.likes
        }
    }

    savePost(post)
}
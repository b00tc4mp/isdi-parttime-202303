import { savePost, findPostById, findUserById } from '../data'

export default function toggleLikePost(userId, postId, callback) {

    findUserById(userId, user => {
        if (!user) {
            callback(new Error(`user with id ${userId} not found`))

            return
        }

        findPostById(postId, post => {
            if (!post) {
                callback(new Error(`post with id ${postId} not found`))

                return
            }

            const index = post.likes.indexOf(userId)

            if (index < 0)
                post.likes.push(userId)
            else
                post.likes.splice(index, 1)

            savePost(post, () => callback(null))
        })
    })
}
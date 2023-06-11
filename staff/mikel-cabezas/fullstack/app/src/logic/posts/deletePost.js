import { loadPosts, loadUsers, savePosts } from '../../data.js'
import { validators } from 'com';

const { validateUserId } = validators

export function deletePost(userId, postId, callback) {

    loadUsers(users => {
        users.forEach(user => {
            const likedPostIndex = user.favPosts.findIndex(liked => liked === postId)
            user.favPosts.splice([likedPostIndex], 1)
        })
        loadPosts(_posts => {
            const currentPost = postId.slice(5) - 1

            validateUserId(userId)
            _posts.splice([currentPost], 1)
            savePosts(_posts, () => callback(null))
        })
    })

    return postId

}
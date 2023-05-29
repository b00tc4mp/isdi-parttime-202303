import { loadPosts, loadUsers, savePosts } from '../../data.js'
import { validateId } from '../helpers/validators.js';

export function deletePost(userId, postId, callback) {

    loadUsers(users => {
        users.forEach(user => {
            const likedPostIndex = user.likedPosts.findIndex(liked => liked === postId)
            user.likedPosts.splice([likedPostIndex], 1)
        })
        loadPosts(_posts => {
            const currentPost = postId.slice(5) - 1
        
            validateId(userId)
            _posts.splice([currentPost], 1)
            savePosts(_posts, () => callback(null))
        })
    })

    return postId

}
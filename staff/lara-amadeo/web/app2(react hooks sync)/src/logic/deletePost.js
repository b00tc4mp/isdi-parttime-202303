import { posts, savePostsInStorage, saveUsersInStorage, users } from "../data";
import { findUserbyId } from "./helpers/data-managers";

/**
 * Deletes a post from the database
 * @param {string} userId user's id
 * @param {string} postId post's id
 */

export default function deletePost(userId, postId){
    const user = findUserbyId(userId)
    if(!user) throw new Error('User not found')

    const _posts = posts()
    const postIndex = _posts.findIndex(post => post.id === postId)
    _posts.splice(postIndex, 1)

    savePostsInStorage(_posts)

    const _users = users()
    _users.forEach(user => {
        user.likedPosts.includes(postId) &&
        user.likedPosts.splice(user.likedPosts.findIndex(elem => elem === postId), 1) 
    })

    _users.forEach(user => {
        user.savedPosts.includes(postId) &&
        user.savedPosts.splice(user.savedPosts.findIndex(elem => elem === postId), 1) 
    })

    saveUsersInStorage(_users)
}
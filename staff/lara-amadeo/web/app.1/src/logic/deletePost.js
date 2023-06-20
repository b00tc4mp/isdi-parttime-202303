import { savePostsInStorage, saveUsersInStorage, loadUsers, findUserbyId, loadPosts } from "../data";

/**
 * Deletes a post from the database
 * @param {string} userId user's id
 * @param {string} postId post's id
 */

export default function deletePost(userId, postId, callback){
    findUserbyId(userId, user => {
        if(!user){
            callback(new Error('User not found'))

            return
        }

        loadPosts(posts => {

            const postIndex = posts.findIndex(post => post.id === postId)
            posts.splice(postIndex, 1)
        
            savePostsInStorage(posts, () => {

                loadUsers(users => {
                    const _users = users
                    _users.forEach(user => {
                        user.likedPosts.includes(postId) &&
                        user.likedPosts.splice(user.likedPosts.findIndex(elem => elem === postId), 1) 
                    })
                
                    _users.forEach(user => {
                        user.savedPosts.includes(postId) &&
                        user.savedPosts.splice(user.savedPosts.findIndex(elem => elem === postId), 1) 
                    })
                
                    saveUsersInStorage(_users, () => callback(null))
                })
            })
        
        })
    })

}
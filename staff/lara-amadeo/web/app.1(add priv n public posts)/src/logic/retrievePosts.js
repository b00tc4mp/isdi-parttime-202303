import { findUserbyId, loadPosts, loadUsers } from '../data'

/**
 * Returns all the posts of the database in reverse order
 * @param {string} userId user's id
 * @returns {Array} posts in reverse order
 */

export default function retrievePosts(userId, callback) {

    findUserbyId(userId, user => {
        if(!userId){
            callback(new Error ('User not found'))
            return
        }

        loadPosts(posts => {
            loadUsers(users => {

                posts.forEach(post => {
                    post.favs = user.savedPosts.includes(post.id)

                    const _user = users.find(user => user.id === post.author)

                    post.author = {
                        id: _user.id,
                        username: _user.username,
                        avatar: _user.avatar
                    }
                })
                const _posts = posts.toReversed()
    
                callback(null, _posts)
            })
        })
    })
}
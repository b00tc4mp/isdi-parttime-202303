import { validators } from 'com'
const { validateCallback, validateId } = validators

import { findUserById, loadPosts, loadUsers, savePosts, saveUsers } from "../data"

export default function deleteAccount(userId, callback) {
    validateId(userId)
    validateCallback(callback)

    findUserById(userId, user => {
        if (!user) {
            callback(new Error(`user not found`))

            return
        }

        loadPosts(posts => {
            const _posts = []
            posts.forEach(post => {
                if (post.author !== userId) {
                    _posts.push(post)
                }
            })

            savePosts(_posts, () => callback(null))

            loadUsers(users => {
                const index = users.findIndex(user => user.id === userId)

                users.splice(index, 1)

                saveUsers(users, () => callback(null))
            })
        })
    })
}
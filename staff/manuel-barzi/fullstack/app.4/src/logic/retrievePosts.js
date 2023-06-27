import { validators } from 'com'
import { findUserById, loadPosts, loadUsers } from '../data'

const { validateId, validateCallback } = validators

export default function retrievePosts(userId, callback) {
    validateId(userId, 'user id')
    validateCallback(callback)

    findUserById(userId, user => {
        if (!user) {
            callback(new Error(`user with id ${userId} not found`))

            return
        }

        loadPosts(posts => {
            loadUsers(users => {
                posts.forEach(post => {
                    post.fav = user.favs.includes(post.id)

                    const _user = users.find(user => user.id === post.author)

                    post.author = {
                        id: _user.id,
                        name: _user.name,
                        avatar: _user.avatar
                    }
                })

                callback(null, posts.toReversed())
            })
        })
    })
}
import { findUserById, loadPosts, loadUsers } from "../data";
import { validateId, validateCallback } from "./helpers/validators";

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

//El manu te moltes més coses aqui..
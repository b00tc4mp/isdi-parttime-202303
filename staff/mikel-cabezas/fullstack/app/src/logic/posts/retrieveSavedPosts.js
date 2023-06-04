import {loadPosts, loadUsers, findUserById } from '../../data.js'
import { validateUserId } from "../helpers/validators.js";

export default function retrieveSavedPosts(userId, callback) {
    validateUserId(userId);

    loadUsers(users => {
        const found = users.find(user => user.id === userId)

        if (!found) {
            callback(`new Error(there is no user with this current ${userId} id)`);
            return
        }

        loadPosts((posts) => {
            const favPosts = []

            posts.forEach(post => {
                users.filter(user => {
                    const _favPosts = user.favPosts.includes(post.id)
                    if(_favPosts) {
                        favPosts.push(post)
                    }
                })

                const _user = users.find(user => user.id === post.author)
                post.author = {
                    id: _user.id,
                    name: _user.name,
                    avatar: _user.avatar
                }
            })
            callback(null, favPosts.toReversed());
        })
    })
}

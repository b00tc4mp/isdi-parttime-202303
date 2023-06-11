import { loadPosts, loadUsers, findUserById } from '../../data.js'
import { validators } from "com";

const { validateUserId } = validators

export default function retrieveLikedPosts(userId, callback) {
    validateUserId(userId);

    loadUsers(users => {
        const found = users.find(user => user.id === userId)

        if (!found) {
            callback(`new Error(there is no user with this current ${userId} id)`);
            return
        }

        loadPosts((posts) => {
            const _posts = posts.filter(post => post.likes.includes(userId))

            _posts.forEach(post => {
                const _user = users.find(user => user.id === post.author)
                post.author = {
                    id: _user.id,
                    name: _user.name,
                    avatar: _user.avatar
                }
            })

            callback(null, _posts.toReversed());
        })
    })
}

import { loadPosts, loadUsers, findUserById } from '../../data.js'
import { validators } from "com";

const { validateUserId } = validators
export default function retrievePosts(userId, callback) {
    validateUserId(userId);

    loadUsers(users => {
        const found = users.find(user => user.id === userId)

        if (!found) {
            callback(`new Error(there is no user with this current ${userId} id)`);
            return
        }

        loadPosts((posts) => {
            posts.forEach(post => {
                // para c/post vamos a buscar su user propio
                const _user = users.find(user => user.id === post.author)
                //en esta propiedad, le agregamos un objeto con 3 datos mas, includio el avatar, la id y el nombre. 
                post.author = {
                    id: _user.id,
                    name: _user.name,
                    avatar: _user.avatar
                }
            })

            callback(null, posts.toReversed());
        })
    })
}

import { users } from '../../data.js'
import { validateId } from "../helpers/validators.js";
// import { renderPosts } from "./render-posts.js";

export function updatePosts(userId) {
    const _users = users()
    debugger
    validateId(userId)
    const loggedIn = _users.some( user => {
        if(user.id === userId) {
            user.id = userId
            return true
        }
    })
    if (!loggedIn) {
        throw new Error('Not logged In')
    }
    renderPosts(userId)
}

// TODO steps
    // intentar filtrar desde aqui los posts que se devuelven
import { findUserById, loadPosts, saveUser } from "../data"
import { validateCallback, validateId } from "./helpers/validators"

export default function updateUserFavs(userId, callback) {
    validateId(userId)
    validateCallback(callback)

    findUserById(userId, user => {
        loadPosts(posts => {
            const favorites = []

            user.favs.forEach(postId => {
                if(posts.findIndex(post => post.id === postId) !== -1) {
                    favorites.push(postId)
                }
            })
            user.favs = favorites

            saveUser(user, () => callback(null))
        })
    })
}
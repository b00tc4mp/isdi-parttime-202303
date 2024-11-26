import { findPostbyId, findUserById } from "../../data"
import { validateId } from "../helpers/validators"

export default function retrievePostByPostId (userId, postId, callback){
    validateId(userId)

    findUserById(userId, foundUser => {
        if (!foundUser) {
            callback(new Error (`there is no user with this current ${userId} id`))

            return
        }

        findPostbyId(postId, foundPost => {
            callback(null, foundPost)
        })
    })

}

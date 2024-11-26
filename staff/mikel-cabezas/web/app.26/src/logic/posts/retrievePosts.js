import { posts, loadUsers, findUserById } from '../../data.js'
import { validateId } from "../helpers/validators.js";

export default function retrievePosts(userId, callback) {

    validateId(userId)
    
    findUserById(userId, (error, user) => {

        if(!user) {
            callback(new Error(`user id with ${userId} not found`))

            return 
        }
        callback(null, posts().toReversed())
    })


    // validateId(userId)

    // if (!found) throw new Error(`user with id ${userId} not found`)

    // return posts().toReversed()
}
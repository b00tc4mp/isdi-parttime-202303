import { findUserById } from "../../data"
import { validateId } from "../helpers/validators"

export default function retrieveUser (userId, callback) {
    validateId(userId)

    findUserById(userId, user => {
        if(!user) {
            callback(new Error ('user not found'))

            return
        }
        const _user = {
            name: user.name, 
            image: user.image,
            likedPosts: user.likedPosts
        }        
        console.log(user)
        callback(_user)
    })

}
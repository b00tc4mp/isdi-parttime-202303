import { findUserbyId } from "../data"

export default function retrieveUser(userId, callback) {
    findUserbyId(userId, foundUser => {

        if(!foundUser){
            callback(new Error ('User not found'))

            return
        } 
        else {
            const user = {
                username: foundUser.username,
                email: foundUser.email,
                avatar: foundUser.avatar
            }
            callback(null, user)
        }
    })

}
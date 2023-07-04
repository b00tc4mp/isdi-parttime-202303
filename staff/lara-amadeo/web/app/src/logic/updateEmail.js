import { saveUserInStorage, findUserbyId } from "../data"
import { context } from "../ui"

/**
 * Places the new email in user's database
 * @param {string} currentEmail user's current email
 * @param {string} newEmail user's new email
 * @param {string} confirmNewEmail confirmation of new email
 */

export default function updateEmail (currentEmail, newEmail, confirmNewEmail, callback) {

    if (currentEmail === newEmail)
        throw new Error('New email cannot be the same as current email')

    if (newEmail !== confirmNewEmail)
        throw new Error('New emails do not match')
    
    findUserbyId(context.userId, user => {

        if (!user){
            callback(new Error('User not found'))
            return
        }

        if (currentEmail !== user.email){
            callback(new Error('Invalid current email'))
            return
        }
    
        user.email = newEmail
    
        saveUserInStorage(user, () => callback(null))
    })

}
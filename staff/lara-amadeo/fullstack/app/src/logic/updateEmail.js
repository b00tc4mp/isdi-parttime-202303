import { saveUserInStorage, findUserbyId } from "../data"
import { context } from "../ui"

/**
 * Places the new email in user's database
 * @param {string} currentEmail user's current email
 * @param {string} newEmail user's new email
 * @param {string} confirmNewEmail confirmation of new email
 */

export default function updateEmail(userId, email, newEmail, confirmNewEmail, callback) {

    if (email === newEmail)
        throw new Error('New email cannot be the same as current email')

    if (newEmail !== confirmNewEmail)
        throw new Error('New emails do not match')

    const xhr = new XMLHttpRequest
    
    xhr.onload = () => {
        const { status } = xhr
        if(status !== 204){
            const json = xhr.response
            const { error } = JSON.parse(json)

            callback(new Error(error))

            return
        }

        callback(null)
    }

    xhr.onerror = () => {
        callback(new Error('Connection error'))
    }

    xhr.open('PATCH', `http://localhost:4000/users/email`)

    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.setRequestHeader('authorization', `Bearer ${userId}`)


    const data = { email, newEmail }
    const json = JSON.stringify(data)

    xhr.send(json)
}


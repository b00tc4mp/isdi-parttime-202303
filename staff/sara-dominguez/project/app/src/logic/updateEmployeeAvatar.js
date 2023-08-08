import { validators } from 'com'
import context from './context'
const { validateUrl } = validators


/**
 * Update the avatar of an employee
 * 
* @param {string} employeenewAvatar  URL of the new avatar for the employee
* 
* @returns {Promise<void>} Ends when the avatar is updated.
//  * 
//  * @throws {TypeError} On non-string URL or employeeId
//  * @throws {ContentError} On empty URL
//  * @throws {ExistenceError} On non-existing employee

*/
export default function updateEmployeeAvatar(newAvatar) {
    validateUrl(newAvatar)

    return fetch(`${import.meta.env.VITE_API_URL}/employees/updateAvatar`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${context.token}`
        },
        body: JSON.stringify({ avatar: newAvatar })
    })
        .then(res => {
            if (res.status === 204)
                return
            return res.json()
                .then(({ error: message }) => { throw new Error(message) })
            // .then(body => {
            //     throw new Error(body.error)
            // })
        })
}
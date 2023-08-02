import { validators } from 'com'
//TODO validators
import context from './context'
const { validateEmployeePassword } = validators


/**
 * Update the password of an employee
 * 
* @param {string} employeenewPassword  New password for employee
* 
* @returns {Promise<void>} Ends when employee password is updated
//  * 
//  * @throws {TypeError} On non-string password or employeeId
//  * @throws {ContentError} On password doesn't have a digit or an uppercase or a lowercase or an special chararacter or is empty
//  * @throws {RangeError} On password length doesn't lower than 6 character or upper than 12
*/


export default function updateEmployePassword(employeeNewPassword) {
    validateEmployeePassword(employeeNewPassword)

    return fetch(`${import.meta.env.VITE_API_URL}/employees/updatePassword`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${context.token}`
        },
        body: JSON.stringify({ employeePassword: employeeNewPassword })
    })
        .then(res => {
            if (res.status === 204)
                return
            return res.json()
                // .then(({ error: message }) => { throw new Error(message) })
                .then(body => {
                    throw new Error(body.error)
                })
        })
}
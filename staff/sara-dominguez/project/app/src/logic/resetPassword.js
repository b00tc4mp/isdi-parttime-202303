import { validators, errors } from 'com'
import context from './context'
const { validateEmployeeNumber } = validators

/**
* Reset employee password
* 
* @param {string} employeeNumber  employee number
* 
* @returns {Promise} Ends when employee password is reset
* 
* @throws {TypeError} On non-string employeeNumber
* @throws {ContentError} On employeeNumber is empty or don´t have 5 characters
*
*/

export default function resetPassword(employeeNumber) {
    validateEmployeeNumber(employeeNumber)

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/employees/resetPassword`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${context.token}`
            },
            body: JSON.stringify({ employeeNumber })
        })
        if (res.status === 204) {
            return
        } else {
            const { type, message } = await res.json()

            const clazz = errors[type]

            throw new clazz(message)
        }
    })()
}
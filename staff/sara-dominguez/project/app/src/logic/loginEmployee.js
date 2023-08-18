import { validators, errors } from 'com'
import context from './context.js'

const { validateEmployeeNumber, validateEmployeePassword } = validators

/**
* Login employee  by employeeNumber and employeePassword
* 
* @param {string} employeeNumber employee company credential: id number
* @param {string} employeePassword employee password
* 
* @returns {promise}  A Promise that resolves when the authentication is successful, or rejects with an error message if authentication fails
*
* @throws {TypeError} On non-string employeeNumber or employeePassword
* @throws {ContentError} On empty employeeNumber or does not have 5 characters or employeePassword is empty or don't have a digit, or an uppercase or a lowercase or an special character (-_+/#&)
* @throws {RangeError} On employeePassword lower than 6 characters or upper than 12 
 */

export default function loginEmployee(employeeNumber, employeePassword) {
    validateEmployeeNumber(employeeNumber)
    validateEmployeePassword(employeePassword)

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/employees/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({ employeeNumber, employeePassword })
        })

        if (res.status === 200) {
            const token = await res.json()

            context.token = token
        } else {
            const { type, message } = await res.json()

            const clazz = errors[type]

            throw new clazz(message)
        }
    })()
}



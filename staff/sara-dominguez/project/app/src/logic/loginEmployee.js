import { validators } from 'com'
import context from './context.js'

const { validateEmployeeNumber, validateEmployeePassword } = validators

//TODO errors 

/**
 * Login employee  by employeeNumber and employeePassword
 * 
 * @param {string} employeeNumber employee company credential: id number
 * @param {string} employeePassword employee password
 * 
 * @returns {string} employeeId

* @throws {TypeError} On non-string employeeNumber
* @throws {ContentError} On empty employeeNumber or does not have 5 characters
* @throws {ExistenceError} On non-existing employee
* @throws {AuthError} On wrong credentials
 */

export default function loginEmployee(employeeNumber, employeePassword) {
    validateEmployeeNumber(employeeNumber)
    validateEmployeePassword(employeePassword)

    return fetch(`${import.meta.env.VITE_API_URL}/employees/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({ employeeNumber, employeePassword })
    })
        .then(res => {
            if (res.status === 200) {
                return res.json()
            } else
                return res.json()
                    .then(({ error: message }) => { throw new Error(message) })
            // .then(body => {
            //     throw new Error(body.error)
            // })
        })
        .then(token => {
            context.token = token
        })


}
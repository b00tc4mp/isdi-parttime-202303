import context from './context.js'

/**
 * Login employee  by employeeNumber and employeePassword
 * 
 * @param {string} employeeNumber employee company credential: id number
 * @param {string} employeePassword employee password
 * 
 * @returns {string} employeeId
 */

export default function loginEmployee(employeeNumber, employeePassword) {
    // TODO validators

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
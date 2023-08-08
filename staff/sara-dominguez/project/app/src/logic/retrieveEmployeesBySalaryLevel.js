import context from './context'
import { validators } from 'com'
const { validateSalaryLevel } = validators


/**
 * Retrieve a employee against his/her salaryLevel
 * 
 * @param {string} employeeId  The employee id
 * @param {number} salaryLevel  The employee salary level
 
* @returns {Promise}  array of employee objects matching the given salary level
//  * 
//  * @throws {TypeError} On non-string employeeId or salaryLevel is not a number
//  * @throws {ContentError} On employeeId is empty or  doesn't have 24 characters or not hexadecimal or salaryLevel is empty
//  * @throws {RangeError} On salaryLevel is not a integer between 1 and 5 
//  * @throws {ExistenceError} On non-existing employee
// 
 */

export default (salaryLevel) => {
    // validateSalaryLevel(salaryLevel)

    // return fetch(`${import.meta.env.VITE_API_URL}/employees/retrieveEmployeesBySalaryLevel/${salaryLevel}`, {
    //     headers: {
    //         authorization: `Bearer ${context.token}`
    //     }

    // })
    //     .then(res => {
    //         if (res.status === 200)
    //             return res.json()

    //         return res.json()
    //             .then(body => {
    //                 throw new Error(body.message)
    //             })
    //     })

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/employees/retrieveEmployeesBySalaryLevel/${salaryLevel}`, {
            headers: {
                authorization: `Bearer ${context.token}`
            }

        })
        if (res.status === 200) {
            return res.json()
        } else {
            const { error: message } = await res.json()

            throw new Error(message)
        }
    })()
}

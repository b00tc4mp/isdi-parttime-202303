import context from './context'
import { validators, errors } from 'com'
const { validateSalaryLevel } = validators

/**
* Retrieve a employee against his/her salaryLevel
* 
* @param {number} salaryLevel  The employee salary level
 
* @returns {Promise}  array of employee objects matching the given salary level
* 
* @throws {TypeError} On non-string salaryLevel is not a number
* @throws {ContentError} On empty value salaryLevel 
* @throws {RangeError} On salaryLevel is not a integer between 1 and 5 
 */

export default (salaryLevel) => {
    validateSalaryLevel(salaryLevel)

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/employees/retrieveEmployeesBySalaryLevel/${salaryLevel}`, {
            headers: {
                authorization: `Bearer ${context.token}`
            }
        })
        if (res.status === 200) {
            return res.json()
        } else {
            const { type, message } = await res.json()

            const clazz = errors[type]

            throw new clazz(message)
        }
    })()
}

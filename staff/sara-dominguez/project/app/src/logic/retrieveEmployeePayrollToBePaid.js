import context from './context'
import { validators, errors } from 'com'
const { validateId } = validators
/**
* Retrieve the employee of payrollMonth to be paid 
*
* @param {string} id  The employee id
*
* @returns {Promise} employee  
*
* @throws {TypeError} On non-string id
* @throws {ContentError} On id doesn't have 24 characters or not hexadecimal
*/

export default (id) => {
    validateId(id)

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/employees/retrieveEmployeePayrollToBePaid/${id}`, {
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

import { validators, errors } from 'com'
import context from './context'

const { validateId } = validators

/**
* Delete payrollMonth
* 
* @param {string} payrollId - payrollId of the payroll to delete 
*
* @returns {Promise}  A promise ends when payrollMonth is deleted
*
@throws {TypeError} On non-string payrollId
* @throws {ContentError} On payrollId doesn't have 24 characters or not hexadecimal 
* 
*/

export default function deletePayrollMonth(payrollId) {
    validateId(payrollId)

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/payrollMonths/deletePayrollMonth/${payrollId}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${context.token}`
            }
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
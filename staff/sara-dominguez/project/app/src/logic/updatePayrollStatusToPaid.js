import { validators, errors } from 'com'
import context from './context'
const { validateId } = validators

/**
* Update payroll status to paid 
* 
* @param {string} _id  The payrollMonth _id to change
* 
* @returns {Promise<void>} Ends when payrollMonth status is updated
* 
* @throws {TypeError} On non-string employeeId or _id
* @throws {ContentError} On _id doesn't have 24 characters or not hexadecimal 
*/

export default function updatePayrollStatusToPaid(_id) {
    validateId(_id)

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/payrollMonths/updatePayrollStatusToPaid`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${context.token}`
            },
            body: JSON.stringify({ _id: _id })
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
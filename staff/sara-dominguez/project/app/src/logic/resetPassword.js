import { validators, errors } from 'com'
import context from './context'
const { validateEmployeeNumber } = validators

/**
* Update employee password
* 
* @param {string} employeePassword  Actual employee password
* @param {string} employeenewPassword  New password for employee
* @param {string} employeeConfirmNewPassword  The confirmation of new password for employee
* 
* @returns {Promise<void>} Ends when employee password is updated
* 
* @throws {TypeError} On non-string employeePassword or employeeNewPassword or employeeConfirmNewPassword
* @throws {ContentError} On employeePassword or employeeNewPassword or employeeConfirmNewPassword doesn't have a digit or an uppercase or a lowercase or an special chararacter (-_+/#&) or are empty
* @throws {RangeError} On employeePassword or employeeNewPassword or employeeConfirmNewPassword length is lower than 6 character or upper than 12
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
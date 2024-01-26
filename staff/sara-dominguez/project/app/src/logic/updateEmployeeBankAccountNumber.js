import { validators, errors } from 'com'
import context from './context'
const { validateBankAccountNumber } = validators

/**
* Update employee bank account number
* 
* @param {string} employeeNewBankAccountNumber  new bank account number for the employee
* 
* @returns {Promise<void>} Ends when employee bank account number is updated
* 
* @throws {TypeError} On non-string employeeNewBankAccountNumber
* @throws {ContentError} On non-24 characters BankAccountNumber
*/

export default function updateEmployeeBankAccountNumber(employeeNewBankAccountNumber) {
    validateBankAccountNumber(employeeNewBankAccountNumber)

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/employees/updateBankAccountNumber`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${context.token}`
            },
            body: JSON.stringify({ employeeNewBankAccountNumber })
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
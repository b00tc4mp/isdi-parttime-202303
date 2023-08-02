import { validators } from 'com'
//TODO errors
import context from './context'
const { validateBankAccountNumber } = validators

/**
 * Update bank account number of an employee
 * 
* @param {string} employeeBankAccountNumber  new bank account number for the employee
* 
* @returns {Promise<void>} Ends when employee bank account number is updated
//  * 
//  * @throws {TypeError} On non-string bankAccountNumber
//  * @throws {ContentError} On non-24 characters BankAccountNumber
*/

export default function updateEmployeeBankAccountNumber(employeeNewBankAccountNumber) {
    validateBankAccountNumber(employeeNewBankAccountNumber)

    return fetch(`${import.meta.env.VITE_API_URL}/employees/updateBankAccountNumber`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${context.token}`
        },
        body: JSON.stringify({ bankAccountNumber: employeeNewBankAccountNumber })
    })
        .then(res => {
            if (res.status === 204)
                return
            return res.json()
                .then(({ error: message }) => { throw new Error(message) })
            // .then(body => {
            //     throw new Error(body.error)
            // })
        })
}
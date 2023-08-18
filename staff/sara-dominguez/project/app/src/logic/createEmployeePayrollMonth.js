import { validators, errors } from 'com'
const { validateId, validatePayrollYear, validatePayrollMonth } = validators

/**
* Create a new payroll month entry for an employee.
*
* @param {string} employeeId - The ID of the employee.
* @param {number} payrollYear - The year of the payroll month.
* @param {number} payrollMonth - The month of the payroll.
* 
* @returns {Promise} - A Promise that resolves to the created payroll month entry (object)
* 
* @throws {TypeError} On non-string employeeId or non-number payrollYear or payrollMonth 
* @throws {ContentError} On employeeId is not hexadecimal or doesn't have 24 characters or payrollYear or payrollMonth are empty
*/

export default function createEmployeePayrollMonth(employeeId, payrollYear, payrollMonth) {
    validateId(employeeId)
    validatePayrollYear(payrollYear)
    validatePayrollMonth(payrollMonth)

    // return fetch(`${import.meta.env.VITE_API_URL}/payrollMonths`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },

    //     body: JSON.stringify({ employeeId, payrollYear, payrollMonth })
    // })
    //     .then(res => {
    //         if (res.status === 201) {
    //             return
    //         } else
    //             return res.json()
    //                 .then(({ error: message }) => { throw new Error(message) })
    //         // .then(body => {
    //         //     throw new Error(body.error)
    //         // })
    //     })

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/payrollMonths`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ employeeId, payrollYear, payrollMonth })
        })
        if (res.status === 201) {
            return
        } else {
            const { type, message } = await res.json()

            const clazz = errors[type]

            throw new clazz(message)
        }
    })()
}
import context from './context'
import { validators, errors } from 'com'
const { validatePayrollYear, validatePayrollMonth } = validators

/**
* Retrieve payroll month
* 
* @param {number} payrollYear  The year of the month to check
* @param {number} payrollMonth  The month of the payroll to check
*
* @returns {Promise}  object with payroll data for an specific employee, year and month
*
* @throws {TypeError} On non-number payrollYear or payrollMonth 
* @throws {ContentError} On empty value of payrollYear or payrollMonth
* @throws {RangeError} On non-integer payrollYear or non-integer between 1 and 12 payrollMonth 
 */

export default (payrollYear, payrollMonth) => {
    validatePayrollYear(payrollYear)
    validatePayrollMonth(payrollMonth)

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/payrollMonth/retrieveEmployeePayrollMonth/${payrollYear}/${payrollMonth}`, {
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
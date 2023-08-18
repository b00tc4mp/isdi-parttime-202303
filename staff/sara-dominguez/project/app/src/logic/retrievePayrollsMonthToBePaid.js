import context from './context'
import { validators, errors } from 'com'
const { validatePayrollYear, validatePayrollMonth } = validators

/**
* Retrieve payroll month to be paid
* 
* @param {number} payrollYear  The payroll's year to retrieve
* @param {number} payrollMonth  The payroll's month to retrieve
*
* @returns {Promise}  Object with payrolls data for a year and month to process
*
* @throws {TypeError} On non-number payrollYear or payrollMonth 
* @throws {ContentError} On payrollYear or payrlollMonth are empty
* @throws {RangeError} On non-integer payrollyear or non-integer between 1 and 12 payrollMonth
 */

export default (payrollYear, payrollMonth) => {
    validatePayrollYear(payrollYear)
    validatePayrollMonth(payrollMonth)

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/payrollMonth/retrievePayrollsMonthToBePaid/${payrollYear}/${payrollMonth}`, {
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
import context from './context'
import { validators, errors } from 'com'
const { validatePayrollYear } = validators

/**
* Retrieve payroll annual aggregate
* 
* @param {number} PayrollYear  The year of the aggregated calculation
*
* @returns {Promise}  object with anual aggregate datas for an specific employee and year
*
* @throws {TypeError} On non-number payrollYear
* @throws {ContentError} On payrollYear is empty 
* @throws {rangeError} On non -integer number payrollYear
 */

export default (payrollYear) => {
    validatePayrollYear(payrollYear)

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/payrollMonth/retrievePayrollAnnualAggregate/${payrollYear}`, {
            headers: {
                authorization: `Bearer ${context.token}`
            }
        })
        if (res.status === 200) {
            return res.json()
        } else {
            const [type, message] = await res.json()

            const clazz = errors[type]

            throw new clazz(message)
        }
    })()
}
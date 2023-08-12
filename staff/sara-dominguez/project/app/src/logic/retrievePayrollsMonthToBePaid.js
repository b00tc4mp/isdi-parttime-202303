import context from './context'
import { validators } from 'com'
const { validatePayrollYear, validatePayrollMonth } = validators
//TODO preguntas a Manu documentar
/**
 * Retrieve a payroll month to be paid
 * 
 * 
 * @returns {Promise<string>} employee  
//  * 
//  * @throws {TypeError} On non-string 
// 
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
            const { error: message } = await res.json()

            throw new Error(message)
        }
    })()
}
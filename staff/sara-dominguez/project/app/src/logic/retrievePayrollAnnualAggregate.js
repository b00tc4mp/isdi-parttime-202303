import context from './context'
import { validators } from 'com'
const { validatePayrollYear } = validators

export default (payrollYear) => {
    validatePayrollYear(payrollYear)

    return fetch(`${import.meta.env.VITE_API_URL}/payrollMonth/retrievePayrollAnnualAggregate/${payrollYear}`, {
        headers: {
            authorization: `Bearer ${context.token}`
        }
    })
        .then(res => {
            if (res.status === 200)
                return res.json()

            return res.json()
                .then(body => {
                    throw new Error(body.message)
                })
        })
}
import context from './context'

export default (payrollYear) => {
    //TODO validators
    //validatePayrollYear(payrollYear)


    return fetch(`${import.meta.env.VITE_API_URL}/payrollMonth/retrievePayrollAnnualAgregate/${payrollYear}`, {
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
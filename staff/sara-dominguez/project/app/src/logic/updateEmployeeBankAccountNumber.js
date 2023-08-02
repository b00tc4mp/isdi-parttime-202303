// import { validators } from 'com'
//TODO errors
import context from './context'
// const { validateEmployeeBankAccountNumber} = validators

export default function updateEmployeeBankAccountNumber(employeeNewBankAccountNumber) {
    //TODO validate(employeeNewBankAccountNumber)

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
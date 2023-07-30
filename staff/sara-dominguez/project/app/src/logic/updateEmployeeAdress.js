// import { validators } from 'com'
//TODO validators
import context from './context'
// const { validateEmployeeAdress} = validators

export default function updateEmployeeAdress(employeeNewAdress) {
    // validateEmployeeAdress(employeeNewAdress)

    return fetch(`${import.meta.env.VITE_API_URL}/employees/updateAdress`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${context.token}`
        },
        body: JSON.stringify({ adress: employeeNewAdress })
    })
        .then(res => {
            if (res.status === 204)
                return
            return res.json()
                // .then(({ error: message }) => { throw new Error(message) })
                .then(body => {
                    throw new Error(body.error)
                })
        })
}
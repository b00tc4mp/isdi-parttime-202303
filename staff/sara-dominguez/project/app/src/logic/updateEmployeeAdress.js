import { validators, errors } from 'com'
import context from './context'
// const { validateEmployeeAdress} = validators

export default function updateEmployeeAdress(employeeStreet, employeePostalCode, employeeCity, employeeCountry) {
    // validateEmployeeAdress(employeeNewAdress)

    // return fetch(`${import.meta.env.VITE_API_URL}/employees/updateAdress`, {
    //     method: 'PATCH',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         authorization: `Bearer ${context.token}`
    //     },
    //     body: JSON.stringify({ employeeStreet, employeePostalCode, employeeCity, employeeCountry })
    // })
    //     .then(res => {
    //         if (res.status === 204)
    //             return
    //         return res.json()
    //             // .then(({ error: message }) => { throw new Error(message) })
    //             .then(body => {
    //                 throw new Error(body.error)
    //             })
    //     })


    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/employees/updateAdress`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${context.token}`
            },
            body: JSON.stringify({ employeeStreet, employeePostalCode, employeeCity, employeeCountry })
        })

        if (res.status === 204) {
            return
        } else {
            const { type, message } = await res.json()

            const clazz = errors[type]

            throw new clazz(message)
        }
    })()
}
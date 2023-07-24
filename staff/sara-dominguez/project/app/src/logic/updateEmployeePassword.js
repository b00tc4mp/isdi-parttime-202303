// import { validators } from 'com'
//TODO validators
import context from './context'
// const { validateEmployeePassword} = validators

export default function updateEmployePassword(employeeNewPassword) {
    // validateEmployeePassword(employeeNewPassword)

    return fetch(`${import.meta.env.VITE_API_URL}/employees/updatePassword`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${context.token}`
        },
        body: JSON.stringify({ employeePassword: employeeNewPassword })
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
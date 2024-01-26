import context from './context'
import { validators } from 'com'
const { validatePassword, validateUserNewPassword, validateUserConfirmNewPassword } = validators

export function validatedNewPassword(password, userNewPassword, userConfirmNewPassword) {
    validatePassword(password)
    validateUserNewPassword(userNewPassword)
    validateUserConfirmNewPassword(userConfirmNewPassword)

    return fetch(`${import.meta.env.VITE_API_URL}/users/password`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${context.token}`
        },
        body: JSON.stringify({ password: userNewPassword })
    })
        .then(res => {
            if (res.status === 204)
                return res.json()
            return res.json()
                // .then(({ error: message }) => { throw new Error(message) })
                .then(body => {
                    throw new Error(body.error)
                })
        })
}

import { validators, errors } from 'com'
const { validatePassword } = validators
import context from './context'


export default function updateUserPassword(password,newPassword,newPasswordConfirm){
    validatePassword(password)
    validatePassword(newPassword, 'new password')
    validatePassword(newPasswordConfirm, 'new password confirm')

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/password`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${context.token}`
            },
            body: JSON.stringify({ password, newPassword, newPasswordConfirm })
        })

        if (res.status === 204)
            return

        const { type, message } = await res.json()

        const clazz = errors[type]

        throw new clazz(message)  
    })()
}


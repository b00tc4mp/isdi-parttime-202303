import context from "./context"

import { validators } from 'com'
const { validateUrl } = validators

export default  (password, newPassword, newPasswordConfirm) => {
    validatePassword(password)
    validatePassword(newPassword, 'new password')
    validatePassword(newPasswordConfirm, 'new password confirm')

    if (newPassword === password) throw new Error("the new password is equal to the old password", {cause: "newPassword"})

    if (newPassword !== newPasswordConfirm) throw new Error("the confirm password is different than then new password", {cause: "newPasswordConfirm"})

    return fetch(`${import.meta.env.VITE_API_URL}/users/updatePassword`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${context.token}`
        },
        body: JSON.stringify({ password, newPassword, newPasswordConfirm })
    })
        .then(res => {
            if (res.status === 204)
                return
            
            return res.json()
                .then(({ error: message }) => { throw new Error(message) })
        })   
        .catch(error => new Error(error)) 
}
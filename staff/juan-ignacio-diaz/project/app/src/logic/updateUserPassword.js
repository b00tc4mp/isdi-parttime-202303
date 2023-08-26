import context from "./context"

import { validators } from 'com'
const { validatePassword } = validators

/**
 * Update the password for the user's
 * 
 * @param {string} password The user's password
 * @param {string} newPassword The user's new Password
 * @param {string} newPasswordConfirm The user's new Password Confirm
 */

export default  (password, newPassword, newPasswordConfirm) => {
    validatePassword(password)
    validatePassword(newPassword, 'new password')
    validatePassword(newPasswordConfirm, 'new password confirm')

    if (newPassword === password) throw new Error("the new password is equal to the old password", {cause: "newPassword"})

    if (newPassword !== newPasswordConfirm) throw new Error("the confirm password is different than then new password", {cause: "newPasswordConfirm"})

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/updatePassword`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${context.token}`
            },
            body: JSON.stringify({ password, newPassword, newPasswordConfirm })
        })

        if (res.status === 204)
            return
        
        const { error: message } = await res.json()
        
        throw new Error(message)
    })()
}
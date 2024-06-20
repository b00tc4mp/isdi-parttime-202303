
/**
 * Places new password in user's database
 * @param {string} token user's id
 * @param {string} currentPassword user's current password
 * @param {string} newPassword user's new password
 * @param {string} confirmNewPassword confirmation of new password
 */

import { context } from "./context"

export const updatePassword = (password, newPassword, confirmNewPassword) => {

    if (password === newPassword)
        throw new Error('Current password cannot be the same as new password')

    if (newPassword !== confirmNewPassword)
        throw new Error('New passwords do not match')

    const data = { password, newPassword }

    return fetch('http://localhost:4000/users/password', {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${context.token}`
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            if (res.status !== 204) return res.json().then(({ error }) => { throw new Error(error) })
        })
}

import { validators } from 'com'
const { validateToken, validatePassword } = validators

export default  (token, password, newPassword, newPasswordConfirm) => {
    validateToken(token)
    validatePassword(password)
    validatePassword(newPassword, 'new password')
    validatePassword(newPasswordConfirm, 'new password confirm')

    if (newPassword === password) throw new Error("the new password is equal to the old password", {cause: "newPassword"})

    if (newPassword !== newPasswordConfirm) throw new Error("the confirm password is different than then new password", {cause: "newPasswordConfirm"})

    return fetch(`${import.meta.env.VITE_API_URL}/users/updatePassword`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ password, newPassword, newPasswordConfirm })
    })
        .then(res => {
            if (res.status !== 204)
                return res.json().then(({ error: message }) => { throw new Error(message) })

            return
        })   
        .catch(error => new Error(error)) 
}
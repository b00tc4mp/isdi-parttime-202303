
/**
 * Places new password in user's database
 * @param {string} token user's id
 * @param {string} currentPassword user's current password
 * @param {string} newPassword user's new password
 * @param {string} confirmNewPassword confirmation of new password
 */

export const updatePassword = (token, password, newPassword, confirmNewPassword, callback) => {

    if (password === newPassword)
        throw new Error('Current password cannot be the same as new password')

    if (newPassword !== confirmNewPassword)
        throw new Error('New passwords do not match')

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status } = xhr
        if (status !== 204) {
            const json = xhr.response
            const { error } = JSON.parse(json)

            callback(new Error(error))

            return
        }

        callback(null)
    }

    xhr.onerror = () => {
        callback(new Error('Connection error'))
    }

    xhr.open('PATCH', `http://localhost:4000/users/password`)

    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.setRequestHeader('authorization', `Bearer ${token}`)


    const data = { password, newPassword }
    const json = JSON.stringify(data)

    xhr.send(json)
}

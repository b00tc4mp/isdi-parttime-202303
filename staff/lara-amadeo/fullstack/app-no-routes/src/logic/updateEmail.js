
/**
 * Places the new email in user's database
 * @param {string} currentEmail user's current email
 * @param {string} newEmail user's new email
 * @param {string} confirmNewEmail confirmation of new email
 */

export default function updateEmail(token, email, newEmail, confirmNewEmail, callback) {

    if (email === newEmail)
        throw new Error('New email cannot be the same as current email')

    if (newEmail !== confirmNewEmail)
        throw new Error('New emails do not match')

    const data = { email, newEmail }

    return fetch('http://localhost:4000/users/email', {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            if (res.status !== 204) return res.json().then(({ error }) => { throw new Error(error) })
        })
}


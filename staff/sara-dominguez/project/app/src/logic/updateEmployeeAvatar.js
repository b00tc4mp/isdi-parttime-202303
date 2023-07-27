// import { validators } from 'com'
//TODO validators
import context from './context'
// const { validateEmployeeAvatar } = validators

export default function updateEmployeeAvatar(newAvatar) {
    // validateEmployeeAvatar(newAvatar)

    return fetch(`${import.meta.env.VITE_API_URL}/employees/updateAvatar`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${context.token}`
        },
        body: JSON.stringify({ avatar: newAvatar })
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
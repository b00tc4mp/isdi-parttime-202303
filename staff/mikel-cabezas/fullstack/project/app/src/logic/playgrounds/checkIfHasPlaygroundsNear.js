
// import { validators, utils } from 'com'
// import { isTokenValid } from 'com/utils'

// const { isTokenValid } = utils
// const { validateToken, validateText } = validators

export default function checkIfHasPlaygroundsNear(token, userLocation) {
    // validateToken(token)
    // validateText(name)
    // validateText(description)

    return fetch(`${process.env.EXPO_PUBLIC_API_URL}/playgrounds/checkNear`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userLocation })
    }).then(res => {
        debugger
        if (res.status !== 200)
            return res.json().then(({ error: message }) => { throw new Error(message) })

        return
    })
}

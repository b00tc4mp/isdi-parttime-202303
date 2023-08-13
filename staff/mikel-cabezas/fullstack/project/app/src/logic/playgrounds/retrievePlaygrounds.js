// import { validators } from "../../../com";
// const { validateToken } = validators

export default token => {
    // validateToken(token);
    // alert(API_URL)
    return fetch(`${process.env.EXPO_PUBLIC_API_URL}/playgrounds`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => {
            if (res.status !== 200)
                return res.json().then(({ error: message }) => { throw new Error(message) })
            return res.json()
        })
}

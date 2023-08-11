// import { validators } from "../../../com";
// const { validateToken } = validators
import { API_URL } from '@env'

export default (token, searchQuery) => {
    // validateToken(token);
    // alert(API_URL)
    return fetch(`${API_URL}/cities/${searchQuery}`, {
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

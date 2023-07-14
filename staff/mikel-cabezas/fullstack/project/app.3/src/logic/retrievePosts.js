import { validators } from "com";
const { validateToken } = validators
import { API_URL } from 'react-native-dotenv'

export default token => {
    validateToken(token);

    return fetch(`${API_URL}/posts`, {
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

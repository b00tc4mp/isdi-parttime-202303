//import { validators } from 'com'
//const { validateCallback, validateToken } = validators
import { API_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function updateUserEmail(email, newEmail, password) {
    //validateToken(token, 'user id')

    return AsyncStorage.getItem('TOKEN')
        .then(token => {
            return fetch(`${API_URL}/users/email`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ email, newEmail, password })
            })
                .then(res => {
                    if (res.status !== 204)
                        return res.json().then(({ error: message }) => { throw new Error(message) })
                })
        })
}
import { validators } from '../../com'
const { validateEmail, validatePassword } = validators

import { API_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function authenticateUser(email, password) {
    if(email !== process.env.ADMIN)
        validateEmail(email)
    validatePassword(password)

    return fetch(`${API_URL}/users/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(res => {
            if (res.status === 200)
                return res.json()
                .then( token => AsyncStorage.setItem("TOKEN", token))
                

            return res.json()
                .then(body => {
                    throw new Error(body.message)
                })
        })
}
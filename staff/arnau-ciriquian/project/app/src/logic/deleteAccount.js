//import { validators } from 'com'
//const { validateToken } = validators

import { API_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function deleteAccount() {
    //validateToken(token)

    return AsyncStorage.getItem('TOKEN')
        .then(token => {
            return fetch(`${API_URL}/users`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    if (res.status !== 204)
                        return res.json().then(({ error: message }) => { throw new Error(message) })
                })
        })
}
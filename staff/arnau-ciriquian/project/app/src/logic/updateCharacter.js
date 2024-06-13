//import { validators } from 'com'
//const { validateName, validateToken, validatePassword } = validators

import { API_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function updateCharacter(newCharacterName, newAvatar) {
    /*validateToken(token)
    validateName(username, 'old username')
    validateName(newUsername, 'new username')
    validatePassword(password)*/

    return AsyncStorage.getItem('TOKEN')
        .then(token => {
            return fetch(`${API_URL}/characters`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ newCharacterName, newAvatar })
            })
                .then(res => {
                    if (res.status !== 204)
                        return res.json().then(({ error: message }) => { throw new Error(message) })
                })
        })
}
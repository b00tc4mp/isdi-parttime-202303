//import { validators } from 'com'
//const { validateToken, validateUrl, validateText } = validators

import { API_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function createNewCharacter(characterName, avatar) {
    //validateUrl(image)
    //validateText(text)

    return AsyncStorage.getItem('TOKEN')
        .then(token => {
            return fetch(`${API_URL}/characters`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ characterName, avatar })
            })
                .then(res => {
                    if (res.status !== 201)
                        return res.json().then(({ error: message }) => { throw new Error(message) })
                })
        })
}
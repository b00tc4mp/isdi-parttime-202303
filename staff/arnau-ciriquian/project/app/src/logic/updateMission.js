//import { validators } from 'com'
//const { validateId, validateText, validateUrl, validateToken } = validators
import { API_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function updateMission(missionId, image, tittle, info, level, difficulty, visibility) {
    //    validateId(missionId, 'post id')
    //  validateUrl(image, 'image url')
    //validateText(text, 'post text')

    return AsyncStorage.getItem('TOKEN')
        .then(token => {
            return fetch(`${API_URL}/missions/${missionId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ image, tittle, info, level, difficulty, visibility })
            })
                .then(res => {
                    if (res.status !== 204)
                        return res.json().then(({ error: message }) => { throw new Error(message) })
                })
        })
}
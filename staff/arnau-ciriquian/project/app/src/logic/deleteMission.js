//import { validators } from 'com'
//const { validateId, validateToken } = validators

import { API_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function deleteMission(missionId) {
    //validateToken(token, 'user id')
    //validateId(postId, 'post id')
    return AsyncStorage.getItem('TOKEN')
        .then(token => {
            return fetch(`${API_URL}/missions/${missionId}`, {
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
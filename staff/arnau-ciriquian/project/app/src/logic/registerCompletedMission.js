import { validators } from 'com'
const { validateId } = validators

import { API_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function registerCompletedMission(missionId) {
    validateId(missionId)

    return AsyncStorage.getItem('TOKEN')
        .then(token => {
            return fetch(`${API_URL}/characters/${missionId}`, {
                method: 'PATCH',
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
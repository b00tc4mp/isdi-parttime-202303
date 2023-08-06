//import { validators } from 'com'
//const { validateId, validateToken } = validators
import { API_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function retrievePost(missionId) {
    //    validateId(missionId, 'post id')

    return AsyncStorage.getItem('TOKEN')
        .then(token => {
            return fetch(`${API_URL}/missions/${missionId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => {
                    if (res.status === 200)
                        return res.json()

                    return res.json()
                        .then(body => {
                            throw new Error(body.message)
                        })
                })
        })
}
/*AsyncStorage.getItem('TOKEN')
.then(token => {
    if (token) {
        setIsLoggedIn(true)
    }*/

/*import context from "./context"

export function getLoggedUser() {
    return fetch(`${API_URL}/users`, {
        headers: {
            Authorization: `Bearer ${context.token}`
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
}*/

import { API_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage';

export function getLoggedUser() {
    return AsyncStorage.getItem('TOKEN')
        .then(token => {
            return fetch(`${API_URL}/users`, {
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
//import { validators } from 'com'
//const { validateNewPassword, validatePassword, validatePasswordConfirm, validateToken } = validators

import { API_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function updateUserPassword(password, newPassword, newPasswordConfirmation) {
    /*validateToken(token)
    validatePassword(password)
    validateNewPassword(newPassword, 'new password')
    validatePasswordConfirm(newPassword, newPasswordConfirmation, 'new password confirmation', 'new password')*/

    return AsyncStorage.getItem('TOKEN')
        .then(token => {
            return fetch(`${API_URL}/users/password`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ password, newPassword, newPasswordConfirmation })
            })
                .then(res => {
                    if (res.status !== 204)
                        return res.json().then(({ error: message }) => { throw new Error(message) })
                })
        })
}
import { validators } from '../../../com'
const { validateEmail, validatePassword } = validators
import { EXPO_PUBLIC_API_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage';


// console.log(validators)
export default (email, password) => {
    validateEmail(email)
    validatePassword(password)
    return fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(res => {
            if (res.status !== 200)
                return res.json().then(({ error: message }) => { throw new Error(message) })

            return res.json()
        })
        .then(async token => {
            await AsyncStorage.setItem('@TOKEN', token)
        })



}
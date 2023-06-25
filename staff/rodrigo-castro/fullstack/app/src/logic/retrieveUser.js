console.debug('load retrieve user')

import { validators } from 'com'

const { validateId } = validators

/**
 * Retrieves the found user
 * @param {string} userId user's id
 * @param {function} callback 
 * @returns {object} user found
 */

export const retrieveUser = (userId, callback) => {
    validateId(userId, 'user id')

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status } = xhr

        if (status !== 200) {
            const { response: json } = xhr
            const { error } = JSON.parse(json)

            callback(new Error(error))

            return
        }

        const { response: json } = xhr
        const user = JSON.parse(json)

        callback(null, user)
    }

    xhr.onerror = () => {
        callback(new Error('connection error'))
    }

    xhr.open('GET', `${import.meta.env.VITE_API_URL}/users/retrieveuser`)

    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.setRequestHeader('Authorization', `Bearer ${userId}`)

    xhr.send()
}
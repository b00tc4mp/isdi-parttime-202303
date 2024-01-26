console.debug('update-user-avatar')

// import { validateId, validateUserAvatar, validateCallback } from "./helpers/validators.js"
// import { saveUser, findUserById } from "../data.js"
import { validators } from 'com'

const { validateId, validateUserAvatar, validateCallback } = validators


export function updateUserAvatar(userId, newAvatar, callback) {
    validateId(userId)
    validateUserAvatar(newAvatar)
    validateCallback(callback)


    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status } = xhr

        if (status !== 204) {
            const { response: json } = xhr
            const { error } = JSON.parse(json)

            callback(new Error(error))

            return
        }
        callback(null)
    }

    xhr.onerror = () => {
        callback(new Error('conection error'))
    }

    xhr.open('PATCH', `http://localhost:4000/users/${userId}`)

    xhr.setRequestHeader('Content-Type', 'application/json')

    //enviamos los datos del usuario y lo convertimos a json
    const data = { newAvatar }
    const json = JSON.stringify(data)

    xhr.send(json)


    //    findUserById(userId, user => {
    //        if(!user) {
    //            callback(new Error ('User not found'))

    //            return
    //     } 
    //        user.avatar = newAvatar
    //        saveUser(user, () => callback(null))
    //    })
}


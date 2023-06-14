console.debug('load retrieve-user')

// import { validateId, validateCallback } from "./helpers/validators.js"
// import { findUserById } from "../data.js"
import { validators } from 'com'

const { validateId, validateCallback } = validators

export default function retrieveUser(userId, callback) {
    validateId(userId)
    validateCallback(callback)


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
        const { name, email, avatar } = JSON.parse(json)

        const user = { name, email, avatar }

        callback(null, user)
    }

    xhr.onerror = () => {
        callback(new Error('conection error'))
    }

    xhr.open('GET', `http://localhost:4000/users/${userId}`)

    xhr.setRequestHeader('Content-Type', 'application/json')

    //enviamos los datos del usuario y lo convertimos a json


    xhr.send()


    // findUserById(userId, user => {
    //     if (!user) {
    //         callback(new Error('User not found'))

    //         return

    //     }else {
    //         const _user = {
    //             name: user.name,
    //             avatar: user.avatar,

    //         }

    //         // if (user.avatar)
    //         //     user.avatar = user.avatar

    //         callback(null, _user)
    //     }
    // })
}


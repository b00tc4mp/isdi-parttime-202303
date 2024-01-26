import { findUserById, saveUser } from "../../data.js"
import { context } from '../../ui.js'
import { validators } from "com"

const { validateCallback, validateImage, validateUserId } = validators

// export default function uploadImage(userId, image, callback) {
export default (userId, image, callback) => {

    // validateImage(image)
    validateUserId(userId)
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
        callback(new Error('connection error'))
    }

    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/image`)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Authorization', `Bearer ${userId}`)
    const newImage = image.src
    const userData = { newImage }
    debugger
    const json = JSON.stringify(userData)

    xhr.send(json)
}
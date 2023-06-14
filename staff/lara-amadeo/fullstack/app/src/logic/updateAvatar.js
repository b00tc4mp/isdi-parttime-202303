
// import { validateBase64ImageFormat } from "./helpers/validators.js"  

import { saveUserInStorage, findUserbyId } from "../data"

/**
 * Places the new avatar in user database 
 * @param {string} userId user's id
 * @param {url} url avatar url
 * @returns new avatar url
 */

export function updateAvatar(userId, url, callback){
    if(!url) throw new Error('Image not uploaded correctly')

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status } = xhr
        if(status !== 204) {
            const json = xhr.response
            const { error } = JSON.parse(json)

            callback(new Error(error))

            return
        }
        
        callback(null)
    }

    xhr.onerror = () => {
        callback(new Error('Connection error'))
    }

    xhr.open('PATCH', `http://localhost:4000/users/avatar`)

    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.setRequestHeader('authorization', `Bearer ${userId}`)

    const data = {userId, avatar: url}
    const json = JSON.stringify(data)

    xhr.send(json)

}

// import { validateBase64ImageFormat } from "./helpers/validators.js"  

import { saveUserInStorage, findUserbyId } from "../data"

/**
 * Places the new avatar in user database 
 * @param {string} userId user's id
 * @param {url} url avatar url
 * @returns new avatar url
 */

export function updateAvatar(userId, url, callback){
    if(!url) {
        callback(new Error('Image not uploaded correctly'))
        return
    }

    findUserbyId(userId, user => {

        user.avatar = url
        saveUserInStorage(user, () => callback(null))
    })

}
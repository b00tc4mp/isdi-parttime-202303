
// import { validateBase64ImageFormat } from "./helpers/validators.js"  

import { saveUserInStorage } from "../data"
import { findUserbyId } from "./helpers/data-managers"

/**
 * Places the new avatar in user database 
 * @param {string} userId user's id
 * @param {url} url avatar url
 * @returns new avatar url
 */

export function updateAvatar(userId, url){
    const user = findUserbyId(userId)

    if(!url) throw new Error('Image not uploaded correctly')
   
    user.avatar = url
    saveUserInStorage(user)

    return url
}

// import { validateBase64ImageFormat } from "./helpers/validators.js"  

import { saveUserInStorage } from "../data.js"
import { findUserbyId } from "./helpers/data-managers.js"

export function updateAvatar(userId, url){
    const user = findUserbyId(userId)

    if(!url) throw new Error('Image not uploaded correctly')
   
    user.avatar = url
    saveUserInStorage(user)

    return url
}

// import { validateBase64ImageFormat } from "./helpers/validators.js"  

import { findUserbyId } from "./helpers/data-managers.js"

export function updateAvatar(userId, url){
    if(!url) throw new Error('Image not uploaded correctly')
   
    const foundUser = findUserbyId(userId)
    foundUser.avatar = url
    return url
}
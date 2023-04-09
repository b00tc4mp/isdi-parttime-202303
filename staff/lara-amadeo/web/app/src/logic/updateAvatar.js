import { context } from "../ui.js"
// import { validateBase64ImageFormat } from "./helpers/validators.js"  

export function updateAvatar(url){
    if(!url) throw new Error('Image not uploaded correctly')
    
    // if(!validateBase64ImageFormat(url)) throw new Error('Image format invalid')
    
    context.userAvatar = url

    return url
}
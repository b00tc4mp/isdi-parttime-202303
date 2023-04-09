import { menuHeader } from '../pages/header.mjs'
import { context } from "../ui.mjs"
import { userAccount } from '../pages/user-account.mjs'
import { findUserById } from './helpers/data-managers.mjs'

// export function updateUserImage(user) {
//     const id = findUserById(user)
//     let avatar = userAccount.querySelector('.avatar img.image-profile')
//     const imageInput = userAccount.querySelector('form.user-info input[name="file"]')
//     id.imageProfile = avatar.src
//     avatar = userAccount.querySelector('.avatar img.image-profile').classList.remove('hidden')
//     const avatarHeader = menuHeader.querySelector('.avatar img.image-profile').classList.remove('hidden')
//     imageInput.value = ""
// }

export function uploadImage(user, imageTarget, imageSource) {
    const id = findUserById(user)
    let avatar = imageTarget
    const imageInput = imageSource
    id.imageProfile = avatar.src
    imageInput.value = ""
}

// TODO 
// only show new image profile if save it
// if cancel not save changes
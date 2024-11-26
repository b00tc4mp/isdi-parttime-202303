import { findUserById } from './helpers/data-managers.js'

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
import { findUserById } from './helpers/data-managers.js'
import { users, saveUsers } from "../data.js"
import { context } from '../ui.js'


export function uploadImage(userId, imageTarget, imageSource) {
    // const id = findUserById(user).slice(5)
    const currentUser = users.find(user => user.id === userId)

    let avatar = imageTarget
    const imageInput = imageSource
    context.image = avatar.src
    currentUser.image = avatar.src
    imageInput.value = ""
    saveUsers()
}

// TODO 
// only show new image profile if save it
// if cancel not save changes
import { findUserById } from './../helpers/data-managers.js'
import { users, saveUser } from "../../data.js"
import { context } from '../../ui.js'
import { pushUserDataToHeader } from "../../components/helpers/push-user-to-header.js"
import { pushUserDataInForm } from "../../components/helpers/push-user-data-in-form.js"


const _users = users()
export function uploadImage(userId, imageTarget, imageSource) {
    // const id = findUserById(user).slice(5)
    const currentUser = _users.find(user => user.id === userId)
    const user = findUserById(userId)

    let avatar = imageTarget
    const imageInput = imageSource
    context.image = avatar.src
    currentUser.image = avatar.src
    imageInput.value = ""
    saveUser(user)
    pushUserDataToHeader(userId)
    pushUserDataInForm(userId)
}

// TODO 
// only show new image profile if save it
// if cancel not save changes
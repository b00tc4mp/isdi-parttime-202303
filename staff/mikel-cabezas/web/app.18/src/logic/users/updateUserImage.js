import { findUserById } from '../helpers/dataManagers.js'
import { users, saveUser } from "../../data.js"
import { context } from '../../ui.js'
import { pushUserDataToHeader } from "../../components/helpers/push-user-to-header.js"
import { pushUserDataInForm } from "../../components/helpers/push-user-data-in-form.js"


const _users = users()
export default function uploadImage(userId, image) {
    const user = findUserById(userId)
    context.image = image.src
    user.image = image.src
    saveUser(user)
}

// TODO 
// forceUpdate Header
// forceUpdate User View
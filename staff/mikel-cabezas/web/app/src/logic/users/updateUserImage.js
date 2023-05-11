import { findUserById } from '../helpers/dataManagers.js'
import { users, saveUser } from "../../data.js"
import { context } from '../../ui.js'



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
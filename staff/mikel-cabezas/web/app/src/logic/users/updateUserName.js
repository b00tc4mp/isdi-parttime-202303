import { findUserById } from "../helpers/dataManagers.js"
import { users, saveUser } from "../../data.js"
import { pushUserDataToHeader } from "../../components/helpers/push-user-to-header.js"

export default function updateUserName(userId, newName) {
    // const _users = users()
    const user = findUserById(userId)
        user.name = newName
        saveUser(user)
        pushUserDataToHeader(userId)
    }
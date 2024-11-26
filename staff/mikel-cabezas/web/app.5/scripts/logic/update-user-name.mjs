import { findUserById } from "./helpers/data-managers.mjs"
import { userAccount } from "../pages/user-account.mjs"

export function updateUserName(userId) {
    const user = findUserById(userId)
    const newName = userAccount.querySelector('form.user-info input[name="name"]').value
        user.name = newName
}
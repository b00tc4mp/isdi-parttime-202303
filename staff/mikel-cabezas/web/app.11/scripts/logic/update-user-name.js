import { findUserById } from "./helpers/data-managers.js"
import { userAccount } from "../pages/user-account.js"
import { saveUsers } from "../data.js"


export function updateUserName(userId) {
    const user = findUserById(userId)
    const newName = userAccount.querySelector('form.user-info input[name="name"]').value
        user.name = newName
        saveUsers ()
}
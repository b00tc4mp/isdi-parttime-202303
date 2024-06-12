import { saveUserInStorage } from "../data.js"
import { findUserbyId } from "./helpers/data-managers.js"
import { context } from "../ui.js"

export const updateEmail = (currentEmail, newEmail, confirmNewEmail) => {

    const user = findUserbyId(context.userId)

    if (!user)
    throw new Error('User not found')

    if (currentEmail !== user.email)
    throw new Error('Invalid current email')

    if (currentEmail === newEmail)
    throw new Error('New email cannot be the same as current email')

    if (newEmail !== confirmNewEmail)
    throw new Error('New emails do not match')

    user.email = newEmail

    saveUserInStorage(user)
}
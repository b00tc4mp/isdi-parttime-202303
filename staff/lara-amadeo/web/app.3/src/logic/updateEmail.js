import { saveUserInStorage } from "../data"
import { findUserbyId } from "./helpers/data-managers"
import { context } from "../ui"

/**
 * Places the new email in user's database
 * @param {string} currentEmail user's current email
 * @param {string} newEmail user's new email
 * @param {string} confirmNewEmail confirmation of new email
 */

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
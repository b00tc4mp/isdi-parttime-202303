import { findUserbyEmail } from "./helpers/data-managers.js"

export const authenticateUser = (inputEmail, inputPassword) => {
    const foundUser = findUserbyEmail(inputEmail)

    if (!foundUser) throw new Error('User not found')
    if (foundUser.password !== inputPassword) throw new Error('Invalid email or password')

    return foundUser.id
}
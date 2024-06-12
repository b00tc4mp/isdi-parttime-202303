import { findUserByEmail } from "./helpers/data-manager.js"

export function authenticateUser(email, password) {

    const user = findUserByEmail(email)

    if (!user)
        throw new Error('user not found')

    if (user.password !== password)
        throw new Error('wrong password')

    return user.id
}
import { findUserById } from './helpers/data-manager'

export default function retrieveUser(userId) {
    
    let user = findUserById(userId)

    if (!user)
        throw new Error('user not found')

    user = {
        name: user.name,
    }

    return user
}
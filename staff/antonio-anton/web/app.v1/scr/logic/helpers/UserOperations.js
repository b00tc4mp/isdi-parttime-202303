import { users } from '../../assets/data/dummyreg.js'

//Find a user by GUID

export function findUserById(userId) {
    let foundUser

    for (let i = 0; i < users.length; i++) {
        const user = users[i]

        if (user.guid === userId) {
            foundUser = user

            break
        }
    }

    return foundUser
}

//Find a user by email..Only when login will by use

export function findUserByEmail(email) {
    let foundUser

    for (let i = 0; i < users.length; i++) {
        const user = users[i]

        if (user.email === email) {
            foundUser = user

            break
        }
    }

    return foundUser
}
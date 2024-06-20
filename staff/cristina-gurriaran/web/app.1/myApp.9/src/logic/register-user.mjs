import {validateName, validateEmail,validatePassword} from './helpers/validators.mjs'

import {findUserByEmail} from './helpers/data-managers.mjs'

import {users, saveUsers} from '../data.mjs'

export function registerUser(name, email, password) {
    validateName(name)
    validateEmail(email)
    validatePassword(password)

    const foundUser = findUserByEmail(email, password)

    if(foundUser) 
        throw new Error ('user already exists')
    let id = 'user-1'

    const _users = users()

    const lastUser = _users[_users.length-1]
     if (lastUser)
        id = 'user-' + (parseInt(lastUser.id.slice(5)) + 1)


    const user = {
        id, 
        name, 
        email, 
        password
    }

    _users.push(user)
    saveUsers(_users)
}
import { users } from '../data.js'

export function authenticateUser(email, password)  {
    var checkUserId = users.find(user => user.email === email)
    var checkPassword = users.find(user => user.password === password)
    
    if (!checkUserId) {
        throw new Error('User or password incorrect')
    }

    if (!checkPassword) {
        throw new Error('User or password incorrect')
    }
    return checkUserId.id
}
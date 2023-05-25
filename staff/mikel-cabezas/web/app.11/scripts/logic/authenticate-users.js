import { users } from '../data.js'



export function authenticateUser(email, password)  {
    const _users = users()
    var checkUserId = _users.find(user => user.email === email)
    var checkPassword = _users.find(user => user.password === password)
    
    if (!checkUserId) {
        throw new Error('User or password incorrect')
    }

    if (!checkPassword) {
        throw new Error('User or password incorrect')
    }
    return checkUserId.id
}
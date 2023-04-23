import { users } from '../data.js'
import { userAccount } from '../pages/user-account.js'

const _users = users()

export function pushUserDataInForm(id) {
    var userID = _users.map(user => user.id).indexOf(id) 
    if (_users[userID].id === id) {
        userAccount.querySelector('form.user-info input[name="name"]').value = _users[userID].name
        userAccount.querySelector('form.user-info input[name="email"]').value = _users[userID].email

        const currentUserId = id
    }
}

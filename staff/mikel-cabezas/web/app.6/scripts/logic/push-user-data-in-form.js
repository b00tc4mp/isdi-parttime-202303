import { users } from '../data.js'
import { userAccount } from '../pages/user-account.js'
export function pushUserDataInForm(id) {
    var userID = users.map(user => user.id).indexOf(id) 
    if (users[userID].id === id) {
        userAccount.querySelector('form.user-info input[name="name"]').value = users[userID].name
        userAccount.querySelector('form.user-info input[name="email"]').value = users[userID].email

        const currentUserId = id
    }
}

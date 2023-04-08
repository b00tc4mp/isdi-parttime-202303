import { users } from '../data.mjs'
import { userAccount } from '../pages/user-account.mjs'
export function pushUserDataInForm(id) {
    var userID = users.map(user => user.id).indexOf(id) 
    if (users[userID].id === id) {
        userAccount.querySelector('form.user-info input[name="name"]').value = users[userID].name
        userAccount.querySelector('form.user-info input[name="email"]').value = users[userID].email
        // userAccount.querySelector('form.user-password input.current-password').value = users[userID].password
        const currentUserId = id
    }
}

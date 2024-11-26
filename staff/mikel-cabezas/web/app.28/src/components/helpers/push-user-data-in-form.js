import { users } from '../../data.js'
// import { userAccount } from '../../pages/user-account.js'

export function pushUserDataInForm(id) {
    const _users = users()
    const userID = _users.map(user => user.id).indexOf(id) 
    if (_users[userID].id === id) {
        const userAccount = document.querySelector('.container.user-account')
        userAccount.querySelector('form.user-info input[name="name"]').value = _users[userID].name
        userAccount.querySelector('form.user-info input[name="email"]').value = _users[userID].email
    }
}

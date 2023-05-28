import {validateName, validateEmail,validatePassword} from './helpers/validators.js'
import {saveUsers, findUserByEmail, loadUsers} from '../data.js'

export function registerUser(name, email, password, callback) {
    validateName(name)
    validateEmail(email)
    validatePassword(password)

    findUserByEmail(email, foundUser => {

        if(foundUser) {
            callback(new Error ('user already exists'))
            return
        }

        let id = 'user-1'

        loadUsers(users => {
            const lastUser = users[users.length-1]

            if (lastUser)
                id = 'user-' + (parseInt(lastUser.id.slice(5)) + 1)

            const user = {
                id, 
                name, 
                email, 
                password
            }

            users.push(user)
            saveUsers(users, () => callback(null))
        })
    })
}
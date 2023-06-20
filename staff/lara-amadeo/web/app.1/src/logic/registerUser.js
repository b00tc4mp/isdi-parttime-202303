import { loadUsers, saveUsersInStorage, findUserbyEmail } from "../data"
import { validateEmail, validatePassword } from "./helpers/validators"
import { DEFAULT_AVATAR_URL } from "../ui"

/**
 * Registers a user in the database
 * @param {string} username user's username
 * @param {string} email user's email
 * @param {string} password user's password
 * @param {string} repPassword user's password repetition
 */

export const registerUser = (username, email, password, repPassword, callback) => {

    validateEmail(email)
    validatePassword(password)
    validatePassword(repPassword, 'new password')

    findUserbyEmail(email, foundUser => {

        if (foundUser){
            callback(new Error('User already exists'))

            return
        }
        //sacarlo fuera
        if (password !== repPassword){
            callback(new Error('Passwords do not match'))

            return
        } 
    

        loadUsers(users => {
            let id = 'user-1'
            const lastUser = users[users.length - 1]
    
            if (lastUser)
                id = 'user-' + (Number(lastUser.id.slice(5)) + 1)
    
            users.push({
                id,
                username: username,
                email: email,
                password: password,
                avatar: DEFAULT_AVATAR_URL,
                likedPosts: ['populate']
            })

            saveUsersInStorage(users, () => callback(null))
        })
    })
}

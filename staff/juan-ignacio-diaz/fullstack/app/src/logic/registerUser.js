import { loadUsers, saveUsers, findUserByEmail, newUserId } from "../data"
import { validateName, validateEmail, validatePassword, validateCallback } from "./helpers/validators"

export default function registerUser (name, email, password, callback) {
    validateName(name)
    validateEmail(email)
    validatePassword(password)
    validateCallback(callback)
 
    findUserByEmail(email, user => {
        if (user) {
            callback(new Error('user already exists'))

            return
        }

        loadUsers(users =>{   
            newUserId(id =>{
                users.push({
                    id: id,
                    name: name,
                    email: email,
                    password: password,
                    favs: []
                })

                saveUsers(users, () => callback(null))
            })       
        })
     })
}
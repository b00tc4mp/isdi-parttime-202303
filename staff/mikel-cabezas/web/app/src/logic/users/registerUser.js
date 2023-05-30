import { validateEmail, validatePassword, validateCallback } from "../helpers/validators.js"
import { saveUser } from "../../data.js"

export default function registerUser(name, email, password, callback) {
    validateCallback(callback)
    validateEmail(email)
    validatePassword(password)
    findUserByEmail(email, foundUser => {
        if(foundUser) {
            callback( new Error('user already exists'))
            
            return
        }

        let id
        loadUsers(users => {

            var checkEmail = users.find(user => user.email === email)
            if(checkEmail) {
                throw new Error('Email already registered')
            }
            if(checkEmail !== email) {
                name = name.trim()
                const user = {
                    id: 'user-' + parseInt(_users.length + 1),
                    name: name,
                    email: email,
                    password: password,
                    favPosts: []
                }
                users.push(user)
                saveUser(users, callback)
                console.log(users)
                return user.name
            }
        })
    }) 
}

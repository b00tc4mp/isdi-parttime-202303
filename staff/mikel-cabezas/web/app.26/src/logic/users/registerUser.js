import { validateEmail, validatePassword } from "../helpers/validators.js"
import { saveUser } from "../../data.js"

export default function registerUser(name, email, password, callback) {


    findUserByEmail(email, foundUser => {
        if(foundUser) {
            callback( new Error('user already exists'))
            
            return
        }

        let id
        loadUsers(users => {
            validateEmail(email)
            validatePassword(password)
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
                    likedPosts: []
                }
                users.push(user)
                saveUser(users, callback)
                console.log(users)
                return user.name
            }
        })
    }) 
}

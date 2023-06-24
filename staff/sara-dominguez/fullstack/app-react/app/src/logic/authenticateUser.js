// import { validateEmail, validatePassword, validateCallback } from "./helpers/validators.js"
// import { findUserByEmail } from "../data.js"
import{ validators } from 'com'

const { validateEmail, validatePassword, validateCallback } = validators

/**
 * Authenticate a user by email and password
 * 
 * @param {string} email the user`s email
 * @param {string} password the user`s password
 * 
 * @returns {string} The user's id
 */

export function authenticateUser (email, password, callback) {
    validateEmail(email)    
    validatePassword(password)
    validateCallback(callback)
 
const xhr = new XMLHttpRequest


xhr.onload = () => {
  const { status } = xhr

  if (status !== 200) {
    const { response: json } = xhr
    const { error } = JSON.parse(json)

    callback(new Error(error))

    return
  }

  const { response: json } = xhr
  const userId  = JSON.parse(json)

  callback(null, userId)
}

xhr.onerror = () => {
  callback(new Error('conection error'))
}

xhr.open('POST', `${import.meta.env.VITE_API_URL}/users/auth`)

xhr.setRequestHeader('Content-Type', 'application/json')

//enviamos los datos del usuario y lo convertimos a json
const user = { email, password }
const json = JSON.stringify(user)

xhr.send(json)

}
    // findUserByEmail(email, foundUser =>{
    //     if(!foundUser) {
    //        callback(new Error ('User not found'))

    //         return
    //     }
    
    //     if (foundUser.password !== password) {
    //         callback(new Error ('Wrong password'))

    //         return
    //     }
        
    //     callback(null, foundUser.id)
//         // este null es de que no ha habido errores, se indica primero)
//     })
// }


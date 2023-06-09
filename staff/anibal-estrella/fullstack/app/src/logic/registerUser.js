import { validators } from 'com'

const { validateName, validateEmail, validatePassword, validateCallback } = validators

export default function registerUser(name, email, password, repeatPasword, callback) {
    validateName(name, 'name')
    validateEmail(email, 'password')
    validatePassword(password, 'password')
    validatePassword(repeatPasword, 'password')
    validateCallback(callback, 'callback function')

    //the connector that allows us to connect with the server
    const xhr = new XMLHttpRequest

    //this is the response from the server tha will cue as a callback
    xhr.onload = () => {
        // test the status code (201?)

        const { status } = xhr
        //if the respoinse isn't 201 ther's an error
        if (status !== 201) {
            //parse the response status in xhr
            const { response: json } = xhr
            //grab the error prpoerty from tghe object
            const { error } = JSON.parse(json)

            callback(new Error(error))

            return
        }
        callback(null)
    }

    // the function to check if there's a connection error
    xhr.onerror = () => {
        callback(new Error('Connection Error!'))
    }
    // oppen the connection and send the data
    xhr.open('POST', `${import.meta.env.VITE_API_URL}/users/auth`)
    // tell the server the content type to send (json)
    xhr.setRequestHeader('Content-Type', 'application/json')
    //create the user object
    const user = { name, email, password }
    //create the JSON as a string
    const json = JSON.stringify(user)
    //send the data as a json
    xhr.send(json)

}
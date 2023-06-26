const context = require('./context')
const { validators: { validateName, validateEmail, validatePassword } } = require('com')

module.exports = function registerUser(name, email, password) {
    validateName(name)
    validateEmail(email)
    validatePassword(password)

    const { users } = context

    //AHORA CON PROMESAS
    return users.insertOne({ name, email, password, avatar: null, favs: [] })
        .catch(error => {
            if (error.message.includes('E11000'))
                throw new Error(`user with email ${email} already exists`)
        })


    // ANTES CON CALLBACKS
    // readFile(`${process.env.DB_PATH}/users.json`, 'utf8', (error, json) => {
    //     if (error) {
    //         callback(error)

    //         return
    //     } 
    //     const users = JSON.parse(json) 

    //     let user = users.find(user => user.email === email)

    //     if (user) {
    //         callback(new Error(`user with email ${email} already exist`))

    //         return
    //     }
    //     let id = 'user-1'

    //     const lastUser = users[users.length - 1]

    //     if (lastUser)
    //         id = `user-${parseInt(lastUser.id.slice(5)) + 1}`


    //     user = ({
    //         id,
    //         name,
    //         email,
    //         password,
    //         avatar: null,
    //         favs: []
    //     })

    //     users.push(user)

    //     //añadimos dos parámetros para que se guarde formateado
    //     json = JSON.stringify(users, null, 4)


    //     writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf8', error => {
    //         if (error) {
    //             callback(error)

    //             return
    //         }

    //         callback(null)

    //     })
    // })

}
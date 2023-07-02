const context = require('./context')
const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')
const { ObjectId } = require('mongodb')

module.exports = function retrieveUser(userId) {
    validateId(userId)

    const { users } = context

    // pasamos userId a object con el siguiente metodo:
    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new ExistenceError('user not found')


            // 1. Opcion, pero supone crear un objeto nuevo en lugar de utilizar el que obtengo, no quiero retornar datos confidenciales del usuario:

            // const {name, email} = user
            // return {
            //     name,
            //     email
            // }

            // 2. sanitaze
            delete user._id
            delete user.password
            delete user.favs

            return user
        })



    // ANTES CON CALLABACKS
    // readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
    //     if (error) {
    //         callback(error)

    //         return
    //     }

    //     const users = JSON.parse(json)
    //     const user = users.find(user => user.id === userId)

    //     if (!user) {
    //         callback(new Error(`user with id ${userId} not found`))

    //         return
    //     }

    //     const { name, email, avatar } = user

    //     const user2 = { name, email, avatar }


    //     callback(null, user2)
    // })



}

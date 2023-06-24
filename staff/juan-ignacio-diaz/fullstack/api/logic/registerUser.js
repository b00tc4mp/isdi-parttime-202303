const { validators: { validateName, validateEmail, validatePassword } } = require('com')

const context = require('./context')

module.exports = (name, email, password) => {
    validateName(name)
    validateEmail(email)
    validatePassword(password)

    const { users } = context

    return users.insertOne({ name, 
                email, 
                password, 
                avatar: null,
                favs: [],
                mode: '' })
            .catch(error =>{
                if(error.menssage.include('E11000'))
                    throw new Error(`user with email ${email} already exists`)

                throw error
            })

}
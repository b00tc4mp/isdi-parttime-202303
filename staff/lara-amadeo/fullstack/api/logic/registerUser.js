const { validators: { validateText, validateEmail, validatePassword } } = require('com')
const context = require('./context')


module.exports = function registerUser(username, email, password) {

    validateText(username)
    validateEmail(email)
    validatePassword(password)

    const { users } = context

    return users.insertOne({
        username,
        email,
        password,
        avatar: null,
        likedPosts: [],
        savedPosts: [] })

}
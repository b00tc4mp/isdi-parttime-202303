const { validators: { validateText, validateEmail }, errors: { ExistenceError } } = require('com')
const { Administrator, Message } = require('../../data/models')

module.exports = (author, email, title, text, status) => {
   validateText(author, 'author')
   validateEmail(email, 'email')
    validateText(title, 'title')
    validateText(text, 'text')
    

    return Message.create({author: author, email: email, title: title, text: text, status: status })
}
const {
    errors: { ExistenceError, ContentError },
    validators: { validateEmail, validateId } } = require('com')

const { User, Post } = require('../data/models.js')

/**
 * 
 * @param {*} userId 
 * @param {*} newEmail 
 * @param {*} newEmailConfirm 
 * @returns 
 */

module.exports = (userId, newEmail, newEmailConfirm) => {

    validateId(userId, 'user id')
    validateEmail(newEmail, 'Email')
    validateEmail(newEmailConfirm, 'Email')

    if (newEmail !== newEmailConfirm) throw new ExistenceError(`the new Emails confirmation doesn't match`)


    return Promise.all([
        User.findById(userId, 'Email').lean(),

    ]).then(([user]) => {
        if (!user) throw new ExistenceError(`user with the id ${userId} not found`)
        if (newEmail === user.Email) throw new ExistenceError(`new Email must be different from old one`)

        return User.updateOne(
            { _id: userId },
            {
                email: newEmail,
            })
    })
        .then(() => { })
}


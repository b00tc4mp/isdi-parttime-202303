const { validators: { validateEmail }, errors: { ContentError } } = require('com')
const { UsersData } = require('../../data/models')

module.exports = (email) => {
    validateEmail(email)

    return UsersData.find({ "usersMail": email })
        .then(user => {
            if (user.length === 0) {
                throw new ContentError('User is not registered')
            }
            else {
               return UsersData.deleteOne({ "usersMail": email })
            }

        })
}
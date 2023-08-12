const { validators: { validateEmail }, errors: { DuplicityError } } = require('com')
const { UsersData } = require('../../data/models')

module.exports = (email) => {
    validateEmail(email)

    return UsersData.find({ "usersMail": email })
        .then(user => {
            if (user.length!==0) {
                throw new DuplicityError('User is already registered')
            }
            else {
               return UsersData.create({ usersMail: email })
            }
        })
}
const { User } = require('../../../data/models')

module.exports = (user) => {
    return User.create(user)
        .then(tmpUser => {
            user.id = tmpUser._id.toString()

            return user
        })
}
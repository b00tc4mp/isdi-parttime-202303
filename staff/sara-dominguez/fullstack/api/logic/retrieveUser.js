const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')

module.exports = function retrieveUser(userId) {
    validateId(userId)

    const { User } = require('../data/models')

    // return User.find({ _id: userId })
    // aprovechamos .findById() en la lógica que te permite traer el id sin el ObjectId, te lo convierte automáticamente a String

    return User.findById(userId)
        .then(user => {
            if (!user) throw new ExistenceError('user not found')

            // 2. sanitaze
            delete user._id
            delete user.password
            delete user.favs

            return user
        })
}
const { errors: { ExistanceError } } = require('../../com')
const { User } = require('../data/models')

module.exports = async function retrieveUser(userId) {
    let foundUser
    try {
        foundUser = await User.findById(userId)
        const { username, name, email, avatar, description, tags, location, likedChefs, reviews, availability } = foundUser

        const user = { username, name, email, avatar, description, tags, location, likedChefs, reviews, availability }

        return user
    } catch (error) {
        if (!foundUser) {
            throw new ExistanceError(`User with id ${userId} not found`)
        }
    }
}

/*
return User.findById(userId)
        .then(foundUser => {
            if (!foundUser) {
                throw new ExistanceError(`User with id ${userId} not found`)
            }
            const { username, name, email, avatar, description, tags, location, likedChefs, reviews, availability } = foundUser

            const user = { username, name, email, avatar, description, tags, location, likedChefs, reviews, availability }

            return user
        })*/
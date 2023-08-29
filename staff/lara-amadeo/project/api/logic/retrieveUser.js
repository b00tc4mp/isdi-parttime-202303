const { errors: { ExistanceError } } = require('../../com')
const { User } = require('../data/models')

module.exports = async function retrieveUser(userId) {
    const foundUser = await User.findById(userId)
    if (!foundUser) throw new ExistanceError(`User with id ${userId} not found`)

    const { username, name, email, avatar, description, tags, location, likedChefs, reviews, availability } = foundUser

    const user = { username, name, email, avatar, description, tags, location, likedChefs, reviews, availability }

    return user
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
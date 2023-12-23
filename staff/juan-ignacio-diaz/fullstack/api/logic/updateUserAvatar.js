const { 
    validators: { validateId, validateUrl },
    errors: { ExistenceError }  
} = require('com')

const { User } = require('../data/models')

module.exports = (userId, avatar) => {
    validateId(userId, 'user id')
    validateUrl(avatar, 'avatar')

    return (async () => { 
        const user = await User.findById(userId)

        if (!user) throw new ExistenceError('user not found')

        await User.findByIdAndUpdate(userId, { $set: { avatar: avatar }})
    })()
}
const { 
    validators: { validateId },
    errors: { ExistenceError }  
} = require('com')

const { User } = require('../data/models')

module.exports = (userId, mode) => {
    validateId(userId, 'user id')

    return (async () => { 
        const user = await User.findById(userId)

        if (!user) throw new ExistenceError('user not found')

        await User.findByIdAndUpdate(userId, { $set: { mode: mode }})
    })()
 
}
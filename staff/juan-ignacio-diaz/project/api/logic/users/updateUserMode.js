const { 
    validators: { validateId },
    errors: { ExistenceError }  
} = require('com')

const { User } = require('../../data/models')

/**
 * Update a user's mode view by userId
 * 
 * @param {oid} userId The user's userId
 * @param {string} mode The user's mode view
 * 
 * @throws {ExistenceError} On existing email
 */
module.exports = (userId, mode) => {
    validateId(userId, 'user id')

    return (async () => { 
        const user = await User.findById(userId)

        if (!user) throw new ExistenceError('user not found')

        await User.findByIdAndUpdate(userId, { $set: { mode: mode }})
    })()
 
}
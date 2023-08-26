const { 
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')

const { User, List } = require('../../data/models')

/**
 * retriew lists from user have notify to accept by userId
 * 
 * @param {string} userId  The Id of the user.
 * 
 * @returns {Promise<User: name >} The users id
 * 
 * @throws {ExistenceError} On existing userId
 */
module.exports = (userId) => {
    validateId(userId, 'user id')

    return (async () => { 
        const user = await User.findById(userId)

        if (!user) throw new ExistenceError('user not found')
        
        const lists = await List.find({ "invited": userId }, 'name date dateToEnd')
            .sort('-date').lean()

        lists.forEach(list => {                        
            list.id = list._id.toString()
            delete list._id
        })

        return lists
    })()
}
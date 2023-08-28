const { 
    validators: { validateId },
    errors: { ExistenceError, InvalidDataError }
} = require('com')

const { User, List } = require('../../data/models')

/**
 * retriew list by userId and listId
 * 
 * @param {string} userId  The Id of the user to list.
 * 
 * @returns {Promise<List: name date>} The list id
 * 
 * @throws {ExistenceError} On existing userId
 */
module.exports = (listId, userId) => {
    validateId(userId, 'user id')
    validateId(listId, 'list id')

    return (async () => { 
        const user = await User.findById(userId)

        if (!user) throw new ExistenceError('user not found')
        
        const list = await List.findById(listId, 'name date dateToEnd guests').lean()

        if (!list) throw new ExistenceError('list not found')

        if(!(list.guests.some(user => user.toString() === userId))) throw new InvalidDataError('user invalid') 

        list.id = list._id.toString()
        delete list._id

        delete list.guests
        
        return list
    })()
}
const { 
    validators: { validateId },
    errors: { ExistenceError }
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
        
        const list = await List.findById(listId, 'name date dateToEnd owner, guests, invited')
            .populate('owner','name avatar email' )
            .populate('invited','name avatar email' )
            .populate('guests','name avatar email' ).lean()

        if (!list) throw new ExistenceError('list not found')

        if(list.owner.toString() !== userId)) throw new InvalidDataError('user invalid') 

        list.id = list._id.toString()
        delete list._id

        list.owner.id = list.owner._id.toString()
        delete list.owner._id

        list.invited.forEach(user => {                        
            if(user._id) {
                user.id = user._id.toString()
                delete user._id
            }
        })

        list.guests.forEach(user => {                        
            if(user._id) {
                user.id = user._id.toString()
                delete user._id
            }
        })

        return list
    })()
}
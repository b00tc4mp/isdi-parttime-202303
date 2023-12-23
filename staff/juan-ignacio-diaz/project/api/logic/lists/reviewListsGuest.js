const { 
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')

const { User, List } = require('../../data/models')

/**
 * retriew lists guest by userId
 * 
 * @param {string} userId  The Id of the user to list.
 * 
 * @returns {Promise<Liss: name date>} The list id
 * 
 * @throws {ExistenceError} On existing userId
 */
module.exports = (userId) => {
    validateId(userId, 'user id')

    return (async () => { 
        const user = await User.findById(userId)

        if (!user) throw new ExistenceError('user not found')
        
        const lists = await List.find({ "guests": userId }, 'name date dateToEnd owner')
            .populate('owner', 'name avatar')
            .sort('-date').lean()

        lists.forEach(list => {                        
            list.id = list._id.toString()
            delete list._id

            if (list.owner._id) {
                list.owner.id = list.owner._id.toString()
                delete list.owner._id
            }
        })

        return lists
    })()
}
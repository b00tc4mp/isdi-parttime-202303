const { 
    validators: { validateId },
    errors: { ExistenceError, InvalidDataError }
} = require('com')

const { User, List } = require('../../data/models')

/**
 * user decline invited to list by listId and userId
 * 
 * @param {string} listId  The Id of list.
 * @param {string} userId  The Id of the user.
 * @param {string} contactId  The Id of the contact delete.
 *
 * @throws {ExistenceError} On existing userId, listId
 * @throws {DuplicityError} On existing userId
 */
module.exports = (listId, userId, contactId) => {
    validateId(listId, 'list id')
    validateId(userId, 'user id')
    validateId(contactId, 'contact id')

    return (async () => {   
        const [list, user, contact] = await Promise.all([List.findById(listId), User.findById(userId), User.findById(contactId)])

        if (!list) throw new ExistenceError('list not found')

        if (!user) throw new ExistenceError('user not found')

        if (list.owner._id.toString() !== user._id.toString()) throw new InvalidDataError('owner not valid')

        if (!contact) throw new ExistenceError('contact not found')

        if (!(list.invited.some(user => user.toString() === contactId))) throw new ExistenceError('not a user notify')

        await List.findByIdAndUpdate(listId, { $pullAll: { invited: [contactId] } })

    })()
}
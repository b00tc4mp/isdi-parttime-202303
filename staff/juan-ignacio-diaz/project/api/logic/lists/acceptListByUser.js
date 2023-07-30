const { 
    validators: { validateId },
    errors: { ExistenceError, DuplicityError, UnknownError }
} = require('com')

const { User, List } = require('../../data/models')

/**
 * user accept to list by listId and userId
 * 
 * @param {string} listId  The Id of list.
 * @param {string} userId  The Id of the user notified.
 *
 * @throws {ExistenceError} On existing userId, listId
 * @throws {DuplicityError} On existing userId
 */
module.exports = (listId, userId) => {
    validateId(listId, 'list id')
    validateId(userId, 'user id')

    return (async () => {   
        const [list, user, contact] = await Promise.all([List.findById(listId), User.findById(userId)])

        if (!list) throw new ExistenceError('list not found')

        if (!user) throw new ExistenceError('user not found')

        if (!(list.notifyAcceptList.some(user => user.toString() === userId))) throw new ExistenceError('not a user notify')

        if (list.users.some(user => user.toString() === userId)) throw new DuplicityError('user already exists')

        await List.findByIdAndUpdate(listId, { $pullAll: { notifyAcceptList: [userId] }, $push: { users: [userId] } })

    })()
}
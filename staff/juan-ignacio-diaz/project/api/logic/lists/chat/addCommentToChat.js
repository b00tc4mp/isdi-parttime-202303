const { 
    validators: { validateId, validateText },
    errors: { ExistenceError }
} = require('com')

const { User, List } = require('../../../data/models')

/**
 * add comment to chat od list by listId, userId and comment
 * 
 * @param {string} listId  The Id of the list.
 * @param {string} userId  The Id of the user add comment.
 * @param {string} text The text to comment.
 *
 * @throws {ExistenceError} On existing userId and listId
 */
module.exports = (listId, userId, text) => {
    validateId(listId, 'list id')
    validateId(userId, 'user id')
    validateText(text, 'comment')

    return (async () => {   
        const [list, user] = await Promise.all([List.findById(listId), User.findById(userId)])

        if (!list) throw new ExistenceError('list not found')

        if (!user) throw new ExistenceError('user not found')

        if (!(list.users.some(tmpId => tmpId.toString() === userId))) throw new ExistenceError('invalid user')

        const comment  = {
            text,
            author: userId
        }

        await List.findByIdAndUpdate(listId, { $push: { chat: [comment] } }) 
    })()
}
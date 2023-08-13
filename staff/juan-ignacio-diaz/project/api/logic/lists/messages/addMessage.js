const { 
    validators: { validateId, validateText },
    errors: { ExistenceError }
} = require('com')

const { User, List, Message } = require('../../../data/models')

/**
 * add message to list by listId, userId and text
 * 
 * @param {string} listId  The Id of the list.
 * @param {string} userId  The Id of the user add message.
 * @param {string} text The text to message.
 *
 * @throws {ExistenceError} On existing userId and listId
 */
module.exports = (listId, userId, text) => {
    validateId(listId, 'list id')
    validateId(userId, 'user id')
    validateText(text, 'message')

    return (async () => {   
        const [list, user] = await Promise.all([List.findById(listId), User.findById(userId)])

        if (!list) throw new ExistenceError('list not found')

        if (!user) throw new ExistenceError('user not found')

        if (!(list.guests.some(tmpId => tmpId.toString() === userId))) throw new ExistenceError('invalid user')

        const message  = new Message({
            text,
            author: userId,
            view: list.guests.filter(tmpUser => tmpUser._id.toString() !== userId)
        })

        await List.findByIdAndUpdate(listId, { $push: { messages: [message] } }) 
    })()
}
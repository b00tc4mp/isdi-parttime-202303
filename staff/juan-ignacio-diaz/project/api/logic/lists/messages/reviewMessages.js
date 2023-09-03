const { 
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')

const { User, List } = require('../../../data/models')

/**
 * retriew messages lists by userId
 * 
 * @param {string} userId  The Id of the user to list.
 * @param {string} listId  The Id of the list.
 * 
 * @returns {Promise<messages: text date name avatar >} The list id
 * 
 * @throws {ExistenceError} On existing userId
 */
module.exports = (listId, userId) => {
    validateId(userId, 'user id')
    validateId(listId, 'list id')

    return (async () => { 
        
        const user = await User.findById(userId)

        if (!user) throw new ExistenceError('user not found')
        
        const list = await List.findById(listId, 'messages')
            .populate('messages.author', 'name avatar').lean()

        if (!list) throw new ExistenceError('list not found')

        const  messages  = list.messages

        if(messages.length>0) {
            messages.forEach(message => {                        
                message.id = message._id.toString()
                delete message._id

                if (message.author._id) {
                    message.author.id = message.author._id.toString()
                    delete message.author._id
                }

                message.reviewed = message.view.some(tmpUser => tmpUser._id.toString() === userId)
                delete message.view
            })

            messages.sort((a,b) =>{
                    if(a.date > b.date) return -1
                    if(a.date < b.date) return 1
                    return 0
                })

            const listView = await List.findById(listId, 'messages')
            const messagesView = listView.messages
            messagesView.forEach(message => {  
                message.view = message.view.filter(tmpUser => tmpUser._id.toString() !== userId)
            })
            listView.save()
        }
        return messages

    })()
}
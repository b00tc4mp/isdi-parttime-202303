const { 
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')

const { User, List } = require('../../../data/models')

/**
 * retriew chat lists by userId
 * 
 * @param {string} userId  The Id of the user to list.
 * @param {string} listId  The Id of the list.
 * 
 * @returns {Promise<chat: text date name avatar >} The list id
 * 
 * @throws {ExistenceError} On existing userId
 */
module.exports = (userId, listId) => {
    validateId(userId, 'user id')
    validateId(listId, 'list id')

    return (async () => { 
        const user = await User.findById(userId)

        if (!user) throw new ExistenceError('user not found')
        
        const list = await List.findById(listId, 'chat')
            .populate('chat.author', 'name avatar').lean()

        if (!list) throw new ExistenceError('list not found')

        const { chat } = list

        chat.forEach(comment => {                        
            comment.id = comment._id.toString()
            delete comment._id

            if (comment.author._id) {
                comment.author.id = comment.author._id.toString()
                delete comment.author._id
            }

        })

        return chat.sort((a,b) =>{
                if(a.date > b.date) return -1
                if(a.date < b.date) return 1
                return 0
            })
    })()
}
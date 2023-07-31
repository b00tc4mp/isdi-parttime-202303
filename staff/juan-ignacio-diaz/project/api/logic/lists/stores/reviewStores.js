const { 
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')

const { User, List } = require('../../../data/models')

/**
 * retriew stores lists by userId
 * 
 * @param {string} userId  The Id of the user to list.
 * @param {string} listId  The Id of the list.
 * 
 * @returns {Promise<chat: text date name avatar >} The list id
 * 
 * @throws {ExistenceError} On existing userId
 */
module.exports = (listId, userId) => {
    validateId(userId, 'user id')
    validateId(listId, 'list id')

    return (async () => { 
        const user = await User.findById(userId)

        if (!user) throw new ExistenceError('user not found')
        
        const list = await List.findById(listId, 'stores').lean()

        if (!list) throw new ExistenceError('list not found')

        const { stores } = list

        stores.forEach(store => {                        
            store.id = store._id.toString()
            delete store._id
        })

        return stores.sort((a,b) =>{
                if(a.name > b.name) return -1
                if(a.name < b.name) return 1
                return 0
            })
    })()
}
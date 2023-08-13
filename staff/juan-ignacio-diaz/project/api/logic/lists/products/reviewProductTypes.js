const { 
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')

const { User, List, Product } = require('../../../data/models')

/**
 * retriew product types 
 * 
 * @param {string} userId  The Id of the user to list.
 * @param {string} listId  The Id of the list.
 * 
 * @returns {Promise<Product: type >} The values
 * 
 * @throws {ExistenceError} On existing userId
 */
module.exports = (listId, userId) => {
    validateId(userId, 'user id')
    validateId(listId, 'list id')

    return (async () => { 
        const [user, list] = await Promise.all([User.findById(userId), List.findById(listId)])

        if (!user) throw new ExistenceError('user not found')
        
        if (!list) throw new ExistenceError('list not found')

        return Product.schema.path('type').enumValues
    })()
}
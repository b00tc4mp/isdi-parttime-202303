const { 
    validators: { validateId },
    errors: { ExistenceError, InvalidDataError }
} = require('com')

const { User, List, Product } = require('../../../data/models')

/**
 * delete product to list by listId, userId, productId
 * 
 * @param {string} listId  The Id of the list.
 * @param {string} userId  The Id of the user add comment.
 * @param {string} productId The Id of the product to delete.
 *
 * @throws {ExistenceError} On existing userId, listId and listId
 * @throws {InvalidDataError} On invalid store or type
 */
module.exports = (listId, userId, productId) => {
    validateId(listId, 'list id')
    validateId(userId, 'user id')
    validateId(productId, 'product id')

    return (async () => {   
        const [list, user] = await Promise.all([List.findById(listId), User.findById(userId)])

        if (!list) throw new ExistenceError('list not found')

        if (!user) throw new ExistenceError('user not found')

        if (!(list.guests.some(tmpId => tmpId.toString() === userId))) throw new InvalidDataError('invalid user')

        await List.findByIdAndUpdate(listId, { $pull: { products: { _id: productId } } })

    })()
}
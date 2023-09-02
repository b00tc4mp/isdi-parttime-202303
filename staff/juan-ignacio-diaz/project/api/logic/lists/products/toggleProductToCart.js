const { 
    validators: { validateId },
    errors: { ExistenceError, InvalidDataError }
} = require('com')

const { User, List } = require('../../../data/models')

/**
 * toggle state product by listId, userId, producId
 * 
 * @param {string} listId  The Id of the list.
 * @param {string} userId  The Id of the user.
 * @param {string} producId  The Id of the product.
 *
 * @throws {ExistenceError} On existing userId, listId and productId
 * @throws {InvalidDataError} On invalid store or type

 */
module.exports = (listId, userId, producId) => {
    validateId(listId, 'list id')
    validateId(userId, 'user id')
    validateId(producId, 'product id')

    return (async () => {   
        const [list, user] = await Promise.all([List.findById(listId), User.findById(userId)])

        if (!list) throw new ExistenceError('list not found')

        if (!user) throw new ExistenceError('user not found')

        if (!(list.guests.some(tmpId => tmpId.toString() === userId))) throw new InvalidDataError('invalid user')

        const product = list.products.find(product => product.id === producId)

        if (product.state === 'bought') {
            throw new InvalidDataError('invalid state')
        }
        else if (product.state === '') {
            product.buyer = userId
            product.state = 'selected'
        }
        else {
            if (product.buyer.toString() !== userId) throw new InvalidDataError('invalid user')

            product.buyer = null
            product.state = '' 
        }

        product.view = list.guests.filter(tmpUser => tmpUser._id.toString() !== userId)
 
        await list.save() 
    })()
}
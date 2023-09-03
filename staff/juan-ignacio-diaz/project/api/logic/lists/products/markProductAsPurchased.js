const { 
    validators: { validateId, validateNumber, validateArray },
    errors: { ExistenceError, InvalidDataError }
} = require('com')

const { User, List } = require('../../../data/models')

/**
 * mark product as purchased to by listId, userId, producId
 * 
 * @param {string} listId  The Id of the list.
 * @param {string} userId  The Id of the user.
 * @param {string} producId  The Id of the product.
 * @param {number} price  The price of the product.
 * @param {Array string} stores The array to store
 *
 * @throws {ExistenceError} On existing userId, listId and productId
 * @throws {InvalidDataError} On invalid store or type

 */
module.exports = (listId, userId, producId, price, stores) => {
    validateId(listId, 'list id')
    validateId(userId, 'user id')
    validateId(producId, 'product id')
    validateNumber(price, 'price', 1)
    validateArray(stores, 'stores')

    return (async () => {   
        const [list, user] = await Promise.all([List.findById(listId), User.findById(userId)])

        if (!list) throw new ExistenceError('list not found')

        if (!user) throw new ExistenceError('user not found')

        if (!(list.guests.some(tmpId => tmpId.toString() === userId))) throw new InvalidDataError('invalid user')

        const product = list.products.find(product => product.id === producId)
        
        product.price = price
        product.date = new Date(Date.now())
        product.state = 'bought'
        product.stores = stores
        product.view = list.guests.filter(tmpUser => tmpUser._id.toString() !== userId)
        
        await list.save()
    })()
}
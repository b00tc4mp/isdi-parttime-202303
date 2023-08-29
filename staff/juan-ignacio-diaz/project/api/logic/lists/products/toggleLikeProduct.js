const { 
    validators: { validateId },
    errors: { ExistenceError, InvalidDataError }
} = require('com')

const { User, List } = require('../../../data/models')

/**
 * toggle like product by listId, userId, producId
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

        const tmpList = await List.findById({ "_id": listId, "products._id": producId })

        const tmpProduct = tmpList.products[0]
        
        const likes = tmpProduct.likes

        const index = likes.map(like => like.toString()).indexOf(userId)
    
        if (index < 0)
            likes.push(user._id) 
        else
            likes.splice(index, 1)
                             
        tmpProduct.view = list.guests 
 
        await List.findByIdAndUpdate({ "_id": listId, "products._id": producId }, { $set: { products: tmpProduct } })  
    })()
}
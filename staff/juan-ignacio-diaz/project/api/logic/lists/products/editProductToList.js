const { 
    validators: { validateId, validateName, validateNumber, validateArray, validateText },
    errors: { ExistenceError, InvalidDataError, UnknownError }
} = require('com')

const { User, List } = require('../../../data/models')

const mongodb = require('mongodb')

const { ObjectId } = mongodb

/**
 * update product to list by listId, userId, producId, name, howMany, stores, type, comment
 * 
 * @param {string} listId  The Id of the list.
 * @param {string} userId  The Id of the user.
 * @param {string} producId  The Id of the product.
 * @param {string} name The text to name.
 * @param {number} howMany The number to howMany.
 * @param {Object stores} stores The array to store
 * @param {string} type The text to type
 * @param {string} comment The text to comment
 *
 * @throws {ExistenceError} On existing userId, listId and listId
 * @throws {InvalidDataError} On invalid store or type
 * @throws {DuplicityError} On existing store
 * @throws {UnKnowError} On unknown error
 */
module.exports = (listId, userId, producId, name, howMany, stores, type, comment) => {
    validateId(listId, 'list id')
    validateId(userId, 'user id')
    validateId(producId, 'product id')
    validateName(name, 'name')
    validateNumber(howMany, 'howMany', 1)
    if (comment !== '') validateText(comment)
    validateArray(stores, 'stores')


    return (async () => {   
        const [list, user] = await Promise.all([List.findById(listId), User.findById(userId)])

        if (!list) throw new ExistenceError('list not found')

        if (!user) throw new ExistenceError('user not found')

        if (!(list.guests.some(tmpId => tmpId.toString() === userId))) throw new InvalidDataError('invalid user')

        stores.forEach(store => {
            if (!(list.stores.some(tmpId => tmpId.id === store))) throw new InvalidDataError('invalid store')
        });

        try {
            await List.findByIdAndUpdate({ "_id": listId, "products._id": producId }, 
                { $set: { products: { name: name, 
                        howMany: howMany, 
                        stores: stores.map(store => new ObjectId(store)), 
                        type: type, 
                        comment: comment, 
                        view: list.guests 
                } } }) 
        }
        catch (error) {
            if(error.message.includes('E11000'))
                throw new InvalidDataError(`${type} invalid type`)

            throw new UnknownError(error.message) 
        }     
        
    })()
}
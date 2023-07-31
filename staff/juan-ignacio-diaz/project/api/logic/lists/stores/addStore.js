const { 
    validators: { validateId, validateName },
    errors: { ExistenceError, DuplicityError, UnKnowError }
} = require('com')

const { User, List } = require('../../../data/models')

/**
 * add store to list by listId, userId and name
 * 
 * @param {string} listId  The Id of the list.
 * @param {string} userId  The Id of the user add comment.
 * @param {string} name The text to name.
 *
 * @throws {ExistenceError} On existing userId and listId
 * @throws {DuplicityError} On existing store
 * @throws {UnKnowError} On unknown error
 */
module.exports = (listId, userId, name) => {
    validateId(listId, 'list id')
    validateId(userId, 'user id')
    validateName(name, 'name')

    return (async () => {   
        const [list, user] = await Promise.all([List.findById(listId), User.findById(userId)])

        if (!list) throw new ExistenceError('list not found')

        if (!user) throw new ExistenceError('user not found')

        if (!(list.guests.some(tmpId => tmpId.toString() === userId))) throw new ExistenceError('invalid user')

        const store  = {
            name
        }

        try {
            await List.findByIdAndUpdate(listId, { $push: { stores: [store] } }) 
        }
        catch (error) {
            if(error.message.includes('E11000'))
                throw new DuplicityError(`store with name ${name} already exists`)

            throw new UnKnowError(error.message) 
        }            
    })()
}
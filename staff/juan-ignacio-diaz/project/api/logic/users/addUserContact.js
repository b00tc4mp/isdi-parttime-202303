const { 
    validators: { validateId },
    errors: { ExistenceError, DuplicityError }  
} = require('com')

const { User } = require('../../data/models')

/**
 * Add a user's contact by userId
 * 
 * @param {oid} userId The user's userId
 * @param {oid} userId The user's contactId
 * 
 * @throws {ExistenceError} On existing userId
 * @throws {DuplicityError} On invalid password
 */
module.exports = (userId, contactId) => {
    validateId(userId, 'user id')
    validateId(contactId, 'user id')

    return (async () => {   
        const [user, contact] = await Promise.all([User.findById(userId), User.findById(contactId)])

        if (!user) throw new ExistenceError('user not found')

        if (!contact) throw new ExistenceError('contact not found')

        if (user.contacts.some(contact => contact.toString() === contactId)) throw new DuplicityError('the contact already exists')

        await User.findByIdAndUpdate(userId, { $push: { contacts: [contactId] } }) 
    })()
}
const { 
    validators: { validateId },
    errors: { ExistenceError } 
} = require('com')

const { User } = require('../../data/models')

/**
 * Retrieve a user contacts by userId
 * 
 * @param {string} userId - The ID of the user to retrieve.
 * 
 * @returns {Promise<Contacts: name avatar email>} The user id
 * 
 * @throws {ExistenceError} On existing email
 */
module.exports = (userId) => {
    validateId(userId, 'user id')

    return (async () => {
        const user = await User.findById(userId, 'contacts')
            .populate('contacts', 'name avatar email').lean()
            
        if (!user) throw new ExistenceError('user not found')

        user.contacts.forEach(contact => {                        
            contact.id = contact._id.toString()
            delete contact._id
        })

        return user.contacts
    })()
}
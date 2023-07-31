const { 
    validators: { validateId, validateName, validateDate },
    errors: { ExistenceError, DuplicityError, UnknownError }
} = require('com')

const { User, List } = require('../../data/models')

/**
 * Create a list and add author in users by name, dateEnd 
 * 
 * @param {string} name The list's name
 * @param {date} dateEnd The list's date end

 * 
 * @throws {DuplicityError} On existing name list
 */
module.exports = (userId, name, dateToEnd) => {
    validateId(userId, 'user id')
    validateName(name)
    validateDate(dateToEnd)

    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new ExistenceError('user not found')

        try {
            const list = await List.create({ 
                name, 
                owner: user._id,
                guests: [], 
                dateToEnd,
                invited: []
            })
            await List.findByIdAndUpdate(list.id,  { $push: { guests: [userId] } }) 
        }
        catch (error) {
            if(error.message.includes('E11000'))
                throw new DuplicityError(`list with name ${name} already exists`)

            throw new UnknownError(error.message) 
        }
    })()

}
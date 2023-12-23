const { 
    validators: { validateId, validateName, validateDate },
    errors: { ExistenceError, DuplicityError, UnknownError }
} = require('com')

const { User, List } = require('../../data/models')

/**
 * Copy a list and add author in users by listId, name, dateEnd 
 * 
 * @param {string} listId  The Id of list.
 * @param {string} userId  The Id of the user
 * @param {string} name The list's name
 * @param {date} dateEnd The list's date end

 * 
 * @throws {DuplicityError} On existing name list
 */
module.exports = (listId, userId, name, dateToEnd) => {
    validateId(listId, 'list id')
    validateId(userId, 'user id')
    validateName(name)
    validateDate(dateToEnd)

    return (async () => {
        const [list, user] = await Promise.all([List.findById(listId), User.findById(userId)])

        if (!list) throw new ExistenceError('list not found')

        if (!user) throw new ExistenceError('user not found')

        const products = list.products

        products.forEach(product => {
            product.author = userId
            product.state = ''
            delete product.buyer
            delete product.price 
            delete product.date
        })

        try {
            await List.create({ 
                name, 
                owner: user._id,
                guests: [], 
                dateToEnd,
                invited: list.guests.filter(user => user._id.toString() !== userId),
                stores: list.stores,
                products: products,
                guests: [userId]
            })
        }
        catch (error) {
            if(error.message.includes('E11000'))
                throw new DuplicityError(`list with name ${name} already exists`)

            throw new UnknownError(error.message) 
        }
    })()

}
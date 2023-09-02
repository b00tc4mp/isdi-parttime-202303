const { 
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')

const { User, List } = require('../../../data/models')

/**
 * retriew product filtered 
 * 
 * @param {string} userId The Id of the user to list.
 * @param {string} listId The Id of the list.
 * @param {string} productId The Id of the Product.
 * 
 * @returns {Promise<Product>} The values
 * 
 * @throws {ExistenceError} On existing userId
 */
module.exports = (listId, userId, productId) => {
    validateId(userId, 'user id')
    validateId(listId, 'list id')
    validateId(productId, 'product id')

    return (async () => { 
        const [user, list] = await Promise.all([User.findById(userId), List.findById(listId)])

        if (!user) throw new ExistenceError('user not found')
        
        if (!list) throw new ExistenceError('list not found')

        if (!(list.guests.some(tmpId => tmpId.toString() === userId))) throw new InvalidDataError('invalid user')
       
        const tmpList = await List.findById(listId, 'products._id products.name products.date products.author products.howMany products.state products.type products.stores products.comment')
            .populate('products.author', 'name avatar')
            .populate('products.likes', 'name avatar').lean()
    
        const product = tmpList.products.find(product => product._id.toString() === productId)

        if (!product) throw new ExistenceError('product not found')  

        product.id = product._id.toString()
        delete product._id

        product.author.id = product.author._id.toString()
        delete product.author._id

        if (product.likes.length>0) {
            product.likes.forEach(like => {
                if (like._id) {
                    like.id = like._id.toString()
                    delete like._id
                }
            })
        } 

        if (product.view) {
            product.untried = product.view.some(user => user._id.toString() === userId)
            delete product.view
        }

        return product
    })()
}
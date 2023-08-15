const { 
    validators: { validateId, validateText, validateObject },
    errors: { ExistenceError }
} = require('com')

const { User, List, Product } = require('../../../data/models')

/**
 * retriew product filtered 
 * 
 * @param {string} userId The Id of the user to list.
 * @param {string} listId The Id of the list.
 * @param {string} filter The filter of the list.
 * @param {string} order The order of the list.
 * 
 * @returns {Promise<Product>} The values
 * 
 * @throws {ExistenceError} On existing userId
 */
module.exports = (listId, userId, filter, order) => {
    validateId(userId, 'user id')
    validateId(listId, 'list id')
    validateObject(filter, 'filter')
    if(order !== '') validateText(order, 'order')

    return (async () => { 
        const [user, list] = await Promise.all([User.findById(userId), List.findById(listId)])

        if (!user) throw new ExistenceError('user not found')
        
        if (!list) throw new ExistenceError('list not found')

        if (!(list.guests.some(tmpId => tmpId.toString() === userId))) throw new InvalidDataError('invalid user')
//listamos, filtramos yyy limpiamos
       
        const tmpList = await List.find(filter, 'products._id products.name products.howMany products.state products.type products.stores products.comment products.view')
            .populate('products.likes', 'name avatar').lean()

            const products = tmpList[0].products
            products.forEach(product => {                        
                product.id = product._id.toString()
                delete product._id

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
            })

 //desmarcamos vistos
        await List.updateMany(filter, { products: {$pullAll: {view: [userId]} } })

 //ordenamos y devolvemos

    if(order !== '') {
        const orderField = order

        products.sort((a,b) =>{
            if(a[orderField] > b[orderField]) return -1
            if(a[orderField] < b[orderField]) return 1
            return 0
        })
    }

    return products
    })()
}
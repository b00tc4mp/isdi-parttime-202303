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

        const tmpList = await List.find({_id: filter._id}, 'products._id products.name products.date products.howMany products.state products.type products.stores products.comment products.view, products.buyer, products.price')
            .populate('products.likes', 'name avatar').lean()
 
        if(tmpList.length>0) {           
            let products = tmpList[0].products
            if(products.length>0) {
                if (filter.storesCheck && filter.stores)
                    products = products.filter(product => product.stores.some(store => filter.stores.some(fstore => fstore === store.toString())))
                if (filter.typeCheck && filter.type)
                     products = products.filter(product => filter.type.some(ftype => ftype === product.type))
                if (filter.statesCheck && filter.states)
                     products = products.filter(product => filter.states.some(fstate => fstate === product.state))   
                if (filter.likesCheck && filter.likes)
                     products = products.filter(product => product.likes.length > filter.likes)                     

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

                    if(product.buyer && product.buyer.toString() === userId) {
                        delete product.buyer
                        product.buyer = true
                    }
                    else {
                        product.buyer = false
                    }
                    
                    if (product.view) {
                        product.untried = product.view.some(user => user._id.toString() === userId)
                        delete product.view
                    }
                })

                if(order !== '') {
                    const orderField = order

                    products.sort((a,b) =>{
                        if(a[orderField] > b[orderField]) return -1
                        if(a[orderField] < b[orderField]) return 1
                        return 0
                    })
                }
    
                const listView = await List.findById(listId, 'products')
                const productsView = listView.products
                productsView.forEach(product => {  
                    product.view = product.view.filter(tmpUser => tmpUser._id.toString() !== userId)
                })
                listView.save()

            }
            return products
        }
        return []
    })()
}
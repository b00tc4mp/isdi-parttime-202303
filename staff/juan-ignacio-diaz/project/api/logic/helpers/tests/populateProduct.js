const { List, Product } = require('../../../data/models')

const mongodb = require('mongodb')

const { ObjectId } = mongodb

module.exports = (listId, product) => {
    const tmpProduct = new Product({
        name: product.name,
        howMany: product.howMany,
        author: new ObjectId(product.author),
        stores: product.stores.map(store => new ObjectId(store)),
        type: product.type,
        comment: product.comment
    })

    product.id = tmpProduct._id.toString()

    return List.findByIdAndUpdate(listId , { $push: { products: [tmpProduct] } })
}
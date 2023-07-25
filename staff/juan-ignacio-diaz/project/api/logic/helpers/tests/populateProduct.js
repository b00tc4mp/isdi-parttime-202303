const { Post } = require('../../../data/models')

const mongodb = require('mongodb')

const { ObjectId } = mongodb

module.exports = (product) => {
    return Product.create({
        author: new ObjectId(product.author),
        image: product.image,
        text: product.text,
        date: product.date,
        dateLastModified: product.dateLastModified,
        likes: product.likes,
        lock: product.lock,
        price: product.price
    })
        .then(tmpProduct => {
            product.id = tmpProduct._id.toString()

            return product
        })
}
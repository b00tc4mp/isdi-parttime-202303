const { Product } = require('../../../data/models')

module.exports = (userId, stores, type, likes, view) => {
    return {
            name: `name-${Math.random()}`,
            howMany: parseInt(1+10*Math.random()),
            author: userId,
            type,
            stores,
            comment: `text-${Math.random()}`,
            likes,
            view
        }
}
const { List , Store} = require('../../../data/models')

const mongodb = require('mongodb')

const { ObjectId } = mongodb

module.exports = (listId, store) => {
    const tmpStore  = new Store({
        name: store.name
    })

    store.id = tmpStore._id.toString()

    return List.findByIdAndUpdate(listId , { $push: { stores: [tmpStore] } })
}
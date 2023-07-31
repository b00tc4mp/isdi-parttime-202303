const { List } = require('../../../data/models')

const mongodb = require('mongodb')

const { ObjectId } = mongodb

module.exports = (listId, store) => {
    return List.findByIdAndUpdate(listId , { $push: { stores: [store] } })
        .then(tmpStore => {
            store.id = tmpStore._id.toString()

            return store
        })
}
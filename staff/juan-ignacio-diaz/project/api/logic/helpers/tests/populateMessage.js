const { List } = require('../../../data/models')

const mongodb = require('mongodb')

const { ObjectId } = mongodb

module.exports = (listId, message) => {
    return List.findByIdAndUpdate(listId , { $push: { messages: [message] } })
        .then(tmpMessage => {
            message.id = tmpMessage._id.toString()
            message.date = tmpMessage.date

            return message
        })
}
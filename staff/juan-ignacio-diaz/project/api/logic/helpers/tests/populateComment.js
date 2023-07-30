const { List } = require('../../../data/models')

const mongodb = require('mongodb')

const { ObjectId } = mongodb

module.exports = (listId, comment) => {
    return List.findByIdAndUpdate(listId , { $push: { chat: [comment] } })
        .then(tmpList => {
            comment.date = tmpList.date

            return comment
        })
}
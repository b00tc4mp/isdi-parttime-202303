const { List } = require('../../../data/models')

const mongodb = require('mongodb')

const { ObjectId } = mongodb

module.exports = (list) => {
    return List.create({
        name: list.name,
        author: new ObjectId(list.author),
        users : list.users,
        dateToEnd: list.dateToEnd,
        notifyAcceptList: list.notifyAcceptList,
        notifyChatUpdate: list.notifyChatUpdate
    })
        .then(tmpList => {
            list.id = tmpList._id.toString()
            list.date = tmpList.date

            return list
        })
}
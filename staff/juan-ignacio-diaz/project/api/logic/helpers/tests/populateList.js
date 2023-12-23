const { List } = require('../../../data/models')

const mongodb = require('mongodb')

const { ObjectId } = mongodb

module.exports = (list) => {
    return List.create({
        name: list.name,
        owner: new ObjectId(list.owner),
        guests : list.guests,
        dateToEnd: list.dateToEnd,
        invited: list.invited,
        notifyChatUpdate: list.notifyChatUpdate
    })
        .then(tmpList => {
            list.id = tmpList._id.toString()
            list.date = tmpList.date

            return list
        })
}
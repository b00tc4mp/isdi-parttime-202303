const { Administrator, Update } = require('../../data/models')

module.exports = (adminId) => {
    return Update.find().lean()
        .then(updates => { return updates })
}
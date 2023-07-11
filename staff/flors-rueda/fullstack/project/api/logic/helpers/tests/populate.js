const context = require('../../context')

module.exports = (_levels) => {
    const { levels } = context

    const promises = []

    if (_levels.length)
        promises.push(levels.insertMany(_levels))

    return Promise.all(promises)
}
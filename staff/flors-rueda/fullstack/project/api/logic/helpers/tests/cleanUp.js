const context = require('../../context')

module.exports = () => {
    const { levels } = context

    return Promise.all([
        levels.deleteMany()
    ])
}
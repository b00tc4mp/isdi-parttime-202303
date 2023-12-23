const { Store } = require('../../../data/models')

module.exports = () => {
    return {
            name: `store-${Math.random()}`,
        }
}
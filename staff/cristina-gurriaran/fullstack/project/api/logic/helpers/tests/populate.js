const context = require('../../context')

module.exports = (_users, _workspots) => {
    const { users, workspots } = context

    const promises = []

    promises.push(users.insertMany(_users))

    if (_workspots.length)
        promises.push(workspots.insertMany(_workspots))

    return Promise.all(promises)
}


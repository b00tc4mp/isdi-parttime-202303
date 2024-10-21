const { writeFile } = require('fs')

module.exports = (users, posts, callback) =>
    writeFile(`${process.env.DB_PATH}/users.json`, JSON.stringify(users, null, 4), error => {
        if (error) {
            callback(error)

            return
        }

        writeFile(`${process.env.DB_PATH}/posts.json`, JSON.stringify(posts, null, 4), error => callback(error))
    })
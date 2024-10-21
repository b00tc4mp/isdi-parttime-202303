const { writeFile } = require('fs')

module.exports = callback => writeFile(`${process.env.DB_PATH}/users.json`, '[]', error => {
    if (error) {
        done(error)

        return
    }
    writeFile(`${process.env.DB_PATH}/users.json`, '[]', error => callback(error))
})
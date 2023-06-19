const { writeFile } = require('fs')

module.exports = (users, posts, callBack) => {
    writeFile(`${process.env.DB_PATH}/users.json`, JSON.stringify(users), error => {
        if(error) {
            callBack(error)

            return
        }

        writeFile(`${process.env.DB_PATH}/posts.json`, JSON.stringify(posts), error => callBack(error))
    })
}
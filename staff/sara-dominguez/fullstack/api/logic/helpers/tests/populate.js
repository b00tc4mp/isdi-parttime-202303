// const { writeFile } = require('fs')

const context = require('../../context')

module.exports = (_users, _posts) => {
    const { users, posts } = context

    const promises = []

    promises.push(users.insertMany(_users))

    if (_posts.length) {
        promises.push(posts.insertMany(_posts))
    }

    return Promise.all(promises)

}



//CON CALLBACKS
// module.exports = (users, posts, callback) =>
//     writeFile(`${process.env.DB_PATH}/users.json`, JSON.stringify(users), error => {
//         if (error) {
//             callback(error)

//             return
//         }

//         writeFile(`${process.env.DB_PATH}/posts.json`, JSON.stringify(posts), error => callback(error))
//     })
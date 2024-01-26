const context = require('../../context')

module.exports = () => {
    const { users, posts } = context

    return Promise.all([
        users.deleteMany(),
        posts.deleteMany()
    ])
}

//OTRA FORMA, UNA PROMESA DESPUES DE OTRA
//     users.deleteMany()
//         .then(() => posts.deleteMany())
// }



//CON CALLBACKS
// module.exports = callback =>
    // writeFile(`${process.env.DB_PATH}/users.json`, '[]', error => {
    //     if (error) {
    //         callback(error)

    //         return
    //     }

    //     writeFile(`${process.env.DB_PATH}/posts.json`, '[]', error => callback(error))
    // })
const { validators: { validateId } } = require('com')
const context = require('./context')
const { ObjectId } = require('mongodb')


module.exports = (userId) => {
    validateId(userId)

    const { users, posts } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error('user not found')

            return users.find().toArray()
                .then(users => {
                    return posts.find().toArray()
                        .then(posts => {
                            posts.forEach(post => {
                                post.likes = user.favs.includes(post._id.toString())

                                const _user = users.find(user => user._id.toString() === post.author.toString())

                                post.author = {
                                    id: _user._id.toString(),
                                    name: _user.name,
                                    avatar: _user.avatar
                                }
                            })
                            return posts
                        })

                })

        })


    // readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
    //     if (error) {
    //         callback(error)

    //         return
    //     }

    //     const users = JSON.parse(json)
    //     const user = users.find(user => user.id === userId)

    //     if (!user) {
    //         callback(new Error(`user with id ${userId} not found`))

    //         return
    //     }

    //     readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
    //         if (error) {
    //             callback(error)

    //             return
    //         }

    //         const posts = JSON.parse(json)
    //         posts.forEach(post => post.date = new Date(post.date))

    //         callback(null, posts.reverse())
    //     })
}

const { validators: { validateId } } = require('com')
const context = require('./context')
const { ObjectId } = require('mongodb')


module.exports = function retrievePosts(userId) {
    validateId(userId)

    const { users, posts } = context

    return Promise.all([users.find().toArray(), posts.find().toArray()])
        .then(([users, posts]) => {
            const user = users.find(user => user._id.toString() === userId)

            if (!user) throw new Error('user not found')


            posts.forEach(post => {
                post.id = post._id.toString()
                delete post._id

                const author = users.find(user => user._id.toString() === post.author.toString())

                const { _id, name, avatar } = author

                post.author = {
                    id: _id.toString(),
                    name,
                    avatar
                }

                // users.favs conviene guardarlo como objectId por lo que mejor utilizar some en lugar de includes(...toString(), que estariamos guardandolo como string)
                post.fav = user.favs.some(fav => fav.toString() === post.id)

                // no hace falta hacer una newDate porque Mongo ya te lo devuelve como date, no es un Json.
            })

            return posts

        })
}
    // const { users, posts } = context

    // return users.findOne({ _id: new ObjectId(userId) })
    //     .then(user => {
    //         if (!user) throw new Error('user not found')

    //         return users.find().toArray()
    //             .then(users => {
    //                 return posts.find().toArray()
    //                     .then(posts => {
    //                         posts.forEach(post => {
    //                             post.fav = user.favs.includes(post._id.toString())

    //                             const _user = users.find(user => user._id.toString() === post.author.toString())

    //                             post.author = {
    //                                 id: _user._id.toString(),
    //                                 delete post._id,
    //                                 name: _user.name,
    //                                 avatar: _user.avatar
    //                             }
    //                         })
    //                         return posts
    //                     })

    //             })

    //     })


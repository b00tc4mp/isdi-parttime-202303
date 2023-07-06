const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')
const { ObjectId } = require('mongodb')
const context = require('../context')


module.exports = function toggleFavPost(userId, postId) {
    validateId(userId, 'user id')

    const { users, posts } = context

    return Promise.all([
        users.findOne({ _id: new ObjectId(userId) }), 
        posts.findOne({ _id: new ObjectId(postId) })
        ])
        .then(([user, post]) => {
            if (!user) throw new ExistenceError(`User with id ${userId} not found`)

            if (!post) throw new ExistenceError(`Post with id ${postId} not found`)

            const index = user.favs.findIndex((id) => id.toString() === postId)

            if (index < 0) {
                return users.updateOne(
                    { _id: new ObjectId(userId) },
                    { $push: { favs: postId } }
                )

            } else {
                user.favs.splice(index, 1)
            }

            return Promise.all(
                [users.updateOne(
                    { _id: new ObjectId(userId) },
                    { $set: { favs: user.favs } }),
                posts.updateOne(
                    { _id: postId },
                    { $set: { favs: post.favs } })])
        })

        }




    // return users.findOne({ _id: new ObjectId(userId) })
    //     .then(user => {
    //         if (!user) throw new ExistenceError(`user with id ${userId} not found`)

    //         return posts.findOne({ _id: new ObjectId(postId) })
    //             .then(post => {
    //                 if (!post) throw new ExistenceError(`post with id ${postId} not found`)
    //                 const index = user.favs.findIndex((id) => id.toString() === postId)

    //                 if (index < 0)
    //                     user.favs.push(postId)
    //                 else {
    //                     user.favs.splice(index, 1)
    //                 }

    //                 return users.favs({ _id: new ObjectId(userId) }, { $set: { favs: user.favs } })
    //             })
    //     })



    // return Promise.all([users.findOne({ _id: new ObjectId(userId) }), posts.findOne({ _id: new ObjectId(postId) })])
    //     .then(([user, post]) => {
    //         if (!user) throw new ExistenceError(`User with id ${userId} not found`)

    //         if (!post) throw new ExistenceError(`Post with id ${postId} not found`)

    //         const index = user.favs.findIndex(id => id.toString() === postId)



    //         if (index < 0) {
    //             user.favs.push(postId)

    //         } else {
    //             user.favs.splice(index, 1)
    //         }

    //         return Promise.all(
    //             [users.updateOne(
    //                 { _id: new ObjectId(userId) }, 
    //                 { $set: { favs: user.favs } }), 
    //             posts.updateOne(
    //                 { _id: new ObjectId(postId) }, 
    //                 { $set: { favs: post.favs } })])
    //     })



// return posts.updateOne(
//     { _id: new ObjectId(postId) },
//     { $set: { favs: post.favs } }
// )
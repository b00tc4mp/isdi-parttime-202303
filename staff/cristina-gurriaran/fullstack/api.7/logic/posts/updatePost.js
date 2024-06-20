const { 
    validators: { validateId, validateUrl, validateText },
    errors: { ExistenceError, PermitError }
 } = require('com')
const { User, Post } = require('../../data/models')



module.exports = (userId, postId, image, location, title, text) => {
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateUrl(image, 'image url')
    validateText(text)

    return User.findById(userId).lean()
        .then(user => {
            if (!user) throw new ExistenceError(`User with id ${userId} not found`)

            return Post.findById(postId)
                .then( post => {
                    if (!post) throw new ExistenceError(`Post with id ${postId} not found`)


                    return Post.updateOne({ _id: postId }, { $set: { image: image, location: location, title: title, text: text }, })

                })                
        })
}


// return Promise.all([users.findOne({ _id: new ObjectId(userId) }), posts.findOne({ _id: new ObjectId(postId) })])
//     .then(([user, post]) => {
//         if (!user) throw new ExistenceError(`User with id ${userId} not found`)
//         if (!post) throw new ExistenceError(`Post with id ${postId} not found`)
//         if (userId !== post.author.toString()) throw new PermitError(`Post with id ${postId} does not belong to user with id ${userId} `)

//     })
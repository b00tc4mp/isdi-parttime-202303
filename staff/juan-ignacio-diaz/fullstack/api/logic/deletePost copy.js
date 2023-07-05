const { 
    validators: { validateId },
    errors: { ExistenceError, AuthError }  
} = require('com')

const { ObjectId } = require('mongodb')
const context = require('./context')

module.exports = (userId, postId) => {
    validateId(userId, 'user id')
    validateId(postId, 'post id')

    const { users , posts } = context

    const promises = []

    promises.push(users.findOne({ _id: new ObjectId(userId) }))
    promises.push(posts.findOne({ _id: new ObjectId(postId) }))

    return Promise.all(promises)
        .then(([user, post]) => {
            if (!user) throw new ExistenceError('user not found')

            if (!post) throw new ExistenceError('user not found')

            if (user._id.toString() !== post.author)
                throw new AuthError(`Post doesn't belong to this user`)

            const promisesUpdate = []

            promisesUpdate.push(posts.deleteOne({ _id: new ObjectId(postId)}))              
            promisesUpdate.push(users.find({favs: postId}))
           
            return Promise.all(promisesUpdate)
                .then(([_ , tmpUsers]) => {
                    tmpUsers.forEach(user => {                        
                        const favs = user.favs
                        favs.splice(favs.findIndex(fav => fav === postId), 1)

                        return users.updateOne({ _id: new ObjectId(user._id) }, { $set: { favs: favs }})
                    })
                })

                // return User.find({ saves: postId }).then((users) => {
                //     const usersUpdated = users.map((user) => {
                //       const index = user.saves.findIndex(
                //         (save) => save.toString() === postId
                //       )
            
                //       if (index > -1) user.saves.splice(index, 1)
            
                //       return user.save()
                //     })
            
                //     return Promise.all([...usersUpdated, Post.deleteOne({ _id: postId })])
                //   })



        })  
        .then(() => {})      
}

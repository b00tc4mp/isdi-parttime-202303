const context = require('./context')
const { ObjectId } = require('mongodb')
//preguntar si el manejo del error de que el precio actual y el nuevo no sean iguales lo tiene que hacer 
module.exports = function sellPost(userId, postId, newPrice) {

    const { users, posts } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error(`User with id ${userId} not found`)

            return posts.updateOne({ _id: new ObjectId(postId)}, {$set: {price: newPrice}})
        })
}
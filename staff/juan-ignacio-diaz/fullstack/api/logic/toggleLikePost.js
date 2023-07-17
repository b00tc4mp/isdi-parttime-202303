const { 
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')

const { User, Post } = require('../data/models')

module.exports = (userId, postId) => {
    validateId(userId, 'user id')
    validateId(postId, 'post id')

    return Promise.all([User.findById(userId), Post.findById(postId)])
        .then(([user, post]) => {
            if (!user) throw new ExistenceError('user not found')

            if (!post) throw new ExistenceError('post not found')

            const likes = post.likes

            const index = likes.map(like => like.toString()).indexOf(userId)
        
            if (index < 0)
                likes.push(user._id) 
            else
                likes.splice(index, 1)
                              
            return Post.findByIdAndUpdate(postId, { $set: { likes: likes }})  
       })
       .then(() => { }) 
}
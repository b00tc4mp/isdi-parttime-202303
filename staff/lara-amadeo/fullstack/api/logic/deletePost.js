const { User, Post } = require('../data/models')
const { errors: { ExistanceError } } = require('com')

module.exports = function deletePost(userId, postId) {
    return User.findOne({ _id: userId })
        .then(user => {
            if (!user) throw new ExistanceError(`User with id ${userId} not found`)
            return User.find({ savedPosts: postId })
        })
        .then(users => {
            const usersUpdated = users.map(user => {
                const indexSaves = user.savedPosts.findIndex(elem => elem.toString() === postId)
                const indexLikes = user.likedPosts.findIndex(elem => elem.toString() === postId)

                if (indexSaves > -1) { user.savedPosts.splice(indexSaves, 1) }
                if (indexLikes > -1) { user.likedPosts.splice(indexLikes, 1) }

                user.save()
            })

            return Promise.all([...usersUpdated, Post.deleteOne({ _id: postId })])
        })
        .then(() => { })
}

// const usersUpdated = users.map(user => {
//     const indexSaves = user.savedPosts.findIndex(elem => elem.toString() === postId)
//     const indexLikes = user.likedPosts.findIndex(elem => elem.toString() === postId)

//     if (indexSaves > -1) { user.savedPosts.splice(indexSaves, 1) }
//     if (indexLikes > -1) { user.likedPosts.splice(indexLikes, 1) }

//     user.save()
// })
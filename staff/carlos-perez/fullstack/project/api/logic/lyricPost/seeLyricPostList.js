const { Administrator, LyricPost } = require('../../data/models')

module.exports = (adminId) => {

    return LyricPost.find().lean()
        .then(lyricPosts => { return lyricPosts })
}
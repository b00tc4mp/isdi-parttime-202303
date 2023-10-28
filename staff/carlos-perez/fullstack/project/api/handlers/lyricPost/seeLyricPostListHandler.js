const { seeLyricPostList } = require('../../logic')
const { extractUserId } = require('../helpers')
const { handleErrors } = require('../helpers')

module.exports = handleErrors((req, res) => {
    const adminId = extractUserId(req)

    return seeLyricPostList(adminId)
        .then(lyricPosts => res.json(lyricPosts))
})
const { seeLyricPost } = require('../../logic')
const { extractUserId } = require('../helpers')
const { handleErrors } = require('../helpers')

module.exports = handleErrors((req, res) => {
    const adminId = extractUserId(req)
    const { lyricPostId } = req.params

    return seeLyricPost(adminId, lyricPostId)
        .then(lyricPost => res.json(lyricPost))
})
const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')
const { Administrator, LyricPost } = require('../../data/models')

module.exports = function (adminId, lyricPostId) {

    validateId(adminId, 'Administrator ID')
    validateId(lyricPostId, 'lyricPost ID')


    return Administrator.findById(adminId).then((admin) => {

        if (!admin) throw new ExistenceError('Administrator not found!')

        return LyricPost.findById(lyricPostId).then((lyricPost) => {
            if (!lyricPost) throw new ExistenceError('lyricPost not found')

            return lyricPost.deleteOne({ _id: lyricPostId })

        })
    })

}
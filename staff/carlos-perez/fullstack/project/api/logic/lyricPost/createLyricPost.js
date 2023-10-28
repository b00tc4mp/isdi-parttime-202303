const { validators: { validateId, validateText, validateUrl }, errors: { ExistenceError } } = require('com')
const { Administrator, LyricPost } = require('../../data/models')

module.exports = (adminId, title, media, text, songInfo, visibility) => {
    validateId(adminId, 'admin id')
    validateText(title, 'title')
    validateUrl(media, 'media')
    validateText(text, 'text')
    validateText(songInfo, 'Song Information')

    return Administrator.findById(adminId)
        .then(admin => {
            if (!admin) throw new ExistenceError(`Admin does not exist`)

            LyricPost.create({author: adminId, title: title, media: media, text: text, songInfo: songInfo, visibility: visibility })
        })
        .then(() => { })
}
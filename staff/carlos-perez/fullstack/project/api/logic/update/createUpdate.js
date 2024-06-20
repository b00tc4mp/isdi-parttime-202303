const { validators: { validateId, validateUrl, validateText }, errors: { ExistenceError } } = require('com')
const { Administrator, Update } = require('../../data/models')

module.exports = (adminId, title, image, text, rsstext, visibility) => {
    validateId(adminId, 'admin id')
    validateText(title, 'title')
    validateUrl(image, 'image url')
    validateText(text, 'text')
    validateText(rsstext, 'rss text')
    //validate visibility

    return Administrator.findById(adminId)
        .then(admin => {
            if (!admin) throw new ExistenceError(`Admin does not exist`)
            Update.create({author: adminId, title: title, image: image, text: text, rsstext: rsstext, visibility })
        })
        .then(() => { })
}
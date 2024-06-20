const {
    validators: { validateId, validateText, validateUrl },
    errors: { ExistenceError }
} = require('com')
const { Administrator, Update } = require('../../data/models')

module.exports = function modifyUpdate(adminId, updateId, title, image, text, rsstext, visibility) {
    validateId(adminId, 'admin id')
    validateText(title, 'title')
    validateUrl(image, 'image url')
    validateText(text, 'text')
    validateText(rsstext, 'rss text')
    validateId(updateId, 'update id')
    //validate visibility

    return Administrator.findById(adminId)
        .then(admin => {
            if (!admin) throw new ExistenceError(`Admin does not exist`)
            return Update.findById(updateId)
                .then(update => {
                    if (!update) throw new ExistenceError(`This update does not exist`)
                    update.title = title;
                    update.image = image;
                    update.text = text;
                    update.rsstext = rsstext;
                    update.visibility = visibility;
                    return update.save()
                })
        })
        .then(() => { })
}
const {
    validators: { validateId, validateText, validateUrl },
    errors: { ExistenceError }
} = require('com')
const { Administrator, LyricPost } = require('../../data/models')

module.exports = function modifyLyricPost(adminId, lyricPostId, title, media, text, songInfo, visibility) {
    validateId(adminId, 'admin id')
    validateText(title, 'title')
    validateUrl(media, 'media')
    validateText(text, 'text')
    validateText(songInfo, 'song information')
    validateId(lyricPostId, 'lyric post id')
    //validate visibility

    return Administrator.findById(adminId)
        .then(admin => {
            if (!admin) throw new ExistenceError(`Admin does not exist`)
            return LyricPost.findById(lyricPostId)
                .then(lyricPost => {
                    if (!lyricPost) throw new ExistenceError(`This lyricPost does not exist`)
                    lyricPost.title = title;
                    lyricPost.media = media;
                    lyricPost.text = text;
                    lyricPost.songInfo=songInfo;
                    lyricPost.visibility = visibility;
                    return lyricPost.save()
                })
        })
        .then(() => { })
}
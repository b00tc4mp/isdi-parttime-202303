const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')
const { Administrator, LyricPost } = require('../../data/models')

module.exports = function toggleLyricPostVisibility(adminId, lyricPostId) {
    validateId(adminId, 'admin id')
    validateId(lyricPostId, 'lyric Post id')

    return Administrator.findById(adminId)
        .then(admin => {
            if (!admin) throw new ExistenceError(`Admin does not exist`)
            return LyricPost.findById(lyricPostId)
                .then(lyricPost => {
                    if (!lyricPost) throw new ExistenceError(`This Lyric Post does not exist`)
                    if(lyricPost.visibility===true){
                        lyricPost.visibility=false;
                    }
                    else{
                        lyricPost.visibility=true;
                    }
                    return lyricPost.save()
                })
        })
        .then(() => { })
    }
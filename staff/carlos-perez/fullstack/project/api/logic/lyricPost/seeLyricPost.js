const { validators: { validateId }, errors: { AuthError} } = require('com')
const { Administrator, LyricPost } = require('../../data/models')

module.exports = (adminId, lyricPostId) => {
    //validateId(adminId, 'administrator id')
    validateId(lyricPostId, 'lyricPost id')

    return Administrator.findById(adminId)
    .then(admin => {
        return LyricPost.findById(lyricPostId)
            .then(lyricPost => {
                if (!admin){
                    if(lyricPost.visibility===true){
                        return lyricPost
                    }
                    else{
                        throw new AuthError('You are not an administrator or this lyricPost is not visible right now')
                    }
                }

                else{
                    return lyricPost
                }
                })
    })
}
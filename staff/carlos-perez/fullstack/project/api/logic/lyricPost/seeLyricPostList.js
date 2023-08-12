const { Administrator, LyricPost } = require('../../data/models')

module.exports = (adminId) => {

    return Administrator.findById(adminId)
    .then(admin => {

        if(!admin){
            return LyricPost.find({"visibility": true}).lean()
            .then(lyricPosts =>{ return lyricPosts})
        }
        else{
            return LyricPost.find().lean()
            .then(lyricPosts => { return lyricPosts})
        }
        
    })
}
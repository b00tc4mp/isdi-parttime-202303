const { extractUserId } = require('../helpers')
const {  toggleSavePost } = require('../logic')

module.exports = (req, res) => {
    try{
        const { postId } = req.params
        const userId = extractUserId(req)

        toggleSavePost(userId, postId, error => {
            if(error){
                res.status(400).json({ error: error.message })
            }

            res.status(201).send()
        })
    } catch(error){
        res.status(400).json({ error: error.message })
    }
}
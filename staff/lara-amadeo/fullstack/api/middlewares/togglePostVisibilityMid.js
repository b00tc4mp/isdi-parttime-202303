const { extractUserId } = require('../helpers')
const {  togglePostVisibility } = require('../logic')

module.exports = (req, res) => {
    try{
        const { postId } = req.params
        const userId = extractUserId(req)

        togglePostVisibility(userId, postId, error => {
            if(error){
                res.status(400).json({ error: error.message })
    
                return
            }

            res.status(201).send()
        })
    } catch(error){
        res.status(400).json({ error: error.message })
    }
}
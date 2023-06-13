const { extractUserId } = require('../helpers')
const {  createPost } = require('../logic')

module.exports = (req, res) => {
    
    try {
            const userId = extractUserId(req)

            const { image, text } = req.body

            createPost(userId, image, text, error => {
                if(error){
                    res.status(400).json({error: error.message})
                    return
                }

                res.status(201).send()
            })
        } catch(error){
            res.status(400).json({ error: error.message })
        }
    }
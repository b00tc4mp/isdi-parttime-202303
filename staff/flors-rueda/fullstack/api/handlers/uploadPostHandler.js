const { uploadPost } = require('../logic')
const { extractUserId } = require('../helpers')

module.exports = (req, res) => {
    try {
        const userAuth = extractUserId(req);

        const { postImg, postText } = req.body;

        uploadPost(postImg, postText, userAuth, error => {
            if (error) {
                res.status(400).json({ error: error.message });
                return;
            }

            res.status(201).send();
        })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
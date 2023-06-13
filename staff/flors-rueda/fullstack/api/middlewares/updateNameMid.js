const { extractUserId } = require('../helpers');
const { updateName } = require('../logic');

module.exports = (req, res) => {
    try {
        const { name } = req.body;
        const userAuth = extractUserId(req);

        updateName(name, userAuth, error => {
            if (error) {
                res.status(400).json({ error: error.message });
                return;
            }

            res.status(204).send();
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
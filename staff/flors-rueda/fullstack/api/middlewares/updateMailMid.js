const { extractUserId } = require('../helpers');
const { updateMail } = require('../logic');

module.exports = (req, res) => {
    try {
        const { mail } = req.body;
        const userAuth = extractUserId(req);

        updateMail(mail, userAuth, error => {
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
const { extractUserId } = require('../helpers');
const { updateMail } = require('../logic');

module.exports = (req, res) => {
    try {
        const { mail } = req.body;
        const userAuth = extractUserId(req);

        updateMail(mail, userAuth)
            .then(() => res.status(201).send())
            .catch((error) => res.status(400).json({ error: error.message }));

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
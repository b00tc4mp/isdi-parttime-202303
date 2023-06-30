const { createLevel } = require('../logic')

module.exports = (req, res) => {
    try {
        const { name, layout, id } = req.body

        createLevel(name, layout, id)
            .then(() => res.status(201).send())
            .catch(error => res.status(400).json({ error: error.message }))

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
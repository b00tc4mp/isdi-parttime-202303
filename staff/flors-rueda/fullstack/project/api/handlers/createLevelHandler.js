const { createLevel } = require('../logic')

module.exports = (req, res) => {
    try {
        const { name, layout, hp } = req.body

        createLevel(name, layout, hp)
            .then(() => res.status(201).send())
            .catch(error => res.status(400).json({ error: error.message }))

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
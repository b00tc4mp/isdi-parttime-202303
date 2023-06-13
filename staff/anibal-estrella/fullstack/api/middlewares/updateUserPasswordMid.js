const { updateUserPassword } = require('../logic')

module.exports = (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {
        try {
            const { userId, password, previousPassword, newPassword, newPasswordConfirm } = JSON.parse(json)

            updateUserPassword(userId, password, previousPassword, newPassword, newPasswordConfirm, error => {
                if (error) {
                    res.status(400).json({ error: error.message })

                    return
                }
                res.status(204).send()
            })

        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    })

}
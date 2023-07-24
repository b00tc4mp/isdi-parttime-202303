//TODO handleErrors
const { updateEmployeeAvatar } = require('../logic')
const { extractEmployeeId } = require('./helpers')

module.exports = (req, res,) => {
    const employeeId = extractEmployeeId(req)

    const { avatar } = req.body

    return updateEmployeeAvatar(employeeId, avatar)
        .then(() => res.status(204).send())
}
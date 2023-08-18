//TODO handleErrors
const { updateEmployeeAvatar } = require('../logic')
const { extractEmployeeId } = require('./helpers')
const { handleErrors } = require('./helpers')


module.exports = handleErrors((req, res) => {
    // const employeeId = extractEmployeeId(req)

    // const { avatar } = req.body

    // return updateEmployeeAvatar(employeeId, avatar)
    //     .then(() => res.status(204).send())



    const employeeId = extractEmployeeId(req)

    const { avatar } = req.body

    const promise = updateEmployeeAvatar(employeeId, avatar)

    return (async () => {
        await promise

        res.status(204).send()
    })()
})
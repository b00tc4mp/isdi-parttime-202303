//TODO handleErrors
const { updateEmployeeAddress } = require('../logic')
const { extractEmployeeId } = require('./helpers')
const { handleErrors } = require('./helpers')


module.exports = handleErrors((req, res,) => {
    const employeeId = extractEmployeeId(req)

    const { employeeStreet, employeePostalCode, employeeCity, employeeCountry } = req.body

    const promise = updateEmployeeAddress(employeeId, employeeStreet, employeePostalCode, employeeCity, employeeCountry)

    return (async () => {
        await promise

            .then(() => res.status(204).send())
    })()
})
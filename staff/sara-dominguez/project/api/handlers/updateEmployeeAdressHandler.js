//TODO handleErrors
const { updateEmployeeAdress } = require('../logic')
const { extractEmployeeId } = require('./helpers')
const { handleErrors } = require('./helpers')


module.exports = handleErrors((req, res,) => {
    const employeeId = extractEmployeeId(req)

    const { employeeStreet, employeePostalCode, employeeCity, employeeCountry } = req.body

    const promise = updateEmployeeAdress(employeeId, employeeStreet, employeePostalCode, employeeCity, employeeCountry)

    return (async () => {
        await promise

            .then(() => res.status(204).send())
    })
})
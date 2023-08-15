//TODO handleErrors
const { updateEmployeeAdress } = require('../logic')
const { extractEmployeeId } = require('./helpers')

module.exports = (req, res,) => {
    const employeeId = extractEmployeeId(req)

    const { employeeStreet, employeePostalCode, employeeCity, employeeCountry } = req.body

    return updateEmployeeAdress(employeeId, employeeStreet, employeePostalCode, employeeCity, employeeCountry)
        .then(() => res.status(204).send())
}
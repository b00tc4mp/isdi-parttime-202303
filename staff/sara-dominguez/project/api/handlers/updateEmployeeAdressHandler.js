//TODO handleErrors
const { updateEmployeeAdress } = require('../logic')
const { extractEmployeeId } = require('./helpers')

module.exports = (req, res,) => {
    const employeeId = extractEmployeeId(req)

    const { employeeNewAdress } = req.body

    // const employeeNewAdress = `${employeeStreet}` + ' ' + `${employeePostalCode}` + ' ' + `${employeeCity}` + ' ' + `${employeeCountry}`

    return updateEmployeeAdress(employeeId, employeeNewAdress)
        .then(() => res.status(204).send())
}
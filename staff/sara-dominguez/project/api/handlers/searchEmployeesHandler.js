const { searchEmployees } = require('../logic')
const { extractEmployeeId } = require('./helpers')
const { handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const employeeLoggedId = extractEmployeeId(req)

    const { name, firstSurname, secondSurname } = req.params

    const promise = searchEmployees(employeeLoggedId, name, firstSurname, secondSurname)
    return (async () => {
        await promise

            .then(employees => res.json(employees))
    })()
})
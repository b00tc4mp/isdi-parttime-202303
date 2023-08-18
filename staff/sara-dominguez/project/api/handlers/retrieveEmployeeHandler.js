const { retrieveEmployee } = require('../logic')
const { extractEmployeeId } = require('./helpers')
const { handleErrors } = require('./helpers')


// module.exports = (req, res) => {
//     const employeeId = extractEmployeeId(req)

//     return retrieveEmployee(employeeId)
//         .then(employee => res.json(employee))
// }


module.exports = handleErrors((req, res) => {
    const employeeId = extractEmployeeId(req)

    const promise = retrieveEmployee(employeeId)

    return (async () => {
        await promise

            .then(employee => res.json(employee))
    })()
})
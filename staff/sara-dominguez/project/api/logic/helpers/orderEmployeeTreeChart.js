module.exports = function orderEmployeeThreeChart(employeeArray) {
    const jobPositionOrder = {
        "CEO": 1,
        "CFO": 2,
        "CTO": 3,
        "Executive": 4,
        "Manager": 5,
        "Developer": 6,

    }

    const employeesSorted = employeeArray.sort((a, b) => {
        // Comparar por rol
        for (let i = 0; i < (employeeArray).length; i++) {
            const positionA = jobPositionOrder[a._doc.jobPosition];
            const positionB = jobPositionOrder[b._doc.jobPosition];

            return positionA - positionB;

        }
    })
    return employeesSorted
}



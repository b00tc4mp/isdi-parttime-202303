/**
 * Check the salary scale for a given salary level and return the corresponding details.
 *
 * @param {number} salaryLevel - The salary level for which to check the scale.
 * @returns {Object} - An object containing the salary scale details.
 */

module.exports = function checkSalaryScale(salaryLevel) {
    if (salaryLevel === 1) {
        salaryScale = {
            salaryLevel: 1,
            monthSalary: 10000,
            annualSalary: 120000,
            bonus: 1200
        }
    }
    else if (salaryLevel === 2) {
        salaryScale = {
            salaryLevel: 2,
            monthSalary: 7500,
            annualSalary: 90000,
            bonus: 1500
        }
    }
    else if (salaryLevel === 3) {
        salaryScale = {
            salaryLevel: 3,
            monthSalary: 5500,
            annualSalary: 72000,
            bonus: 1000
        }
    }
    else if (salaryLevel === 4) {
        salaryScale = {
            salaryLevel: 4,
            monthSalary: 4000,
            annualSalary: 48000,
            bonus: 500
        }
    }
    else if (salaryLevel === 5) {
        salaryScale = {
            salaryLevel: 5,
            monthSalary: 2400,
            annualSalary: 28800,
            bonus: 100
        }
    }
    return salaryScale
}




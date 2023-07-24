
module.exports = function checkSalaryScale(salaryLevel) {
    // let salaryScale

    if (salaryLevel === 1) {
        salaryScale = {
            salaryLevel: 1,
            monthSalary: 10000,
            annualSalary: 120000,
            bonus: 18000
        }
    }
    else if (salaryLevel === 2) {
        salaryScale = {
            salaryLevel: 2,
            monthSalary: 7500,
            annualSalary: 90000,
            bonus: 12500
        }
    }
    else if (salaryLevel === 3) {
        salaryScale = {
            salaryLevel: 3,
            monthSalary: 6000,
            annualSalary: 72000,
            bonus: 8500
        }
    }
    else if (salaryLevel === 4) {
        salaryScale = {
            salaryLevel: 4,
            monthSalary: 4500,
            annualSalary: 54000,
            bonus: 5500
        }
    }
    else if (salaryLevel === 5) {
        salaryScale = {
            salaryLevel: 5,
            monthSalary: 2800,
            annualSalary: 33600,
            bonus: 3000
        }
    }
    return salaryScale
}




const { calculatePayroll, checkSalaryScale } = require('./helpers')

const { Employee, PayrollMonth } = require('../data/models')

//TODO validators and HandleError


module.exports = function createEmployeePayrollMonth(employeeId, payrollYear, payrollMonth) {
    //TODO validators 


    return Employee.findById(employeeId)

        .then(employee => {
            debugger
            if (!employee) throw new Error('employee not found')

            salaryLevel = employee.salaryLevel

            if (salaryLevel !== 1 && salaryLevel !== 2 && salaryLevel !== 3 && salaryLevel !== 4 && salaryLevel !== 5)
                throw new Error(`${salaryLevel} out of range`) //RangeError

            return salaryLevel
        })
        .then((salaryLevel) => checkSalaryScale(salaryLevel))
        .then((salaryScale) => {
            let monthSalary = salaryScale.monthSalary
            let annualSalary = salaryScale.annualSalary
            let bonus = salaryScale.bonus

            return calculatePayroll(salaryLevel, monthSalary, annualSalary, bonus)
        })
        .then((payrollMonthItems) => {
            let monthSalary = payrollMonthItems.monthSalary
            let bonus = payrollMonthItems.bonus
            let irpfTax = payrollMonthItems.irpfTax
            let ssTax = payrollMonthItems.ssTax
            let irpfDeductions = payrollMonthItems.irpfDeductions
            let ssDeductions = payrollMonthItems.ssDeductions
            let totalAmountIncomes = payrollMonthItems.totalAmountIncomes
            let totalAmountDeductions = payrollMonthItems.totalAmountDeductions
            let netSalary = payrollMonthItems.netSalary

            return PayrollMonth.create({
                employee: employeeId,
                payrollYear,
                payrollMonth,
                salaryLevel,
                monthSalary: monthSalary,
                bonus,
                irpfTax,
                ssTax,
                irpfDeductions,
                ssDeductions,
                totalAmountIncomes,
                totalAmountDeductions,
                netSalary
            })

        })

}




/**
 * Calculate payroll items based on salary level, month salary, annual salary, and bonus.
 *
 * @param {number} salaryLevel - The salary level of the employee.
 * @param {number} monthSalary - The monthly salary of the employee.
 * @param {number} annualSalary - The annual salary of the employee.
 * @param {number} bonus - The bonus amount of the employee.
 * @returns {Object} - An object containing calculated payroll items.
 */

module.exports = function calculePayroll(salaryLevel, monthSalary, annualSalary, bonus) {
    let calculatePayrollItems
    let totalAmountIncomes = monthSalary + bonus
    let ssTax = 5 / 100
    let irpfTax
    let ssDeductions = totalAmountIncomes * ssTax
    let annualAmountAverage = annualSalary + (bonus * 12)

    if (!bonus || bonus === 0) {
        totalAmountIncomes = monthSalary
        annualAmountAverage = monthSalary
        irpfTax = 0
        let irpfDeductions = totalAmountIncomes * irpfTax
        let totalTaxRatio = irpfTax + ssTax
        let totalAmountDeductions = totalAmountIncomes * totalTaxRatio
        let netSalary = totalAmountIncomes - totalAmountDeductions

        return calculatePayrollItems = {
            salaryLevel,
            monthSalary,
            bonus,
            irpfTax,
            ssTax,
            irpfDeductions,
            ssDeductions,
            totalAmountIncomes,
            totalAmountDeductions,
            netSalary
        }

    } else if (monthSalary === 0 && bonus) {
        totalAmountIncomes = bonus
        annualAmountAverage = bonus
        irpfTax = 0
        let irpfDeductions = totalAmountIncomes * irpfTax
        let totalTaxRatio = irpfTax + ssTax
        let totalAmountDeductions = totalAmountIncomes * totalTaxRatio
        let netSalary = totalAmountIncomes - totalAmountDeductions

        return calculatePayrollItems = {
            salaryLevel,
            monthSalary,
            bonus,
            irpfTax,
            ssTax,
            irpfDeductions,
            ssDeductions,
            totalAmountIncomes,
            totalAmountDeductions,
            netSalary
        }

    } else if (monthSalary === 0 && !bonus) {
        totalAmountIncomes = 0
        annualAmountAverage = 0
        irpfTax = 0
        let irpfDeductions = totalAmountIncomes * irpfTax
        let totalTaxRatio = irpfTax + ssTax
        let totalAmountDeductions = totalAmountIncomes * totalTaxRatio
        let netSalary = totalAmountIncomes - totalAmountDeductions

        return calculatePayrollItems = {
            salaryLevel,
            monthSalary,
            bonus,
            irpfTax,
            ssTax,
            irpfDeductions,
            ssDeductions,
            totalAmountIncomes,
            totalAmountDeductions,
            netSalary
        }

    } else if (annualAmountAverage === 0) {
        irpfTax = 0 / 100
        irpfDeductions = 0
        ssDeductions = 0
        totalAmountDeductions = 0
        netSalary = 0
        let irpfDeductions = totalAmountIncomes * irpfTax
        let totalTaxRatio = irpfTax + ssTax
        let totalAmountDeductions = totalAmountIncomes * totalTaxRatio
        let netSalary = totalAmountIncomes - totalAmountDeductions

        return calculatePayrollItems = {
            salaryLevel,
            monthSalary,
            bonus,
            irpfTax,
            ssTax,
            irpfDeductions,
            ssDeductions,
            totalAmountIncomes,
            totalAmountDeductions,
            netSalary
        }


    } else if ((annualAmountAverage) <= 12450) {
        irpfTax = 19 / 100
        let irpfDeductions = totalAmountIncomes * irpfTax
        let totalTaxRatio = irpfTax + ssTax
        let totalAmountDeductions = totalAmountIncomes * totalTaxRatio
        let netSalary = totalAmountIncomes - totalAmountDeductions

        return calculatePayrollItems = {
            salaryLevel,
            monthSalary,
            bonus,
            irpfTax,
            ssTax,
            irpfDeductions,
            ssDeductions,
            totalAmountIncomes,
            totalAmountDeductions,
            netSalary
        }

    } else if (annualAmountAverage <= 20199 && annualAmountAverage > 12450) {
        irpfTax = 24 / 100
        let irpfDeductions = totalAmountIncomes * irpfTax
        let totalTaxRatio = irpfTax + ssTax
        let totalAmountDeductions = totalAmountIncomes * totalTaxRatio
        let netSalary = totalAmountIncomes - totalAmountDeductions

        return calculatePayrollItems = {
            salaryLevel,
            monthSalary,
            bonus,
            irpfTax,
            ssTax,
            irpfDeductions,
            ssDeductions,
            totalAmountIncomes,
            totalAmountDeductions,
            netSalary
        }

    } else if (annualAmountAverage <= 35199 && annualAmountAverage > 20199) {
        irpfTax = 30 / 100
        let irpfDeductions = totalAmountIncomes * irpfTax
        let totalTaxRatio = irpfTax + ssTax
        let totalAmountDeductions = totalAmountIncomes * totalTaxRatio
        let netSalary = totalAmountIncomes - totalAmountDeductions

        return calculatePayrollItems = {
            salaryLevel,
            monthSalary,
            bonus,
            irpfTax,
            ssTax,
            irpfDeductions,
            ssDeductions,
            totalAmountIncomes,
            totalAmountDeductions,
            netSalary
        }

    } else if (annualAmountAverage <= 59999 && annualAmountAverage > 35199) {
        irpfTax = 37 / 100
        let irpfDeductions = totalAmountIncomes * irpfTax
        let totalTaxRatio = irpfTax + ssTax
        let totalAmountDeductions = totalAmountIncomes * totalTaxRatio
        let netSalary = totalAmountIncomes - totalAmountDeductions

        return calculatePayrollItems = {
            salaryLevel,
            monthSalary,
            bonus,
            irpfTax,
            ssTax,
            irpfDeductions,
            ssDeductions,
            totalAmountIncomes,
            totalAmountDeductions,
            netSalary
        }

    } else if (annualAmountAverage <= 299999 && annualAmountAverage > 59999) {
        irpfTax = 45 / 100
        let irpfDeductions = totalAmountIncomes * irpfTax
        let totalTaxRatio = irpfTax + ssTax
        let totalAmountDeductions = totalAmountIncomes * totalTaxRatio
        let netSalary = totalAmountIncomes - totalAmountDeductions

        return calculatePayrollItems = {
            salaryLevel,
            monthSalary,
            bonus,
            irpfTax,
            ssTax,
            irpfDeductions,
            ssDeductions,
            totalAmountIncomes,
            totalAmountDeductions,
            netSalary
        }

    } else if (annualAmountAverage > 299999) {
        irpfTax = 47 / 100
        let irpfDeductions = totalAmountIncomes * irpfTax
        let totalTaxRatio = irpfTax + ssTax
        let totalAmountDeductions = totalAmountIncomes * totalTaxRatio
        let netSalary = totalAmountIncomes - totalAmountDeductions

        return calculatePayrollItems = {
            salaryLevel,
            monthSalary,
            bonus,
            irpfTax,
            ssTax,
            irpfDeductions,
            ssDeductions,
            totalAmountIncomes,
            totalAmountDeductions,
            netSalary
        }
    }
    return calculatePayrollItems
}


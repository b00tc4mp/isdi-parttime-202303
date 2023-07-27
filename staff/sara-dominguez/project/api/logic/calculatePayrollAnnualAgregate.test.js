require('dotenv').config()

const mongoose = require('mongoose')
const calculatePayrollAnnualAgregate = require('./calculatePayrollAnnualAgregate')


const { Employee, PayrollMonth } = require('../data/models')

mongoose.connect(process.env.MONGODB_URL)

    // .then(() => Promise.all(Employee.deleteMany()))
    .then(() => calculatePayrollAnnualAgregate('64c1a5c87d6c77d86f00405a', 2023,
        [
            {

                payrollMonth: 'february',
                salaryLevel: 3,
                monthSalary: 6000,
                bonus: 8500,
                irpfTax: 0.45,
                ssTax: 0.05,
                irpfDeductions: 6525,
                ssDeductions: 725,
                totalAmountIncomes: 14500,
                totalAmountDeductions: 7250,
                netSalary: 7250,

            },
            {

                payrollMonth: 'january',
                salaryLevel: 3,
                monthSalary: 6000,
                bonus: 8500,
                irpfTax: 0.45,
                ssTax: 0.05,
                irpfDeductions: 6525,
                ssDeductions: 725,
                totalAmountIncomes: 14500,
                totalAmountDeductions: 7250,
                netSalary: 7250,

            },
            {

                payrollMonth: 'march',
                salaryLevel: 3,
                monthSalary: 6000,
                bonus: 8500,
                irpfTax: 0.45,
                ssTax: 0.05,
                irpfDeductions: 6525,
                ssDeductions: 725,
                totalAmountIncomes: 14500,
                totalAmountDeductions: 7250,
                netSalary: 7250,

            }
        ]

    ))
    .then((result) => console.log(result))
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())


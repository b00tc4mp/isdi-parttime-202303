require('dotenv').config()

const mongoose = require('mongoose')
const retrievePayrollAnnualAgregate = require('./retrievePayrollAnnualAgregate')


const { Employee, PayrollMonth } = require('../data/models')

mongoose.connect(process.env.MONGODB_URL)

    // .then(() => Promise.all(Employee.deleteMany()))
    .then(() => retrievePayrollAnnualAgregate('64c40e0ffa6c1fd4636d0021', 2023,
        [
            {
                payrollMonth: 'January',
                salaryLevel: 2,
                monthSalary: 7500,
                bonus: 12500,
                irpfTax: 0.45,
                ssTax: 0.05,
                irpfDeductions: 9000,
                ssDeductions: 1000,
                totalAmountIncomes: 20000,
                totalAmountDeductions: 10000,
                netSalary: 10000
            },
            {
                payrollMonth: 'February',
                salaryLevel: 2,
                monthSalary: 7500,
                bonus: 12500,
                irpfTax: 0.45,
                ssTax: 0.05,
                irpfDeductions: 9000,
                ssDeductions: 1000,
                totalAmountIncomes: 20000,
                totalAmountDeductions: 10000,
                netSalary: 10000
            },
            {

                payrollMonth: 'March',
                salaryLevel: 2,
                monthSalary: 7500,
                bonus: 12500,
                irpfTax: 0.45,
                ssTax: 0.05,
                irpfDeductions: 9000,
                ssDeductions: 1000,
                totalAmountIncomes: 20000,
                totalAmountDeductions: 10000,
                netSalary: 10000
            },
            {

                payrollMonth: 'April',
                salaryLevel: 2,
                monthSalary: 7500,
                bonus: 12500,
                irpfTax: 0.45,
                ssTax: 0.05,
                irpfDeductions: 9000,
                ssDeductions: 1000,
                totalAmountIncomes: 20000,
                totalAmountDeductions: 10000,
                netSalary: 10000
            }
        ]
    ))
    .then((result) => console.log(result))
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())


const mongoose = require('mongoose')

const { Schema, Schema: { Types: { ObjectId } }, model } = mongoose


const payrollMonth = new Schema({
    employee: {
        type: ObjectId,
        ref: 'Employee',
        requided: true
    },
    payrollYear: {
        type: Date,
        required: true,
    },
    payrollMonth: {
        type: Number,
        required: true,
        min: 1,
        max: 12
    },
    salaryLevel: {
        type: Number,
        required: true,
        trim: true
    },
    monthSalary: {
        type: Number,
        required: true,
        trim: true
    },
    bonus: {
        type: Number,
        trim: true
    },
    irpfTax: {
        type: Number,
        required: true,
        trim: true
    },
    ssTax: {
        type: Number,
        required: true,
        trim: true
    },
    irpfDeductions: {
        type: Number,
        required: true,
        trim: true
    },
    ssDeductions: {
        type: Number,
        required: true,
        trim: true
    },
    totalAmountIncomes: {
        type: Number,
        required: true,
        trim: true
    },
    totalAmountDeductions: {
        type: Number,
        required: true,
        trim: true
    },
    netSalary: {
        type: Number,
        required: true,
        trim: true
    },
})


const employee = new Schema({
    // personalData
    name: {
        type: String,
        required: true,
        trim: true
    },
    firstSurname: {
        type: String,
        required: true,
        trim: true
    },
    secondSurname: {
        type: String,
        trim: true
    },
    birthDate: {
        type: Date,
        required: true,
    },
    //index
    idCardNumber: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    //index
    tssNumber: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    adress: {
        type: String,
        required: true,
        trim: true
    },
    //index
    personalPhoneNumber: {
        type: Number,
        required: true,
        trim: true,
        unique: true,
    },
    bankAccountNumber: {
        type: String,
        required: true,
        trim: true
    },
    avatar: {
        type: String,
        default: null,
    },

    //  professionalData:
    // //index
    employeeNumber: {
        type: Number,
        required: true,
        trim: true,
        unique: true
    },
    startOfEmploymentData: {
        type: Date,
        required: true,
    },
    endOfEmploymentData: {
        type: Date,
        default: null,
    },
    lengthOfEmployment: {
        type: Number,
        default: null,
    },
    typeOfContract: {
        type: String,
        required: true,
        trim: true
    },
    jobPosition: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: String,
        trim: true
    },
    salaryLevel: {
        type: Number,
        required: true,
        trim: true
    },
    centerAttached: {
        type: String,
        required: true,
        trim: true
    },
    superiorHierarchicalManager: {
        type: ObjectId,
        ref: 'Employee',
        default: null
    },
    // permissionsArea: 
    roll: {
        type: String,
        required: true,
        trim: true
    },
    //index
    professionalPhoneNumber: {
        type: Number,
        required: true,
        trim: true,
        unique: true,
    },
    //index
    professionalEmail: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    accessPermissions: {
        type: String,
        required: true,
        trim: true
    },
    employeePassword: {
        type: String,
        trim: true,
    },

})

const PayrollMonth = model('PayrollMonth', payrollMonth)
const Employee = model('Employee', employee)


// const Notifications = model('Notifications', notifications)


module.exports = {
    PayrollMonth,
    // PayrollMonthCompany,
    Employee,
}
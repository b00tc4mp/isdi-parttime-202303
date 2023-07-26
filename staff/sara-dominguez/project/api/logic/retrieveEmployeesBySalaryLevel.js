const { Employee } = require('../data/models')
const { BSON } = require('mongodb')
const { convertParamsToBSON } = require('./helpers')

module.exports = function retrieveEmployeesBySalaryLevel(salaryLevel) {
    //TODO validators

    // Este corresponde al usuario administrador. Ver primero que exista y que tenga permisos para generar la lista de nominas
    // Employee.find(employeeId).lean()
    //     .then(employee => {
    //         if (!employee) throw new Error(`employee with id ${employeeId} not found`)
    //         //TODO EMPLOYEE PERMISSIONS OK (HELPER)
    //     })

    // return convertParamsToBSON(salaryLevel)

    Employee.find({ salaryLevel: salaryLevel }, 'avatar name firsName secondName salaryLevel').lean()
        .then(([employee]) => {
            if ([employee] === []) throw new Error(`Not found any employee with ${salaryLevel} this salary level`)

            return [employee]
        })


    // encontrar a todos los usuarios que tengan el nivel salarial indicado

}






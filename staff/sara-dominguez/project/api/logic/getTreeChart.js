const { Employee } = require('../data/models')
const {
    validators: { validateId, validateAddress },
    errors: { ExistenceError },
    utils: { Tree, TreeNode }
} = require('com')
const searchEmployee = require('./searchEmployees')
const orderEmployeeThreeChart = require('./helpers/orderEmployeeTreeChart')

// // creo el arbol con su root 
// let bElevenzChart = new Tree()
// let newNode = new TreeNode("Organizational Chart by Departments")
// bElevenzChart.root = newNode

// //Añado como hijos a los 5 departamentos de la empresa

// newNode.addChild("C-Suite")

// //Añado a los 5 departamentos, indicando la ruta, todos cuelgan de C-Suite





// ahora habria que añadir a los responsables de departamento que son empleados con jobPosition: Executive 
// bElevenzChart.insertByPath("EmployeeExecutive","department")

// ahora habria que añadir a los responsables de departamento que son empleados con jobPosition: Manager 
// bElevenzChart.insertByPath("EmployeeManager","EmployeeExecutive")

// ahora habria que añadir al resto de responsables de departamento que son empleados con jobPosition: Manager 
// bElevenzChart.insertByPath("EmployeeResto","EmployeeManager")

// con mongo esto ya lo hace solo, podemos indicar quien es el superior de cada empleado (si lo hay) y mecanizarlo para que e cree en cascada, setearlo en estado el modal para mantenerlo en memoria y renderizarlo.

module.exports = function (employeeLoggedId, searchPattern) {
    validateId(employeeLoggedId)

    let companyChart = new Tree()
    let newNode = new TreeNode("Organizational Chart by Departments", "Organizational Chart by Departments", "Organizational Chart by Departments")

    companyChart.root = newNode

    // newNode.addChildByValue("C-Suite")
    // newNode.addChildByValue("Financial")
    // newNode.addChildByValue("Development")
    // newNode.addChildByValue("Design")
    // newNode.addChildByValue("Human Resources")


    return (async () => {
        const employeeLogeedIn = await Employee.findById(employeeLoggedId)

        if (!employeeLogeedIn) throw new ExistenceError('employee not found')

        const employees = await searchEmployee(employeeLoggedId, searchPattern)

        orderEmployeeThreeChart(employees)

        for (const employee of employees) {
            if (employee.accessPermissions === "Authorized") {
                let employeeCompleted = {
                    _id: employee._id,
                    name: employee.name,
                    firstSurname: employee.firstSurname,
                    secondSurname: employee.secondSurname,
                    avatar: employee.avatar,
                    jobPosition: employee.jobPosition,
                    department: employee.department,
                    centerAttached: employee.centerAttached
                }

                if (employee.jobPosition === "CEO") {
                    newNode.addChild(employeeCompleted._id, employee.jobPosition, employeeCompleted)
                }

                if (employee.jobPosition === "CTO") {
                    // newNode.addChild(employeeCompleted._id, employee.jobPosition, employeeCompleted)

                    companyChart.insertByNamePath(employeeCompleted._id, employeeCompleted.jobPosition, employeeCompleted, "CEO")
                }

                if (employee.jobPosition === "Executive") {

                    let name = `${employee.name} ${employee.firstSurname} ${employee.secondSurname}`

                    newNode.addChild(employeeCompleted._id, employee.jobPosition, employeeCompleted)
                    companyChart.insertByNamePath(employeeCompleted._id, name, employeeCompleted, "CEO")
                }

                if (employee.jobPosition === "Manager") {
                    if (employee.superiorHierarchicalManager !== null) {
                        const superiorHierarchicalManager = await Employee.findById(employee.superiorHierarchicalManager)

                        if (superiorHierarchicalManager.accessPermissions === "Authorized") {
                            let name = `${employee.name} ${employee.firstSurname} ${employee.secondSurname}`

                            // newNode.addChild(employeeCompleted._id, employee.jobPosition, employeeCompleted)
                            companyChart.insertByIdPath(employeeCompleted._id, name, employeeCompleted, superiorHierarchicalManager.id)
                        }

                    }
                    if (employee.superiorHierarchicalManager === null || superiorHierarchicalManager.accessPermissions === "Denied") {
                        let name = `${employee.name} ${employee.firstSurname} ${employee.secondSurname}`

                        const superiorHierachicalDepartment = await Employee.find({ jobPosition: "Executive", department: employee.department })

                        if (!superiorHierachicalDepartment || superiorHierachicalDepartment === null) {
                            companyChart.insertByNamePath(employeeCompleted._id, name, employeeCompleted, "CEO")
                        }

                        companyChart.insertByNamePath(employeeCompleted._id, name, employeeCompleted, superiorHierachicalDepartment.jobPosition)
                    }



                    // if (employee.jobPosition === "Manager") {

                    //     let name = `${employee.name} ${employee.firstSurname} ${employee.secondSurname}`

                    //     companyChart.insertByNamePath(employeeCompleted._id, name, employeeCompleted, "CEO")
                    // }


                } else {
                    // const superiorHierarchicalManager = await Employee.findById(employee.superiorHierarchicalManager)

                    // const superiorHierarchicalManagerCompleted = {
                    //     id: employee._id,
                    //     name: superiorHierarchicalManager.name,
                    //     firstSurname: superiorHierarchicalManager.firstSurname,
                    //     SecondSurname: superiorHierarchicalManager.secondSurname,
                    //     avatar: superiorHierarchicalManager.avatar,
                    //     job: superiorHierarchicalManager.jobPosition,
                    //     department: superiorHierarchicalManager.department,
                    //     centerAttached: superiorHierarchicalManager.centerAttached
                    // }

                    // companyChart.insertByPath(employeeCompleted, superiorHierarchicalManagerCompleted)

                }
            }

        }

        const chart = companyChart.root.children

        return chart
    })()
}




            // return (async () => {
            //     const employeeLogeedIn = await Employee.findById(employeeLoggedId)

            //     if (!employeeLogeedIn) throw new ExistenceError('employee not found')

            //     const employees = await searchEmployee(employeeLoggedId, searchPattern)

            //     for (const employee of employees) {
            //         let employeeCompleted = {
            //             _id: employee._id,
            //             name: employee.name,
            //             firstSurname: employee.firstSurname,
            //             secondSurname: employee.secondSurname,
            //             avatar: employee.avatar,
            //             jobPosition: employee.jobPosition,
            //             department: employee.department,
            //             centerAttached: employee.centerAttached
            //         }
            //
            // if (employee.jobPosition === "Executive" && employee.department === "C-Suite" || !employee.superiorHierarchicalManager) {
            //     companyChart.insertByPath(employeeCompleted, 'C-Suite')

            // } else {
            //     const superiorHierarchicalManager = await Employee.findById(employee.superiorHierarchicalManager)

            //     const superiorHierarchicalManagerCompleted = {
            //         id: employee._id,
            //         name: superiorHierarchicalManager.name,
            //         firstSurname: superiorHierarchicalManager.firstSurname,
            //         SecondSurname: superiorHierarchicalManager.secondSurname,
            //         avatar: superiorHierarchicalManager.avatar,
            //         job: superiorHierarchicalManager.jobPosition,
            //         department: superiorHierarchicalManager.department,
            //         centerAttached: superiorHierarchicalManager.centerAttached
            //     }

            //     companyChart.insertByPath(employeeCompleted, superiorHierarchicalManagerCompleted)

            // }





import retrieveEmployee from "../logic/retrieveEmployee"
import { context } from '../ui'
import { useState, useRef } from 'react'
import Employee from './Employee'
import Header from "./Header"
import retrieveEmployeesBySalaryLevel from '../logic/retrieveEmployeesBySalaryLevel'
import createEmployeePayrollMonth from '../logic/createEmployeePayrollMonth'
import { Input, Container, Button, Select } from '../library'


export default function ManagePayrollMenuModal({ employee }) {
    console.log("PayrollMenuModal --> open")

    // TODO alert
    const [employeeList, setEmployeeList] = useState()
    const [view, setView] = useState(null)

    // const salaryLevel = useRef(null)

    // prueba de que renderiza ok 
    // let employeeListRetrieved = []
    // [{ id: 2, avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrQ6RdNYDIeXg3iTWoclyhB9BJ55rPr5emnw&usqp=CAU", name: "Sara", firsName: "d", secondSurname: "b", salaryLevel: 2 }, { id: 1, avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrQ6RdNYDIeXg3iTWoclyhB9BJ55rPr5emnw&usqp=CAU", name: "Jesus", firsName: "d", secondSurname: "b", salaryLevel: 2 }]

    // retrieveEmployee(context.token)

    const handleGenerateEmployeeList = () => {
        setView('EmployeeListRetrieved')

        // const yearSelected = document.getElementById('year')
        // const year = yearSelected.value
        // const monthSelected = document.getElementById('month')
        // const month = monthSelected.value
        const salaryLevelSelected = document.getElementById('salaryLevel')
        const salaryLevel = salaryLevelSelected.value


        return retrieveEmployeesBySalaryLevel(salaryLevel)
            .then((employeeList) => {
                console.log(employeeList)
                setEmployeeList(employeeList)

            })
            .catch((error) => { throw new Error(error) })
    }
    // TODO implantar createEmployeePayroll en APP
    const handleCreateNewPayrollsMonth = () => {
        const yearSelected = document.getElementById('year')
        const year = yearSelected.value
        const monthSelected = document.getElementById('month')
        const month = parseInt(monthSelected.value)

        employeeList.forEach((employee) => {
            createEmployeePayrollMonth(employee._id, year, month)
        })
    }


    return <Container tag="section">
        {/* TODOheader del modal */}
        <Header employee={employee}
        />

        <main>
            {/* nombre del menu, a la izquierda */}
            <div >
                <h4>Manage Payroll Menu</h4>
            </div >
            <h5>Create payrolls Month</h5>
            {/* selector para buscar empleado por nivel salarial y escoger el año y mes de la nomina a crear, arriba centrado */}
            <div>
                <div className="selectToCreateNewPayrolls">
                    <label>Year:</label>
                    <Select name="" id="year">
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                    </Select>
                    <label>Month</label>
                    <Select name="" id="month">
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </Select>
                    <label>Employees salary level: </label>
                    <Select name="" id="salaryLevel">
                        <option value="5">Level 5</option>
                        <option value="4">Level 4</option>
                        <option value="3">Level 3</option>
                        <option value="2">Level 2</option>
                        <option value="1">Level 1</option>
                    </Select>
                    <Button className="w-2/6" onClick={handleGenerateEmployeeList}>Generate Employee List</Button>
                </div>

            </div>

            {/* div donde se pintan los empleados encontrados por nivel salarial */}
            <div>
                {view === 'EmployeeListRetrieved' && employeeList && employeeList.map((employee) => <Employee
                    key={employee.id}
                    employee={employee}
                />)}
                {employee && employeeList ? (
                    <>
                        <div>
                            <label>Total Payrolls to create: <h5>{employeeList.length}</h5></label>
                            <label>Total Payrolls ammount: <h5></h5></label>
                            <h5> XXXX euros</h5>

                            <Button className="w-2/5" onClick={handleCreateNewPayrollsMonth}>Confirm create new MONTH payrolls</Button>
                        </div>
                    </>
                ) : (
                    <h4></h4>
                )}
            </div>

        </main>
    </Container >
}


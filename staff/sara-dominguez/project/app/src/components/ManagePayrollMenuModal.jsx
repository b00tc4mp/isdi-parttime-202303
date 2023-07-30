import retrieveEmployee from "../logic/retrieveEmployee"
import { context } from '../ui'
import { useState, useRef } from 'react'
import Employee from './Employee'


export default function PayrollMenuModal() {
    console.log("PayrollMenuModal --> open")

    const [view, setView] = useState(null)
    // const year = useRef(null)
    // const month = useRef(null)
    // const salaryLevel = useRef(null)

    // prueba de que renderiza ok 
    let employeeListRetrieved = [{ id: 2, avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrQ6RdNYDIeXg3iTWoclyhB9BJ55rPr5emnw&usqp=CAU", name: "Sara", firsName: "d", secondSurname: "b", salaryLevel: 2 }, { id: 1, avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrQ6RdNYDIeXg3iTWoclyhB9BJ55rPr5emnw&usqp=CAU", name: "Jesus", firsName: "d", secondSurname: "b", salaryLevel: 2 }]

    // retrieveEmployee(context.token)

    const handleGenerateEmployeeList = () => {
        setView('EmployeeList')

        const year = document.getElementById('year')
        const yearSelected = year.value
        const month = document.getElementById('month')
        const monthSelected = month.value
        const salaryLevel = document.getElementById('salaryLevel')
        const salaryLevelSelected = salaryLevel.value

        console.log(
            yearSelected,
            monthSelected,
            salaryLevelSelected
        )

        //2. retrieveEmployeeBySalaryLevel(salaryLevel)
    }

    const handleCreateNewPayrollsMonth = () => {
        //employeeListRetrieved.forEach((employee) =>{
        //     createEmployeePayroll(id, yearSelected, monthSelected)
        // }
    }





    return <section className="" style={{ backgroundColor: '#808080', color: '#ffffff' }}>
        {/* header del modal */}
        <header style={{ backgroundColor: '#FFA500', color: '#ffffff' }} >
            <h5>Sara Username</h5>
            {/* <h5>CEO</h5>
            <h5>Phone:698349859</h5>
            <h5>Email: sara.b-elevenz@b-elevenzsb.com</h5>
            <h5>22-07-2023</h5> */}
        </header>

        <main>
            {/* nombre del menu, a la izquierda */}
            <div >
                <h4>Payroll Menu</h4>
            </div >
            <h5>Create payrolls Month</h5>
            {/* selector para buscar empleado por nivel salarial y escoger el año y mes de la nomina a crear, arriba centrado */}
            <div>
                <div className="selectToCreateNewPayrolls">
                    <label>Year:</label>
                    <select name="" id="year">
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                    </select>
                    <label>Month</label>
                    <select name="" id="month">
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
                    </select>
                    <label>Employees salary level: </label>
                    <select name="" id="salaryLevel">
                        <option value="5">Level 5</option>
                        <option value="4">Level 4</option>
                        <option value="3">Level 3</option>
                        <option value="2">Level 2</option>
                        <option value="1">Level 1</option>
                    </select>
                    <button onClick={handleGenerateEmployeeList}>Generate Employee List</button>
                </div>

            </div>

            {/* div donde se pintan los empleados encontrados por nivel salarial */}
            <div>
                {view === 'EmployeeList' && employeeListRetrieved && employeeListRetrieved.map((employee) => <Employee
                    key={employee.id}
                    employee={employee}
                />)}
                <div>
                    <label>Total Payrolls to create: <h5>{employeeListRetrieved.length}</h5></label>
                    <label>Total Payrolls ammount: <h5></h5></label>
                    <h5> XXXX euros</h5>

                    <button onClick={handleCreateNewPayrollsMonth}>Confirm create new MONTH payrolls</button>
                </div>
            </div>

        </main>
    </section >

}
import retrieveEmployee from "../logic/retrieveEmployee"
import { context } from '../ui'
import { useState, useRef } from 'react'
import Employee from './Employee'
import retrieveEmployeesBySalaryLevel from '../logic/retrieveEmployeesBySalaryLevel'
import createEmployeePayrollMonth from '../logic/createEmployeePayrollMonth'
import { Input, Container, Button, Select } from '../library'


export default function CreatePayrollMonthModal({ onPayrollCreated }) {
    console.log("createPayrollMonthModal --> open")

    const [employeeList, setEmployeeList] = useState(null)
    const [modal, setModal] = useState('createPayrollMonthModal')
    const [view, setView] = useState(null)
    const [selectedYear, setSelectedYear] = useState(2023)
    const [selectedMonth, setSelectedMonth] = useState(1)
    const [selectedSalaryLevel, setSelectedSalaryLevel] = useState(1)

    const handleGenerateEmployeeList = () => {
        setView('EmployeeListRetrieved')

        const salaryLevel = parseInt(selectedSalaryLevel)

        try {
            return retrieveEmployeesBySalaryLevel(salaryLevel)
                .then((employeeList) => {
                    console.log(employeeList)
                    setEmployeeList(employeeList)

                })
                .catch((error) => { throw new Error(error) })
        } catch (error) {
            throw new Error(error.message)
        }
    }

    const handleCreateNewPayrollsMonth = () => {

        const year = parseInt(selectedYear)
        const month = parseInt(selectedMonth)

        try {
            employeeList.forEach((employee) => {
                const { _id } = employee
                const employeeId = _id
                createEmployeePayrollMonth(employeeId, year, month)
            })
            console.log('nominas creadas')
            onPayrollCreated()
            // setEmployeeList(null)
            // setView(null)
            // setModal(null)
        } catch (error) {
            throw new Error(error.message)
        }
    }

    return <section>
        <div className="selectToCreateNewPayrolls">
            <label>Year:</label>
            <Select value={selectedYear} onChange={event => setSelectedYear(event.target.value)}>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
            </Select>
            <label>Month</label>
            <Select value={selectedMonth} onChange={event => setSelectedMonth(event.target.value)}>
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
            <Select value={selectedSalaryLevel} onChange={event => setSelectedSalaryLevel(event.target.value)}>
                <option value="5">Level 5</option>
                <option value="4">Level 4</option>
                <option value="3">Level 3</option>
                <option value="2">Level 2</option>
                <option value="1">Level 1</option>
            </Select>
            <Button className="w-2/6" onClick={handleGenerateEmployeeList}>Generate Employee List</Button>
        </div>

        <div>
            {view === 'EmployeeListRetrieved' && employeeList && employeeList.map((employee) => <Employee
                key={employee.id}
                employee={employee}
            />)}
            {employeeList ? (
                <>
                    <div>
                        <label>Total Payrolls to create: <h5>{employeeList.length}</h5></label>

                        <Button className="w-2/5" onClick={handleCreateNewPayrollsMonth}>Confirm create payrolls month</Button>
                    </div>
                </>
            ) : (
                <h4></h4>
            )}
        </div>
    </section >
}
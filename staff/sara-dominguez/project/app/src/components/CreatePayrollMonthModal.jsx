import retrieveEmployee from "../logic/retrieveEmployeeLogged"
import { context } from '../ui'
import { useState, useRef } from 'react'
import Employee from './Employee'
import retrieveEmployeesBySalaryLevel from '../logic/retrieveEmployeesBySalaryLevel'
import createEmployeePayrollMonth from '../logic/createEmployeePayrollMonth'
import { Input, Container, Button, Select } from '../library'
import useAppContext from '../hooks/useAppContext'

export default function CreatePayrollMonthModal({ onPayrollCreated }) {
    console.log("createPayrollMonthModal --> open")

    const [employeeList, setEmployeeList] = useState(null)
    const [modal, setModal] = useState('createPayrollMonthModal')
    const [view, setView] = useState(null)
    const [selectedYear, setSelectedYear] = useState(2023)
    const [selectedMonth, setSelectedMonth] = useState(1)
    const [selectedSalaryLevel, setSelectedSalaryLevel] = useState(1)
    const { alert } = useAppContext()

    const handleGenerateEmployeeList = () => {
        setView('EmployeeListRetrieved')

        const salaryLevel = parseInt(selectedSalaryLevel)

        try {
            return retrieveEmployeesBySalaryLevel(salaryLevel)
                .then((employeeList) => {
                    setEmployeeList(employeeList)
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
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
            onPayrollCreated()
        } catch (error) {
            alert(error.message)
        }
    }

    return <section className="w-7/12 mr-8 bg-slate-200 rounded-[7px]">
        <div className="selectToCreateNewPayrolls bg-slate-200 flex flex-wrap sticky top-0 z-10">
            <div className="w-3/12 h-1/6 ml-auto mr-auto flex">
                <label className="mr-2">Year:</label>
                <Select value={selectedYear} onChange={event => setSelectedYear(event.target.value)}>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                </Select>
            </div>
            <div className="w-4/12 h-1/6 flex">
                <label className="mr-2">Month:</label>
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
            </div>
            <div className="w-5/12 h-1/6 flex">
                <label className="mr-2">Salary level: </label>
                <Select value={selectedSalaryLevel} onChange={event => setSelectedSalaryLevel(event.target.value)}>
                    <option value="5">Level 5</option>
                    <option value="4">Level 4</option>
                    <option value="3">Level 3</option>
                    <option value="2">Level 2</option>
                    <option value="1">Level 1</option>
                </Select>
            </div>
            <Button className="w-5/12 ml-auto mr-auto mt-4 mb-10" onClick={handleGenerateEmployeeList}>Generate Employee List</Button>
        </div>
        <div className="flex flex-col">
            {view === 'EmployeeListRetrieved' && employeeList && employeeList.map((employee) => <Employee
                key={employee.id}
                employee={employee}
            />)}
            {employeeList ? (
                // <>
                <div className="ml-20 pt-2 sticky bottom-0 bg-slate-200 z-10">
                    <label className="flex italic font-semibold justify-start">Total Payrolls to create:<h5 className="pl-2">{employeeList.length}</h5></label>

                    <Button className="w-2/5 mt-2" onClick={handleCreateNewPayrollsMonth}>Confirm create payrolls month</Button>
                </div>
                // </>
            ) : (
                <h4></h4>
            )}
        </div>
    </section >
}
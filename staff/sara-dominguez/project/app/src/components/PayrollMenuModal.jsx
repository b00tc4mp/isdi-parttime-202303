import Header from "./Header.jsx"
import PayrollMonth from "./PayrollMonth"
import PayrollAnnualAggregate from "./PayrollAnnualAggregate"
import useAppContext from '../hooks/useAppContext'
import { useState, useId } from 'react'
import retrievePayrollAnnualAggregate from '../logic/retrievePayrollAnnualAggregate'
import retrievePayrollMonth from '../logic/retrievePayrollMonth'
import { context } from '../ui'
import { Input, Container, Select, Button, FormButton } from '../library'

export default function PayrollMenuModal({ employee, onPayrollMenuModalLogout }) {
    console.log('PayrollMenuModal --> open')

    const [view, setView] = useState(null)
    const { alert } = useAppContext()
    const [payrollMonthRetrieved, setPayrollMonthRetrieved] = useState()
    const [payrollAnnualAggregate, setPayrollAnnualAggregate] = useState()
    const [selectedYear, setSelectedYear] = useState(2023)
    const [selectedMonth, setSelectedMonth] = useState(1)

    const handleCheckPayrollMonth = event => {
        event.preventDefault()

        const payrollYear = parseInt(selectedYear)
        const payrollMonth = parseInt(selectedMonth)

        try {
            retrievePayrollMonth(payrollYear, payrollMonth)
                .then(result => {
                    setPayrollMonthRetrieved(result)
                    setView('PayrollMonth')
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }

    const handleCheckAnnualAggregate = event => {
        event.preventDefault()

        const payrollYear = parseInt(selectedYear)
        try {
            retrievePayrollAnnualAggregate(payrollYear)
                .then(payrollAnnualAggregate => {
                    setPayrollAnnualAggregate(payrollAnnualAggregate)
                    setView('PayrollAnnualAggregate')
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }

    const handlePayrollMenuModalLogout = event => {
        event.preventDefault()

        onPayrollMenuModalLogout()
    }

    return <Container tag="section">
        <Header employee={employee}
        />
        <main className="overflow-auto h-full flex">
            {/* nombre del menu, a la izquierda */}
            <div className="w-2/12 ml-4 pt-2 sticky top-0 bg-slate-200 z-10 drop-shadow-none">
                <h4 className="w-2/12 italic text-ml">Payroll Menu</h4>
                <div className="flex flex-col mt-20">
                    <h5 className="text-sm" onClick={handleCheckAnnualAggregate}>Annual Aggregate</h5>
                </div>
            </div >
            <div className="pl-8 pr-12 pt-2 space-y-4 w-full h-full">
                <div className="flex">
                    <div className="selectToCheckYear flex justify-center w-full">
                        <label className="mr-2">Year:</label>
                        <Select value={selectedYear} onChange={event => setSelectedYear(event.target.value)}>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                        </Select>
                    </div>
                    <div className="selectToCheckPayrolls flex  w-full" >
                        <label className="mr-2">Month: </label>
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
                    <div className="w-full">
                        <Button className="h-5/6 pb-2" onClick={handleCheckPayrollMonth}>Check payroll</Button>
                    </div>
                </div>
                {view === 'PayrollMonth' && <PayrollMonth employee={employee}
                    payrollMonthRetrieved={payrollMonthRetrieved} />}
                {view === 'PayrollAnnualAggregate' && <PayrollAnnualAggregate employee={employee}
                    payrollAnnualAggregate={payrollAnnualAggregate} />}
            </div>
        </main>
        <footer className="ml-3 mt-2 mb-1 sticky bottom-0 bg-slate-200 z-10">
            <h5 className="ml-4 mt-2 pb-0.5 sticky bottom-0 bg-slate-200 z-10 italic" onClick={handlePayrollMenuModalLogout}>Logout</h5>
        </footer>
    </Container >

}
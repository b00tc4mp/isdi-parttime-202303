import Header from "./Header.jsx"
import PayrollMonth from "./PayrollMonth"
import PayrollAnnualAggregate from "./PayrollAnnualAggregate"
import useAppContext from '../hooks/useAppContext'
import { useState, useEffect } from 'react'
import retrievePayrollAnnualAggregate from '../logic/retrievePayrollAnnualAggregate'
import retrievePayrollMonth from '../logic/retrievePayrollMonth'
import { context } from '../ui'

export default function PayrollMenuModal({ employee }) {
    console.log('PayrollMenuModal --> open')

    const [view, setView] = useState(null)
    const { alert } = useAppContext()
    const [payrollMonthRetrieved, setPayrollMonthRetrieved] = useState()
    const [payrollAnnualAggregate, setPayrollAnnualAggregate] = useState()



    const handleCheckPayrollMonth = event => {
        event.preventDefault()

        const year = document.getElementById('year')
        const payrollYear = year.value
        const month = document.getElementById('month')
        const payrollMonth = month.value

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

        const year = document.getElementById('year')
        const payrollYear = year.value

        try {
            retrievePayrollAnnualAggregate(payrollYear)
                .then(payrollAnnualAggregate => {
                    console.log(payrollAnnualAggregate)
                    setPayrollAnnualAggregate(payrollAnnualAggregate)
                    setView('PayrollAnnualAggregate')
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }

    return <section className="" style={{ backgroundColor: '#803080', color: '#ffffff' }}>
        <Header employee={employee}
        />

        <main>
            {/* nombre del menu, a la izquierda */}
            <div >
                <h4>Payroll Menu</h4>
            </div >
            {/* selector para buscar empleado por nivel salarial y escoger el año y mes de la nomina a crear, arriba centrado */}
            <div>
                <label>Year:</label>
                <select name="" id="year">
                    <option value="2023-01-01">2023</option>
                    <option value="2022">2022</option>
                </select>
                <div className="selectToCheckPayrolls" >
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
                    <button onClick={handleCheckPayrollMonth}>Check payroll</button>
                    <h5 onClick={handleCheckAnnualAggregate}>Annual Aggregate</h5>
                    <h5>Tax Certificate</h5>

                </div>
            </div>
            {/* //TODO revisar las props que le mando a Payroll.jsx */}
            {view === 'PayrollMonth' && <PayrollMonth employee={employee} payrollMonthRetrieved={payrollMonthRetrieved} />}
            {view === 'PayrollAnnualAggregate' && <PayrollAnnualAggregate employee={employee} payrollAnnualAggregate={payrollAnnualAggregate} />}

        </main>
    </section >

}
import retrieveEmployee from "../logic/retrieveEmployee"
import { context } from '../ui'
import { useState } from 'react'
import Employee from './Employee'
import Header from "./Header"
import PayrollsMonthListToBePaid from "./PayrollsMonthListToBePaid"
import retrievePayrollsToBePaid from '../logic/retrievePayrollsMonthToBePaid'
import { Input, Container, Button, Select } from '../library'




export default function ProcessPayrollsMonthPayments({ employee, onPayrollsMonthPaid }) {
    console.log("processPayrollMonthPayments --> open")

    const [payrollsMonthList, setPayrollMonthList] = useState(null)
    const [modal, setModal] = useState(null)
    const [view, setView] = useState(null)
    const [selectedYear, setSelectedYear] = useState(2023)
    const [selectedMonth, setSelectedMonth] = useState(1)



    const handleGeneratePayrollsMonthListToPaid = () => {
        setView('payrollsMonthListRetrievedTopPaid')


        const payrollYear = parseInt(selectedYear)
        const payrollMonth = parseInt(selectedMonth)

        try {

            return retrievePayrollsToBePaid(payrollYear, payrollMonth)
                .then((payrollsMonthList) => {
                    // console.log(payrollsMonthList)
                    setPayrollMonthList(payrollsMonthList)
                })
                .catch((error) => { throw new Error(error) })
        } catch (error) {
            throw new Error(error.message)
        }
    }

    const handlePayPayrollsMonth = () => {

        const payrollYear = parseInt(selectedYear)
        const payrollMonth = parseInt(selectedMonth)

        try {
            payrollsMonthList.forEach((payrollMonth) => {
                const { _id } = payrollMonth
                const payrollMonthId = _id
                console.log(payrollMonthId)
                // createEmployeePayrollMonth(payrollMonthId, year, month)
            })
            console.log('nominas pagadas')
            console.log(payrollYear)
            console.log(payrollMonth)
            onPayrollsMonthPaid()
            // setEmployeeList(null)
            // setView(null)
            // setModal(null)
        } catch (error) {
            throw new Error(error.message)
        }
    }


    return <section>
        <div className="selectToProcessPayrollsPayment">
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
            <Button className="w-2/6" onClick={handleGeneratePayrollsMonthListToPaid}>Generate payrolls month list to paid</Button>
        </div>

        <div>
            {view === 'payrollsMonthListRetrievedTopPaid' && payrollsMonthList && <PayrollsMonthListToBePaid
                // key={payrollMonth.id}
                payrollsMonthList={payrollsMonthList}
            />}
            {payrollsMonthList ? (
                <>
                    <div>
                        <label>Total payrolls month to paid <h5>{payrollsMonthList.length}</h5></label>

                        <Button className="w-2/5" onClick={handlePayPayrollsMonth}>Pay payrolls month</Button>
                    </div>
                </>
            )
                : (
                    <h4></h4>
                )
            }
        </div >
    </section >
}
import retrieveEmployee from "../logic/retrieveEmployeeLogged"
import { context } from '../ui'
import { useState } from 'react'
import Employee from './Employee'
import Header from "./Header"
import PayrollsMonthListToBePaid from './PayrollsMonthListToBePaid'
import retrievePayrollsToBePaid from '../logic/retrievePayrollsMonthToBePaid'
import calculateTotalAmount from '../logic/calculateTotalAmount.js'
import updatePayrollStatusToPaid from '../logic/updatePayrollStatusToPaid'
import { Input, Container, Button, Select } from '../library'
import useAppContext from '../hooks/useAppContext'

export default function ProcessPayrollsMonthPayments({ employee, onPayrollsMonthPaid }) {
    console.log("processPayrollMonthPayments --> open")

    const [payrollsMonthList, setPayrollMonthList] = useState(null)
    const [modal, setModal] = useState(null)
    const [view, setView] = useState(null)
    const [selectedYear, setSelectedYear] = useState(2023)
    const [selectedMonth, setSelectedMonth] = useState(1)
    const [sum, setSum] = useState(0)
    const { alert } = useAppContext()

    const handleGeneratePayrollsMonthListToPaid = async () => {
        setView('payrollsMonthListRetrievedTopPaid')

        const payrollYear = parseInt(selectedYear)
        const payrollMonth = parseInt(selectedMonth)

        try {
            const payrollsMonthList = await retrievePayrollsToBePaid(payrollYear, payrollMonth)

            setPayrollMonthList(payrollsMonthList)

            const totalAmountArray = payrollsMonthList.map(payroll => payroll.netSalary)

            const sum = calculateTotalAmount(totalAmountArray)

            setSum(sum)
        } catch (error) {
            alert(error.message)
        }
    }

    const handlePayPayrollsMonth = () => {
        try {
            payrollsMonthList.forEach((payrollMonth) => {
                const { _id } = payrollMonth
                updatePayrollStatusToPaid(_id)
            })
            onPayrollsMonthPaid()
        } catch (error) {
            alert(error.message)
        }
    }

    return <section className="w-9/12 mr-7 bg-slate-200 rounded-[7px] ">
        <div className="selectToProcessPayrollsPayment bg-slate-200 mb-3 flex flex-wrap sticky top-0 bg-slate-200 z-10">
            <div className="w-3/12 h-1/6 ml-3  flex">
                <label className="mr-2">Year:</label>
                <Select value={selectedYear} onChange={event => setSelectedYear(event.target.value)}>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                </Select>
            </div>
            <div className="w-4/12 h-1/6  ml-3 flex">
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
            <Button className="w-5/12 h-1/6 mt-2 mb-3" onClick={handleGeneratePayrollsMonthListToPaid}>Generate payrolls month list to paid</Button>
        </div>
        <div className="flex flex-col">
            {view === 'payrollsMonthListRetrievedTopPaid' && payrollsMonthList && payrollsMonthList.map((payroll) => <PayrollsMonthListToBePaid
                key={payroll._id}
                payroll={payroll}
            />)}
            {payrollsMonthList ? (
                // <>
                <div className="mt-5 sticky bottom-0 bg-slate-200 z-10">
                    <label className="flex italic font-semibold justify-start pt-3">Total payrolls month to paid: <h5 className="pl-2">{payrollsMonthList.length}</h5></label>

                    <label className="flex italic font-semibold justify-start">Total amount payrolls month to paid: <h5 className="pl-2">{sum.toLocaleString('de-DE')} Eur.</h5></label>

                    <Button className="mt-2" onClick={handlePayPayrollsMonth}>Pay payrolls month</Button>
                </div>
                // </>
            )
                : (
                    <h4></h4>
                )
            }
        </div >
    </section >
}

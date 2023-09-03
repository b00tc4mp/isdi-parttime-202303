import retrieveEmployee from "../logic/retrieveEmployeeLogged"
import { context } from '../ui'
import { useState } from 'react'
import Employee from './Employee'
import Header from "./Header"
import PayrollsMonthListToBePaid from './PayrollsMonthListToBePaid'
import retrievePayrollsToBePaid from '../logic/retrievePayrollsMonthToBePaid'
import calculateTotalAmount from '../logic/calculateTotalAmount.js'
import updatePayrollStatusToPaid from '../logic/updatePayrollStatusToPaid'
import deletePayrollMonth from '../logic/deletePayrollMonth'
import { Input, Container, Button, FormButton, Select } from '../library'
import useAppContext from '../hooks/useAppContext'

export default function ProcessPayrollsMonthPayments({ employee, onPayrollsMonthPaid, onCloseProcessPayrollsMonthPaymentsModal }) {
    console.log("processPayrollMonthPayments --> open")

    const [payrollsMonthList, setPayrollMonthList] = useState(null)
    const [UpdatePayrollsMonthList, setUpdatedPayrollMonthList] = useState(null)
    const [modal, setModal] = useState(null)
    const [view, setView] = useState(null)
    const [selectedYear, setSelectedYear] = useState(2023)
    const [selectedMonth, setSelectedMonth] = useState(1)
    const [sum, setSum] = useState(0)
    const [sumUpdated, setSumUpdated] = useState([])


    const [selectedPayrollIds, setSelectedPayrollIds] = useState([])

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
            const updatedPayrollsMonthList = payrollsMonthList.filter(payroll => !selectedPayrollIds.includes(payroll._id))

            setPayrollMonthList(updatedPayrollsMonthList)
            setUpdatedPayrollMonthList(updatedPayrollsMonthList)

            for (let i = 0; i < selectedPayrollIds.length; i++) {
                deletePayrollMonth(selectedPayrollIds[i])
            }

            const markPayrollsAsPaid = async () => {
                try {
                    await Promise.all(updatedPayrollsMonthList.map(payrollMonth => updatePayrollStatusToPaid(payrollMonth._id)))
                    onPayrollsMonthPaid()
                } catch (error) {
                    alert(error.message)
                }
            }
            markPayrollsAsPaid()
        } catch (error) {
            alert(error.message)
        }
    }

    const handleDeletePayrollMonthToBePaid = (payrollId, netSalary) => {
        try {
            if (selectedPayrollIds.includes(payrollId)) {
                setSelectedPayrollIds(selectedPayrollIds.filter(id => id !== payrollId))

                setSumUpdated(sumUpdated.concat(netSalary))
            } else {
                setSelectedPayrollIds([...selectedPayrollIds, payrollId])

                setSumUpdated(sumUpdated.concat(netSalary))
            }
        } catch (error) {
            alert(error.message)
        }
    }

    const handleReIncorporatedPayrollMonthtoBePaid = (payrollId, netSalary) => {
        try {
            if (selectedPayrollIds.includes(payrollId)) {
                setSelectedPayrollIds(selectedPayrollIds.filter(id => id !== payrollId))

                const indexToRemove = sumUpdated.findIndex(amount => amount === netSalary);
                if (indexToRemove !== -1) {
                    sumUpdated.splice(indexToRemove, 1);
                    setSumUpdated(sumUpdated)
                }
            } else {
                setSelectedPayrollIds([...selectedPayrollIds])

                const indexToRemove = sumUpdated.findIndex(amount => amount === netSalary);
                if (indexToRemove !== -1) {
                    sumUpdated.splice(indexToRemove, 1);
                    setSumUpdated(...sumUpdated)
                }
            }
        } catch (error) {
            alert(error.message)
        }
    }

    const handleCloseProcessPayrollsMonthPaymentsModal = () => {
        setModal(null)
        onCloseProcessPayrollsMonthPaymentsModal()
    }
    const handleCloseEmployeeListRetrieved = () => {
        setView(null)
        setPayrollMonthList(null)
        setModal('createPayrollMonthModal')
    }

    const payrollsToDeleteTotalSumUpdated = calculateTotalAmount(sumUpdated) ?? {}
    const totalAmountPayrollsToPaid = sum - payrollsToDeleteTotalSumUpdated ?? {}

    return <section className="w-9/12 mr-7 bg-slate-200 rounded-[7px] ">
        <div className="selectToProcessPayrollsPayment bg-slate-200 mb-3 flex flex-wrap sticky top-0 bg-slate-200 z-10">
            <div className="w-3/12 h-1/6 ml-[10%]  flex">
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
            <div className="w-full flex mr-auto ml-auto mb-2">
                <Button className="w-[45%] ml- mr-5 mt-4 mb-1" onClick={handleGeneratePayrollsMonthListToPaid}>Generate payrolls month list to paid</Button>
                <FormButton className=" w-[20%] mr-[4%] bg-slate-500 text-xs mb-1 mt-4" onClick={handleCloseProcessPayrollsMonthPaymentsModal}>Back</FormButton>
            </div>

        </div>

        <div className="flex flex-col">
            {view === 'payrollsMonthListRetrievedTopPaid' && payrollsMonthList && payrollsMonthList.map((payroll) => <PayrollsMonthListToBePaid
                key={payroll._id}
                payroll={payroll}
                onDeletedPayrollMonthtoBePaid={() => handleDeletePayrollMonthToBePaid(payroll._id, payroll.netSalary)}
                onReIncorporatedPayrollMonthtoBePaid={() => handleReIncorporatedPayrollMonthtoBePaid(payroll._id, payroll.netSalary)}
            />)}
            {payrollsMonthList && (

                <div className="mt-5 sticky bottom-0 bg-slate-200 z-10">
                    {selectedPayrollIds.length === 0 ? (
                        <>
                            <label className="flex italic font-semibold justify-start pt-3 text-sm text-black">Total payrolls month to pay: <h5 className="pl-2">{payrollsMonthList.length}</h5></label>
                            <label className="flex italic font-semibold justify-start text-sm text-black">Total amount payrolls month to pay: <h5 className="pl-2">{sum.toLocaleString('de-DE')} Eur.</h5></label>
                        </>
                    ) : null}

                    {selectedPayrollIds.length > 0 && (
                        <div className="mt-5 sticky bottom-0 bg-slate-200 z-10 flex">
                            <div className="w-[47%]">
                                <label className="flex italic font-semibold justify-start pt-1 text-sm font-normal text-red-500">Total payrolls month deleted: <h5 className="pl-2">{selectedPayrollIds.length}</h5></label>

                                <label className="flex italic font-semibold justify-start text-sm font-normal text-red-500">Total amount payrolls month deleted: <h5 className="pl-2">{payrollsToDeleteTotalSumUpdated.toLocaleString('de-DE')} Eur.</h5></label>
                            </div>
                            <div className="ml- w-[50%]">
                                <label className="flex italic font-semibold justify-start pt-1 text-sm">Total payrolls month to pay: <h5 className="pl-2">{payrollsMonthList.length - selectedPayrollIds.length}</h5></label>

                                <label className="flex italic font-semibold justify-start text-sm">Total amount payrolls month to pay: <h5 className="pl-2">{totalAmountPayrollsToPaid.toLocaleString('de-DE')} Eur.</h5></label>
                            </div>
                        </div>
                    )}
                    <div className="w-full flex mr-auto ml-auto ">
                        <Button className="w-[45%] mr-5 mt-2 mb-1" onClick={handlePayPayrollsMonth}>Pay payrolls month</Button>
                        <Button className="w-[20%] mr-[4%] bg-slate-500 text-xs mb-1 mt-2" onClick={handleCloseEmployeeListRetrieved}>Close</Button>
                    </div>

                </div >
            )}
        </div>
    </section >
}

// import getMonthNameFromMonthNumber from '../logic/getMonthNameFromValue'
import { useEffect, useState } from 'react'
import useAppContext from '../hooks/useAppContext'
import context from '../logic/context'
import retrieveEmployeePayrollData from '../logic/retrieveEmployeePayrollData'
import { utils } from 'com'
const { extractSubFromToken } = utils
import { Input, Container, Select, Button, FormButton } from '../library'

export default function PayrollMonth({ payrollMonthRetrieved, onClosePayrollMonthModal }) {
    console.log('Payrollmonth --> open')

    const { alert } = useAppContext()
    const [employee, setEmployee] = useState()
    const [modal, setModal] = useState()

    useEffect(() => {
        async function fetchEmployee() {
            try {
                const employeeId = extractSubFromToken(context.token)

                const employee = await retrieveEmployeePayrollData(employeeId)

                if (employee === undefined || payrollMonthRetrieved === undefined) {
                    throw new Error("Payroll not available. For inquiries, please contact the Human Resources department")
                }
                setEmployee(employee)
            } catch (error) {
                alert(error.message)
            }
        }
        fetchEmployee()
    }, [])

    const handleClosePayrollMonthModal = () => {
        setModal(null)
        onClosePayrollMonthModal()
    }

    const { name, firstSurname, secondSurname, idCardNumber, employeeNumber, jobPosition, department, centerAttached, tssNumber, salaryLevel, bankAccountNumber } = employee || {}

    const { payrollYear, monthName, monthSalary, bonus, irpfTax, ssTax, irpfDeductions, ssDeductions, totalAmountIncomes, totalAmountDeductions, netSalary } = payrollMonthRetrieved || {}


    return <article className="bg-slate-200">
        <div className="flex flex-col items-end">
            <FormButton className=" w-[6%] mr-[4%] bg-slate-500 text-xs mb-2" onClick={handleClosePayrollMonthModal}>Close</FormButton>
        </div>
        <article className="bg-white rounded-[7px] drop-shadow bg-neutral-200">
            {employee && payrollMonthRetrieved ? (
                <>
                    <header className="p-4 flex flex-col">
                        <div>
                            <h5 className="text-neutral-600 text-xl ml-8 mt-3 drop-shadow-md">b-ElevenzSd</h5>
                        </div>
                        <div className="mr-20 flex justify-end text-sm">
                            <p className="text-neutral-600 text-sm">Payroll {monthName} {payrollYear}</p>
                        </div>
                    </header>
                    <main className="w-full h-full flex flex-col">
                        <div className="w-10/12 h-3/12  bg-neutral-100 rounded-[10px] border border-neutral-200 p-2 ml-auto mr-auto text-xs mb-1">
                            <div className="flex flex-col w-full">
                                <div className="flex">
                                    <div className="w-2/6 flex sm:flex-wrap flex-col justify-start ml-7 p-2">
                                        <div className="mb-2">
                                            <label className="text-gray-500 flex flex-col">Name:
                                                <p className="ml-0.5">{name} {firstSurname} {secondSurname}</p></label>
                                        </div>
                                        <div className="mb-2">
                                            <label className="text-gray-500 flex flex-col">Id card number:<p className="ml-0.5">{idCardNumber}</p></label>
                                        </div>
                                        <div className="mb-2 w-full">
                                            <label className="text-gray-500 w-full">Bank Account Number:<p className="ml-0.5">{bankAccountNumber}</p></label>
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-2/6 ml-10 p-2">
                                        <div className="mb-2 flex justify-start">
                                            <label className="text-gray-500 flex flex-col">TSS Number:<p className="ml-0.5">{tssNumber}</p></label>
                                        </div>
                                        <div className="mb-2 flex justify-start">
                                            <label className="text-gray-500 flex flex-col"> Employee number:<p className="ml-0.5">{employeeNumber}</p></label>
                                        </div>
                                        <div className="mb-2 flex justify-start">
                                            <label className="text-gray-500 flex flex-col">Salary level:<p className="ml-0.5">{salaryLevel}</p></label>
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-2/6 ml-1 mr-2 p-2">
                                        <div>
                                            <div className="mb-2 flex justify-star">
                                                <label className="text-gray-500 flex flex-col">Department: <p className="ml-0.5">{department}</p></label>
                                            </div>
                                            <div className="mb-2 flex justify-star">
                                                <label className="text-gray-500 flex flex-col">Job Position:<p className="ml-0.5">{jobPosition}</p></label>
                                            </div>
                                        </div>
                                        <div className="flex mb-2 flex justify-star">
                                            <label className="text-gray-500 flex flex-col">Center Attached:<p className="ml-0.5">{centerAttached}</p>
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-10/12 h-9/12 bg-neutral-100 rounded-[10px] border border-neutral-200  ml-auto mr-auto text-3xl">
                            <table className="w-full h-full bg-neutral-10 rounded-[10px] ml-auto mr-auto" >
                                <thead className="text-black text-[13px] font-extralight border-b-2">
                                    <tr>
                                        <th className="w-3/9 text-center text-gray-500">Payroll concept</th>
                                        <th className="w-3/9 text-center text-gray-500">Incomes</th>
                                        <th className=" w-3/9 text-center text-gray-500">Deductions</th>
                                    </tr>
                                </thead>
                                <tbody className="w-[97px] h-[18px] text-black text-[13px] font-extralight ">
                                    <tr>
                                        <td className="text-center">Base</td>
                                        <td className="text-center">{monthSalary.toLocaleString('de-DE')} Eur.</td>
                                        <td className="text-center">0 Eur.</td>
                                    </tr>
                                    <tr>
                                        <td className="text-center">Bonus</td>
                                        <td className="text-center">{bonus.toLocaleString('de-DE')} Eur.</td>
                                        <td className="text-center">0 Eur.</td>
                                    </tr>
                                    <tr className="border-t-2">
                                        <td className="text-center">IRPF tax  {(irpfTax) * 100}%</td>
                                        <td className="text-center">0 Eur.</td>
                                        <td className="text-center">-{irpfDeductions.toLocaleString('de-DE')} Eur.</td>
                                    </tr>
                                    <tr>
                                        <td className="text-center">SS tax {(ssTax) * 100}% </td>
                                        <td className="text-center">0 Eur.</td>
                                        <td className="text-center">-{ssDeductions.toLocaleString('de-DE')} Eur.</td>
                                    </tr>
                                    <tr className="border-t-2">
                                        <td className="text-center">Total Amount </td>
                                        <td className="text-center">{totalAmountIncomes.toLocaleString('de-DE')} Eur.</td>
                                        <td className="text-center">-{totalAmountDeductions.toLocaleString('de-DE')} Eur.</td>
                                    </tr>
                                    <tr className="border-t-2">
                                        <td className="text-center">Net Salary </td>
                                        <td colSpan="2" className="text-center">{netSalary.toLocaleString('de-DE')} Eur.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-black text-xs font-extralight mt-4 mb-20 flex justify-end mr-28">Human Resources Department, </p>
                    </main>
                </>
            ) : (
                <h4>Loading...</h4>
            )
            }
        </article >
    </article>
}

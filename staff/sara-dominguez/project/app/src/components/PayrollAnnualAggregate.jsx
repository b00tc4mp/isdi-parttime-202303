
// import getMonthNameFromMonthNumber from '../logic/getMonthNameFromValue'
import useAppContext from '../hooks/useAppContext'
import { useEffect, useState } from 'react'
import { utils } from 'com'
const { extractSubFromToken } = utils
import context from '../logic/context'
import retrieveEmployeePayrollData from '../logic/retrieveEmployeePayrollData'


export default function PayrollMonth({ payrollAnnualAggregate }) {
    console.log('Payrollmonth --> open')

    const { alert } = useAppContext()
    const [employee, setEmployee] = useState()

    useEffect(() => {
        async function fetchEmployee() {
            try {
                const employeeId = extractSubFromToken(context.token)

                const employee = await retrieveEmployeePayrollData(employeeId)

                if (employee === undefined || payrollAnnualAggregate === undefined) {
                    throw new Error("Payroll Annual Aggregate not available. For inquiries, please contact the Human Resources department")
                }
                setEmployee(employee)
            } catch (error) {
                alert(error.message)
            }
        }
        fetchEmployee()
    }, [])


    const { name, firstSurname, secondSurname, idCardNumber, employeeNumber, jobPosition, department, centerAttached, tssNumber, salaryLevel, bankAccountNumber } = employee || {}

    const { payrollYear, sumPayrollMonth, lastMonthAggregatedName, sumMonthSalary, sumBonus, sumIrpfTax, sumSsTax, sumIrpfDeductions, sumSsDeductions, sumTotalAmountIncomes, sumTotalAmountDeductions, sumNetSalary } = payrollAnnualAggregate || {}

    return <article className="bg-white rounded-[7px] shadow bg-neutral-200">
        {employee && payrollAnnualAggregate ? (
            <>
                <header className="p-4 flex flex-col">
                    <div>
                        <h5 className="text-neutral-600 text-xl ml-8 mt-3 drop-shadow-md">b-Elevenzsd</h5>
                    </div>
                    <div className="mr-20 flex justify-end text-sm">
                        <p className="text-neutral-600">Annual Payroll Aggregated data up {lastMonthAggregatedName} {payrollYear}</p>
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
                    <div className="w-10/12 h-auto bg-neutral-100 rounded-[10px] p-2 border border-neutral-200 ml-auto mr-auto text-3xl">
                        <table className="w-full h-full bg-neutral-100 rounded-[10px] ml-auto mr-auto" >
                            <thead className="w-[97px] h-[18px] text-black text-[13px] font-extralight border-y-2">
                                <tr>
                                    <th className="w-3/9 text-center text-gray-500">Payroll concept</th>
                                    <th className="w-3/9 text-center text-gray-500">Incomes</th>
                                    <th className="w-3/9 text-center text-gray-500">Deductions</th>
                                </tr>
                            </thead>
                            <tbody className="w-[97px] h-[18px] text-black text-[13px] font-extralight">
                                <tr>
                                    <td className="text-center">Base</td>
                                    <td className="text-center pl-1">{sumMonthSalary.toLocaleString('de-DE')} Eur.</td>
                                    <td className="text-center pl-8">0 Eur.</td>
                                </tr>
                                <tr>
                                    <td className="text-center">Bonus</td>
                                    <td className="text-center pl-3">{sumBonus.toLocaleString('de-DE')} Eur.</td>
                                    <td className="text-center pl-8">0 Eur.</td>
                                </tr>
                                <tr>
                                    <td className="text-center">IRPF tax  {(sumIrpfTax) * 100}%</td>
                                    <td className="text-center pl-7">0 Eur.</td>
                                    <td className="text-center">-{sumIrpfDeductions.toLocaleString('de-DE')} Eur.</td>
                                </tr>
                                <tr>
                                    <td className="text-center">SS tax {(sumSsTax) * 100}% </td>
                                    <td className="text-center pl-7">0 Eur.</td>
                                    <td className="text-center pl-4">-{sumSsDeductions.toLocaleString('de-DE')}Eur.</td>
                                </tr>
                                <tr>
                                    <td className="text-center">Total Amount </td>
                                    <td className="text-center pl-1">{sumTotalAmountIncomes.toLocaleString('de-DE')} Eur.</td>
                                    <td className="text-center pl-1">-{sumTotalAmountDeductions.toLocaleString('de-DE')} Eur.</td>
                                </tr>
                                <tr className="border-y-2">
                                    <td className="text-center">Net Salary </td>
                                    <td colSpan="2" className="text-center pl-2">{sumNetSalary.toLocaleString('de-DE')} Eur.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="text-black text-xs font-extralight mt-4 mb-20 flex justify-end mr-28">Human Resources Department, </p>
                </main>
            </>
        ) : (
            <h4>Loading...</h4>
        )}
    </article>
}
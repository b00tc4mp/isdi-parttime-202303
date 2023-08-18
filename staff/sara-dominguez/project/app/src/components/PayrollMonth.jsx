// import getMonthNameFromMonthNumber from '../logic/getMonthNameFromValue'
import { useEffect, useState } from 'react'
import useAppContext from '../hooks/useAppContext'
import context from '../logic/context'
import retrieveEmployeePayrollData from '../logic/retrieveEmployeePayrollData'
import { utils } from 'com'
const { extractSubFromToken } = utils


export default function PayrollMonth({ payrollMonthRetrieved }) {
    console.log('Payrollmonth --> open')

    const { alert } = useAppContext()
    const [employee, setEmployee] = useState()

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



    const { name, firstSurname, secondSurname, idCardNumber, employeeNumber, jobPosition, department, centerAttached, tssNumber, salaryLevel, bankAccountNumber } = employee || {}

    const { payrollYear, payrollMonth, monthName, monthSalary, bonus, irpfTax, ssTax, irpfDeductions, ssDeductions, totalAmountIncomes, totalAmountDeductions, netSalary } = payrollMonthRetrieved || {}



    return <article className="w-[400px] h-[516px] bg-neutral-100 rounded-[7px] shadow bg-neutral-200" >
        {employee && payrollMonthRetrieved ? (
            <>
                <header className="p-4">
                    <div>
                        <h5 className="text-gray-600">b-ElevenzSd</h5>
                        <p className="text-gray-600">Payroll {monthName} {payrollYear}</p>
                    </div>
                </header>
                <div className="bg-neutral-50 rounded-[10px] border border-black p-4 bg-neutral-100">
                    <div className="flex mb-2">
                        <label className="text-gray-500 text-[12px]">Name:
                            <p>{name} {firstSurname}{secondSurname}</p></label>
                    </div>
                    <div className="flex mb-2">
                        <label className="text-gray-500 text-[12px]">Id card number:<p>{idCardNumber}</p></label>
                    </div>
                    <div className="flex mb-2">
                        <label className="text-gray-500 text-[12px]"> Employee number:<p>{employeeNumber}</p></label>
                    </div>
                    <div className="flex mb-2">
                        <label className="text-gray-500 text-[12px]">Job Position:<p>{jobPosition}</p></label>
                    </div>
                    <div className="flex mb-2">
                        <label className="text-gray-500 text-[12px]">Department: <p>{department}</p></label>
                    </div>
                    <div className="flex mb-2">
                        <label className="text-gray-500 text-[12px]">b-Elevenzsd:<p>{centerAttached}</p>
                        </label>
                    </div>
                    <div className="flex mb-2">
                        <label className="text-gray-500 text-[12px]">TSS Number:<p>{tssNumber}</p></label>
                    </div>
                    <div className="flex mb-2">
                        <label className="text-gray-500 text-[12px]">Salary level: <p>{salaryLevel}</p></label>
                    </div>
                    <div className="flex mb-2">
                        <label className="text-gray-500 text-[12px]">Bank Account Number<p>{bankAccountNumber}</p></label>
                    </div>
                </div>
                <table className="w-[349px] h-[282px] bg-neutral-50 rounded-[10px] border border-black bg-neutral-100" >
                    <thead className="w-[97px] h-[18px] text-black text-[13px] font-extralight">
                        <tr>
                            <th>Payroll concept</th>
                            <th>Incomes</th>
                            <th>Deductions</th>
                        </tr>
                    </thead>
                    <tbody className="w-[97px] h-[18px] text-black text-[13px] font-extralight">
                        <tr>
                            <td>Base</td>
                            <td>{monthSalary} Eur.</td>
                            <td>0 Eur.</td>
                        </tr>
                        <tr>
                            <td>Bonus</td>
                            <td>{bonus} Eur.</td>
                            <td>0 Eur.</td>
                        </tr>
                        <tr>
                            <td>IRPF tax  {(irpfTax) * 100}%</td>
                            <td>0 Eur.</td>
                            <td>-{irpfDeductions} Eur.</td>
                        </tr>
                        <tr>
                            <td>SS tax {(ssTax) * 100}% </td>
                            <td>0 Eur.</td>
                            <td>-{ssDeductions}Eur.</td>
                        </tr>
                        <tr>
                            <td>Total Amount </td>
                            <td>{totalAmountIncomes} Eur.</td>
                            <td>-{totalAmountDeductions} Eur.</td>
                        </tr>
                        <tr>
                            <td>Net Salary </td>
                            <td colSpan="2">{netSalary} Eur.</td>
                        </tr>
                    </tbody>
                </table>
                <p className="w-[97px] h-[18px] text-black text-[13px] font-extralight">RRHH, </p>
                {/* //TODO añadir la firma */}
                <img src="" alt="" />
            </>
        ) : (
            <h4>Loading...</h4>
        )}
    </article>
}

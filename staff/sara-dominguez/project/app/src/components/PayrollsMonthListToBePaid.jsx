import retrieveEmployeePayrollToBePaid from "../logic/retrieveEmployeePayrollToBePaid"
import { useState, useEffect } from 'react'

export default function PayrollsMonthListToBePaid({
    // payrollsMonthList
    payroll: { _id, payrollYear, monthName, netSalary, employee }
}) {
    console.log('rendering PayrollsMonthList')
    // console.log(payrollsMonthList)
    const [employeeRetrieved, setEmployeeRetrieved] = useState(null)

    useEffect(() => {
        async function fetchEmployee() {
            try {
                const employeeRetrieved = await retrieveEmployeePayrollToBePaid(employee)
                if (employee === undefined) {
                    throw new Error("employee not found")
                }
                setEmployeeRetrieved(employeeRetrieved)
            } catch (error) {
                throw new Error(error.message)
            }
        }
        fetchEmployee()
    }, [])

    const { name, firstSurname, secondSurname, avatar, salaryLevel, bankAccountNumber } = employeeRetrieved ?? {}

    return (
        <div className="w-[80%] bg-neutral-50 flex flex-wrap ml-1 mb-1 mr-1 border border-black shadow-sm p-2 rounded-[7px]  items-center justify-end">
            <div key={_id}></div>
            <img className="rounded-[25px]" src={avatar} width="25px" />
            <div className="w-4/12 pl-2 text-xs">{name} {firstSurname} {secondSurname}</div>
            <div className="w-2/12 text-xs">Salary level: {salaryLevel}</div>
            <div className="w-5/12 text-xs">{bankAccountNumber}</div>
            <div className="w-1/12 text-xs">{monthName}</div>
            <div className="w-1/12 text-xs">{payrollYear}</div>
            <div className="w-2/12 text-xs">{netSalary.toLocaleString('de-DE')} Eur</div>
            <div className="w-1/12 text-xs">🗑</div>
        </div>

    )
}





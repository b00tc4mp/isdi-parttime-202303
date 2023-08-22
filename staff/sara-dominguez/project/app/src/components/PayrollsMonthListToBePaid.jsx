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
        <div className="bg-neutral-50 flex mb-2 border border-black shadow p-3 rounded-[7px]">
            <h4 className="flex flex-wrap" key={_id}>
                <img className="rounded-[25px]" src={avatar} width="25px" />
                <div className="w-5/12 pl-2">{name} {firstSurname} {secondSurname}</div>
                <div className="w-2/12 justify-start">Salary level: {salaryLevel}</div>
                <div className="w-4/12 justify-start">{bankAccountNumber}</div>
                <div className="w-1/12 justify-start">{monthName}</div>
                <div className="w-1/12 justify-start">{payrollYear}</div>
                <div className="w-2/12 justify-start">{netSalary.toLocaleString('de-DE')}Eur</div>
                <div className="w-1/12 justify-start">🗑</div>
            </h4>
        </div>
    )
}





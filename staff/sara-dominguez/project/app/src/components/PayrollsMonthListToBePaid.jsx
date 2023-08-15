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
        <h4 key={_id}>
            <img src={avatar} width="25px" /> {name} {firstSurname} {secondSurname} salary Level:{salaryLevel} {bankAccountNumber} {monthName} {payrollYear}  {netSalary}Eur  🗑
        </h4>
    )
}





import retrieveEmployee from "../logic/retrieveEmployee"
import retrieveEmployeePayrollData from "../logic/retrieveEmployeePayrollData"
import { useState, useEffect } from 'react'

export default function PayrollsMonthListToBePaid({ payrollsMonthList }) {
    console.log('rendering PayrollsMonthList')

    console.log(payrollsMonthList)
    const [employeeRetrieved, setEmployeeRetrieved] = useState(null)


    //     payrollsMonthList.map(payroll => {
    //         const { _id, payrollYear, payrollMonth, netSalary, employee } = payroll;
    //         const payrollMonthId = _id;

    //         retrieveEmployeePayrollData(employee)

    //             .then((employeeRetrieved) => {
    //                 setEmployeeRetrieved(employeeRetrieved)
    //             })

    //         const { name, firstSurname, secondSurname, avatar, salaryLevel } = employeeRetrieved


    //         return (
    //             <h4 key={payrollMonthId}>
    //                 <img src={avatar} width="25px" /> {name} {firstSurname} {secondSurname} salary Level:{salaryLevel} {payrollYear} {payrollMonth} {netSalary} .Eur  🗑
    //             </h4>
    //         )
    //     })


    useEffect(() => {
        // Recupera los datos del empleado solo si hay una nómina en la lista
        if (payrollsMonthList.length > 0) {
            retrieveEmployeePayrollData(payrollsMonthList[0].employee)
                .then((employeeRetrieved) => {
                    setEmployeeRetrieved(employeeRetrieved);
                })
                .catch((error) => {
                    console.error('Error fetching employee data:', error);
                });
        }
    }, [payrollsMonthList]);


    return (
        <div>
            {payrollsMonthList.map((payroll) => {
                const { _id, payrollYear, payrollMonth, netSalary, employee } = payroll;
                const payrollMonthId = _id;

                retrieveEmployeePayrollData(payrollsMonthList[0].employee)
                    .then((employeeRetrieved) => {
                        setEmployeeRetrieved(employeeRetrieved);
                    })
                    .catch((error) => {
                        console.error('Error fetching employee data:', error);
                    });


                const { name, firstSurname, secondSurname, avatar, salaryLevel } = employeeRetrieved;

                return (
                    <h4 key={payrollMonthId}>
                        <img src={avatar} width="25px" /> {name} {firstSurname} {secondSurname} salary Level:{salaryLevel} {payrollYear} {payrollMonth} {netSalary} .Eur 🗑
                    </h4>
                );
            })}
        </div>
    )
}


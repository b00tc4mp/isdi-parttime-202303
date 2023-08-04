
import getMonthNameFromMonthNumber from '../logic/getMonthNameFromValue'
import useAppContext from '../hooks/useAppContext'



export default function PayrollMonth({ employee, payrollMonthRetrieved }) {
    console.log('Payrollmonth --> open')

    const { alert } = useAppContext()
    if (employee === undefined || payrollMonthRetrieved === undefined) {
        throw new Error("Payroll not available. For inquiries, please contact the Human Resources department")
    }

    const { name, firstSurname, secondSurname, idCardNumber, employeeNumber, jobPosition, department, centerAttached, tssNumber, salaryLevel, bankAccountNumber } = employee || {}

    const { payrollYear, payrollMonth, monthSalary, bonus, irpfTax, ssTax, irpfDeductions, ssDeductions, totalAmountIncomes, totalAmountDeductions, netSalary } = payrollMonthRetrieved || {}

    const monthName = getMonthNameFromMonthNumber(payrollMonth)



    return <article>
        {employee && payrollMonthRetrieved ? (
            <>
                <header>
                    <div>
                        <h5>b-Elevenzsd</h5>
                        <p>Payroll {monthName} {payrollYear}</p>
                    </div>
                </header>
                <div>
                    <label>Name:<p>{name} {firstSurname}{secondSurname}</p></label>
                    <label>Id card number:<p>{idCardNumber}</p></label>
                    <label> number:<p>{employeeNumber}</p></label>
                    <label>Job Position:<p>{jobPosition}</p></label>
                    <label>Department: <p>{department}</p></label>
                    <label>b-Elevenzsd:<p>{centerAttached}</p>
                    </label>
                    <label>TSS Number:<p>{tssNumber}</p></label>
                    <label>Salary level: <p>{salaryLevel}</p></label>
                    <label>Bank Account Number<p>{bankAccountNumber}</p></label>
                </div>
                <table >
                    <thead>
                        <tr>
                            <th>Payroll concept</th>
                            <th>Incomes</th>
                            <th>Deductions</th>
                        </tr>
                    </thead>
                    <tbody>
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
                <p>RRHH, </p>
                {/* //TODO añadir la firma */}
                <img src="" alt="" />
            </>
        ) : (
            <h4>Loading...</h4>
        )}
    </article>
}

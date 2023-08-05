
// import getMonthNameFromMonthNumber from '../logic/getMonthNameFromValue'
import useAppContext from '../hooks/useAppContext'



export default function PayrollMonth({ employee, payrollAnnualAggregate }) {
    console.log('Payrollmonth --> open')

    const { alert } = useAppContext()
    if (employee === undefined || payrollAnnualAggregate === undefined) {
        throw new Error("Payroll not available. For inquiries, please contact the Human Resources department")
    }

    const { name, firstSurname, secondSurname, idCardNumber, employeeNumber, jobPosition, department, centerAttached, tssNumber, salaryLevel, bankAccountNumber } = employee || {}

    const { payrollYear, sumPayrollMonth, lastMonthAggregatedName, sumMonthSalary, sumBonus, sumIrpfTax, sumSsTax, sumIrpfDeductions, sumSsDeductions, sumTotalAmountIncomes, sumTotalAmountDeductions, sumNetSalary } = payrollAnnualAggregate || {}

    // TODO fecha anual de la agregada y ver como aprovechar el helper para indicar hasta que mes incluye 
    // const monthName = getMonthNameFromMonthNumber(payrollMonth)



    return <article>
        {employee && payrollAnnualAggregate ? (
            <>
                <header>
                    <div>
                        <h5>b-Elevenzsd</h5>
                        <p>Annual Payroll Aggregated data up {lastMonthAggregatedName} {payrollYear}</p>
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
                            <td>{sumMonthSalary} Eur.</td>
                            <td>0 Eur.</td>
                        </tr>
                        <tr>
                            <td>Bonus</td>
                            <td>{sumBonus} Eur.</td>
                            <td>0 Eur.</td>
                        </tr>
                        <tr>
                            <td>IRPF tax  {(sumIrpfTax) * 100}%</td>
                            <td>0 Eur.</td>
                            <td>-{sumIrpfDeductions} Eur.</td>
                        </tr>
                        <tr>
                            <td>SS tax {(sumSsTax) * 100}% </td>
                            <td>0 Eur.</td>
                            <td>-{sumSsDeductions}Eur.</td>
                        </tr>
                        <tr>
                            <td>Total Amount </td>
                            <td>{sumTotalAmountIncomes} Eur.</td>
                            <td>-{sumTotalAmountDeductions} Eur.</td>
                        </tr>
                        <tr>
                            <td>Net Salary </td>
                            <td colSpan="2">{sumNetSalary} Eur.</td>
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

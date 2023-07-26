export default function PayrollMenuModal() {

    return <section className="">
        {/* header del modal */}
        <header>
            <h5>Sara FistName SecondName</h5>
            <h5>CEO</h5>
            <h5>Phone:698349859</h5>
            <h5>Email: sara.b-elevenz@b-elevenzsb.com</h5>
            <h5>22-07-2023</h5>
        </header>

        <main>
            {/* div del menu izquierdo */}
            <div>
                <h4>Personal Information</h4>
                <h5>2023</h5>
                <h5>Annual agregate</h5>
                <h5>2022</h5>
                <h5>Tax certificate</h5>

            </div>

            {/* div del documento que engloba la nomina */}
            <div>
                <header>
                    <div>
                        <h3>b-Elevenzsd</h3>
                        <h4>June 2023</h4>
                    </div>
                    <div>
                        <label>Employee: <h5>Sara FistName SecondName</h5></label>

                        <label>Id Card Number: <h5>37837382X</h5></label>
                        <label>Employee Number: <h5>38495 </h5></label>
                        <label>Position: <h5>CEO</h5></label>
                        <label>Department: <h5>Board of Directors </h5></label>
                        <label>Center Attached: <h5>Barcelona </h5></label>
                        <label>TSS Number: <h5>08/123498-22</h5></label>
                        <label>Payroll Month:  <h5>June</h5></label>
                        <label>Start of Employment <label> </label>data:<h5> 10-05-2004</h5></label>
                        <label> Salary Level: <h5>1</h5></label>
                    </div>
                </header>
                <main>
                    <table>
                        <tr>
                            <td>Payroll Concept</td>
                            <td>Incomes</td>
                            <td> Deduccions</td>

                        </tr>
                        <tr>
                            <td>Base</td>
                            <td>.-Eur</td>
                            <td>.-Eur</td>

                        </tr>
                        <tr>
                            <td>Bonus</td>
                            <td>.-Eur</td>
                            <td>.-Eur</td>
                        </tr>
                        <tr>
                            <td>IRPF tax</td>
                            <td>.-Eur</td>
                            <td>.-Eur</td>
                        </tr>
                        <tr>
                            <td>S.S tax </td>
                            <td>.-Eur</td>
                            <td>.-Eur</td>
                        </tr>
                        <tr>
                            <td>Total Amount</td>
                            <td>.-Eur</td>
                            <td>.-Eur</td>
                        </tr>
                        <tr>
                            <td>Net Salary</td>
                            <td>.-Eur</td>
                            <td>.-Eur</td>
                        </tr>
                    </table>
                    <footer>
                        <h5>RRHH,</h5>
                        <img src="icon" alt="" />
                    </footer>
                </main>
                <footer>
                    <h5 className="">Logout</h5>
                </footer>
            </div>
        </main>
    </section>

}
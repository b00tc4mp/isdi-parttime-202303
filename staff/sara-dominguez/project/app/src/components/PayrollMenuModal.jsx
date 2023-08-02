import Header from "./Header.jsx"

export default function PayrollMenuModal({ employee }) {



    return <section className="" style={{ backgroundColor: '#803080', color: '#ffffff' }}>
        <Header employee={employee}
        />

        <main>
            {/* nombre del menu, a la izquierda */}
            <div >
                <h4>Payroll Menu</h4>
            </div >
            {/* selector para buscar empleado por nivel salarial y escoger el año y mes de la nomina a crear, arriba centrado */}
            <div>
                <h5>2023</h5>
                <h5>Annual Agregate</h5>
                <div className="selectToCreateNewPayrolls">
                    <h5>Check payroll month:</h5>
                    <label>Month</label>
                    <select name="" id="month">
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>
                    <button >Check payroll</button>
                    <h5>2022</h5>
                    <h5>Tax Certificate</h5>
                </div>
            </div>



        </main>
    </section >

}
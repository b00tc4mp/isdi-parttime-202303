
import { useState } from 'react'
import Header from "./Header"
import { Container } from '../library'
import CreatePayrollMonthModal from './CreatePayrollMonthModal'
import ProcessPayrollsMonthPaymentsModal from './ProcessPayrollsMonthPaymentsModal'


export default function ManagePayrollMenuModal({ employee }) {
    console.log("ManagePayrollMenuModal --> open")

    // TODO alert

    const [modal, setModal] = useState(null)


    const handleOpenProcessPayrollsMonthPaymentView = () => {
        setModal('processPayrollsMonthPayment')
    }

    const handleOpenCreateNewPayrollsMonthModal = () => {
        setModal('createPayrollMonthModal')
    }

    const handleCloseModal = () => {
        setModal(null)
    }


    return <Container tag="section">
        <Header employee={employee}
        />
        <main>
            {/* nombre del menu, a la izquierda */}
            <div >
                <h4>Manage Payroll Menu</h4>
            </div >
            <h5 className="createPayrollMonthModal " onClick={handleOpenCreateNewPayrollsMonthModal}>Create payrolls month</h5>
            <h5 onClick={handleOpenProcessPayrollsMonthPaymentView}>Process payrolls month payment</h5>


            {modal === 'createPayrollMonthModal' && < CreatePayrollMonthModal
                employee={employee}
                onPayrollCreated={handleCloseModal}
            />}

            {modal === 'processPayrollsMonthPayment' && < ProcessPayrollsMonthPaymentsModal
                employee={employee}
                onPayrollsMonthPaid={handleCloseModal}
            />}
        </main>
    </Container >
}


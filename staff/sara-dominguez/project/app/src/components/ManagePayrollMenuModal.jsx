
import { useState } from 'react'
import Header from "./Header"
import { Container } from '../library'
import CreatePayrollMonthModal from './CreatePayrollMonthModal'
import ProcessPayrollsMonthPaymentsModal from './ProcessPayrollsMonthPaymentsModal'

export default function ManagePayrollMenuModal({ employee, onManagePayrollMenuModalLogout }) {
    console.log("ManagePayrollMenuModal --> open")

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

    const handleManagePayrollMenuModalLogout = event => {
        event.preventDefault()

        onManagePayrollMenuModalLogout()
    }

    return <Container tag="section">
        <Header employee={employee}
        />
        <main className="overflow-auto h-full flex">
            <div className="flex flex-col sticky top-0">
                <div className="w-2/12 ml-4 pt-2 bg-slate-200 z-10">
                    <h4 className="w-2/12 italic text-ml">Manage Payroll Menu</h4>
                </div >
                <h5 className="createPayrollMonthModal w-9/12 ml-4 mt-20" onClick={handleOpenCreateNewPayrollsMonthModal}>Create payrolls month</h5>
                <h5 className=" w-9/12 ml-4 mt-3" onClick={handleOpenProcessPayrollsMonthPaymentView}>Process payrolls month payment</h5>
            </div>

            {modal === 'createPayrollMonthModal' && < CreatePayrollMonthModal
                employee={employee}
                onPayrollCreated={handleCloseModal}
            />}
            {modal === 'processPayrollsMonthPayment' && < ProcessPayrollsMonthPaymentsModal
                employee={employee}
                onPayrollsMonthPaid={handleCloseModal}
            />}
        </main>
        <footer>
            <h5 className="ml-4 mt-2 pb-0.5 sticky bottom-0 bg-slate-200 z-10 italic" onClick={handleManagePayrollMenuModalLogout}>Logout</h5>
        </footer>
    </Container >
}


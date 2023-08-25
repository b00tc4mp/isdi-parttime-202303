import { useState } from 'react'
import Header from './Header.jsx'
import { Input, InputForm, Container, Button, FormButton } from '../library'
import RegisterEmployeeModal from './RegisterEmployeeModal'
import UpdateEmployeeModal from './UpdateEmployeeModal'
import SearchEmployeesModal from './SearchEmployeesModal'


export default function EmployeeDatabaseMenuModal({ employee, onEmployeeDatabaseMenuModalLogout }) {
    console.log('EmployeeDatabaseMenu --> open')


    const [modal, setModal] = useState(null)


    const handleOpenSearchEmployeesModal = () => {
        setModal('searchEmployeesModal')
    }

    const handleOpenRegisterEmployeeModal = () => {
        setModal('registerEmployeeModal')
    }
    // const handleOpenUpdateEmployeeModal = () => {
    //     setModal('updateEmployeeModal')
    // }

    const handleCloseModal = () => {
        setModal(null)
    }

    function handleEmployeeDatabaseMenuModalLogout(event) {
        event.preventDefault()

        onEmployeeDatabaseMenuModalLogout()
    }


    return <Container tag="section" className="employeeDatabaseMenu">
        <Header employee={employee}
        />
        <main className="h-full flex overflow-auto">
            <div className="w-4/12 sticky top-0 bg-slate-200 z-10 mr-5">
                <div className="w-11/12 ml-4  sticky top-0 bg-slate-200 z-10">
                    <h4 className="w-2/12 italic text-ml">Personal Database Menu</h4>
                </div>
                <div className="w-11/12 flex flex-col mt-20">
                    <h5 className="w-11/12 ml-3 mt-1 text-sm" onClick={handleOpenSearchEmployeesModal}>Search employees</h5>
                </div>
                <div className="w-11/12 flex flex-col mt-3">
                    <h5 className="w-11/12 ml-3 mt-1 text-sm" onClick={handleOpenRegisterEmployeeModal}>Register employee</h5>
                </div>
                {/* <div className="w-11/12 flex flex-col mt-3">
                    <h5 className="w-11/12 ml-3 mt-1 text-sm" onClick={handleOpenUpdateEmployeeModal}>Update employee</h5>
                </div> */}
            </div>

            {modal === 'searchEmployeesModal' && < SearchEmployeesModal
                employee={employee}
            // onEmployeeRegistered={handleCloseModal}
            />}
            {modal === 'registerEmployeeModal' && < RegisterEmployeeModal
                employee={employee}
                onEmployeeRegistered={handleCloseModal}
            />}
            {/* {modal === 'updateEmployeeModal' && < UpdateEmployeeModal
                employee={employee}
                onEmployeeUpdate={handleCloseModal}
            />} */}
        </main>
        <footer className="ml-4 mt-2 pb-0.5 sticky bottom-0 bg-slate-200 z-10 italic">
            <h5 onClick={handleEmployeeDatabaseMenuModalLogout}>Logout</h5>
        </footer>
    </Container >
}

import { useState, useEffect } from 'react'
import PersonalInformationModal from '../components/PersonalInformationModal.jsx'
import PayrollMenuModal from '../components/PayrollMenuModal.jsx'
import ManagePayrollMenuModal from '../components/ManagePayrollMenuModal.jsx'
import EmployeeDatabaseMenuModal from '../components/EmployeeDatabaseMenuModal.jsx'
import retrieveEmployee from '../logic/retrieveEmployee'
import isLoggedIn from '../logic/isLoggedIn'
import logoutEmployee from '../logic/logoutEmployee.js'
import { context } from '../ui'
import useAppContext from '../hooks/useAppContext'
import { Input, Container, Button, Select } from '../library'


export default function Home() {
    console.log('Home --> render')

    const [view, setView] = useState(null)
    const [modal, setModal] = useState(null)
    const [employee, setEmployee] = useState()

    const { alert, navigate } = useAppContext()

    useEffect(() => {
        try {

            retrieveEmployee(context.token)
                .then(employee => setEmployee(employee))
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }, [])

    const handleGoToPersonalInformatioMenu = (event) => {
        event.preventDefault()
        // setEmployee(employee)
        setModal('PersonalInformation')
    }

    const handleGoToPayrollMenu = (event) => {
        event.preventDefault()
        setModal('PayrollMenu')
    }

    const handleGoToManagePayrollMenu = (event) => {
        event.preventDefault()
        setModal('ManagePayrollMenu')
    }

    const handleGoToEmployeeDatabaseMenu = (event) => {
        event.preventDefault()
        setModal('EmployeeDatabaseMenu')
    }

    const handleRefreshEmloyee = () => {
        try {
            retrieveEmployee()
                .then(employee => setEmployee(employee))
                .then(setModal(null))
                .catch(error =>
                    alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }

    const handleCloseModal = () => {
        setModal(null)
    }

    const handleLogOut = () => {
        logoutEmployee()

        navigate('/Login')
    }

    return <div className="h-screen w-screen  bg-neutral-200">
        <div className="home">
            {/* /* sidebar lateral */}
            <header className="home-header">
                <h1 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-amber-500 drop-shadow-md mb-5 ml-4 ">b-ElevenzSd</h1>
                {employee && <>
                    <img src={employee.avatar} className="h-13 w-12 flex-none rounded-full bg-gray-50  ml-12" />
                    <h3 className="mt-10 text-l font-bold leading-9 tracking-tight text-amber-500 drop-shadow-md mb-4 ml-4">Welcome, {employee.name}!</h3>
                </>}
            </header>
            <main className="">
                <p className="personalInformation-menu"><a href="" className="personalInformation" onClick={handleGoToPersonalInformatioMenu}>Personal Information</a></p>
                <p className="payroll-menu" onClick={handleGoToPayrollMenu}><a href="" className="payrollMenu" >Payroll menu</a></p>
                <p className="manage-payroll-menu" onClick={handleGoToManagePayrollMenu}><a href="" className="ManagePayrollMenu" >Manage Payroll menu</a></p>
                <p className="employeeDatabase-menu" onClick={handleGoToEmployeeDatabaseMenu}><a href="" className="employeeDatabaseMenu" >Employee Database menu</a></p>

                {modal === 'PersonalInformation' && < PersonalInformationModal
                    employee={employee}
                    onEmployeeAvatarUpdated={handleRefreshEmloyee}
                    onEmployeePasswordUpdated={handleCloseModal}
                    onEmployeeAdressUpdated={handleCloseModal}
                    onEmployeeBankAccountNumberUpdated={handleCloseModal}
                    onPersonalInformationModalLogout={handleCloseModal}
                />}
                {modal === 'PayrollMenu' && < PayrollMenuModal
                    employee={employee}
                />}
                {modal === 'ManagePayrollMenu' && < ManagePayrollMenuModal
                    employee={employee}
                />}
                {modal === 'EmployeeDatabaseMenu' && < EmployeeDatabaseMenuModal
                    employee={employee}
                    onEmployeeRegistered={handleCloseModal} />}
            </main>
            <footer>
                <h5 className="mt-10 text-l font-bold leading-9 tracking-tight text-amber-500 drop-shadow-md mb-5 ml-4" onClick={handleLogOut}>Logout</h5>
            </footer>
        </div>
    </div>
}
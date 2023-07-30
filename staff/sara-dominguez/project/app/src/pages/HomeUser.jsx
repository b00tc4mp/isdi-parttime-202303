import { useState, useEffect } from 'react'
import PersonalInformationModal from '../components/PersonalInformationModal.jsx'
import ManagePayrollMenuModal from '../components/ManagePayrollMenuModal.jsx'
import EmployeeDatabaseMenuModal from '../components/EmployeeDatabaseMenuModal.jsx'
import retrieveEmployee from '../logic/retrieveEmployee'
import isLoggedIn from '../logic/isLoggedIn'
import logoutEmployee from '../logic/logoutEmployee.js'
import { context } from '../ui'
import useAppContext from '../hooks/useAppContext'


export default function Home() {
    console.log('Home --> render')

    const [view, setView] = useState(null)
    const [modal, setModal] = useState(null)
    const [employee, setEmployee] = useState()

    const { navigate } = useAppContext()

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
        setModal('ManagePayrollMenu')
    }

    const handleGoToEmployeeDatabaseMenu = (event) => {
        event.preventDefault()
        setModal('EmployeeDatabaseMenu')
    }

    const handleRefreshEmloyee = () => {
        try {
            retrieveEmployee(isLoggedIn())
                .then(employee => setEmployee(employee))
                .catch(error =>
                    alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }

    const handleCloseModal = () => setModal(null)


    const handleLogOut = () => {
        logoutEmployee()

        navigate('/Login')
    }


    return <div>
        <div className="home">
            {/* /* sidebar lateral */}
            <header className="home-header">
                <h1 className="">b-Elevenzdb</h1>
                {employee && <>
                    <img src={employee.avatar} width="100px" />
                    <h3 className="">Welcome, {employee.name}!</h3>
                    <h5 className="">Go to company profile</h5>
                </>}

            </header>
            <main>
                <p className="personalInformation-menu"><a href="" className="personalInformation" onClick={handleGoToPersonalInformatioMenu}>Personal information</a></p>
                <p className="manage-payroll-menu" onClick={handleGoToPayrollMenu}><a href="" className="ManagePayrollMenu" >Manage Payroll menu</a></p>
                <p className="employeeDatabase-menu" onClick={handleGoToEmployeeDatabaseMenu}><a href="" className="employeeDatabaseMenu" >Employee Database Menu</a></p>

                {modal === 'PersonalInformation' && < PersonalInformationModal
                    onPersonalInformationModalLogout={handleCloseModal}
                    employee={employee}
                />}
                {modal === 'ManagePayrollMenu' && < ManagePayrollMenuModal />}
                {modal === 'EmployeeDatabaseMenu' && < EmployeeDatabaseMenuModal onEmployeeRegistered={handleCloseModal} />}
                {view === 'PayrollMenuUpdateAvatar' && < PersonalInformationModal onEmployeeAvatarUpdated={handleRefreshEmloyee} />}
                {view === 'PayrollMenuUpdatePassword' && < PersonalInformationModal onEmployeePasswordUpdated={handleCloseModal} />}
                {view === 'PayrollMenuUpdateAdress' && < PersonalInformationModal onEmployeeAdressUpdated={handleCloseModal} />}
                {view === 'PayrollMenuUpdateBankAccountNumber' && < PersonalInformationModal onEmployeeBankAccountNumberUpdated={handleRefreshEmloyee} />}


            </main>

            <footer>
                <h5 className="" onClick={handleLogOut}>Logout</h5>
            </footer>
        </div>

    </div>

}
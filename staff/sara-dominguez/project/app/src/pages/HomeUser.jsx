import { useState, useEffect } from 'react'
import PersonalInformationModal from '../components/PersonalInformationModal.jsx'
import PayrollMenuModal from '../components/PayrollMenuModal.jsx'
import ManagePayrollMenuModal from '../components/ManagePayrollMenuModal.jsx'
import EmployeeDatabaseMenuModal from '../components/EmployeeDatabaseMenuModal.jsx'
import ChartMenuModal from '../components/ChartMenuModal.jsx'
import UpdatePasswordModal from '../components/UpdatePasswordModal.jsx'
import retrieveEmployeeLogged from '../logic/retrieveEmployeeLogged'
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

            retrieveEmployeeLogged(context.token)
                .then(employee => {
                    setEmployee(employee)
                    if (employee.employeePasswordToChange === true) {
                        setModal('UpdatePassword')
                    }
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }, [])

    const handleGoToPersonalInformatioMenu = (event) => {
        event.preventDefault()
        setModal('PersonalInformation')
    }

    const handleGoToPayrollMenu = (event) => {
        event.preventDefault()
        setModal('PayrollMenu')
    }

    const handleGoToChartMenu = (event) => {
        event.preventDefault()
        setModal('ChartMenu')
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
            retrieveEmployeeLogged()
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

    return <div className=" bg-white">
        <div className="home">
            {/* /* sidebar lateral */}
            <header className="home-header">
                <h1 className="italic text-2xl font-bold leading-9 tracking-tight text-amber-500 drop-shadow-md  ml-4 mt-2 ">b-ElevenzSd</h1>
            </header>
            <main className="flex ml-4">
                <div className="w-2/12">
                    <div className="">
                        {employee && <>
                            <img src={employee.avatar} className="h-16 w-15 flex-none rounded-full bg-gray-50  ml-7 mt-24" />
                            <h3 className="italic mt-3 text-base font-bold leading-9 tracking-tight text-amber-500 drop-shadow-md mb-3 mt-0">Welcome, {employee.name} !</h3>
                        </>}
                    </div>
                    <div className="mt-20 mr-2">
                        <p className="personalInformation-menu mb-4"><a href="" className="personalInformation" onClick={handleGoToPersonalInformatioMenu}>Personal Information</a></p>
                        <p className="payroll-menu mb-4" onClick={handleGoToPayrollMenu}><a href="" className="payrollMenu" >Payroll menu</a></p>

                        <p className="payroll-menu mb-4" onClick={handleGoToChartMenu}><a href="" className="payrollMenu" >Chart menu</a></p>

                        {employee && employee.roll === "Admin" && (
                            <>
                                <p className="manage-payroll-menu mb-4" onClick={handleGoToManagePayrollMenu}><a href="" className="ManagePayrollMenu" >Manage Payroll menu</a></p>
                                <p className="employeeDatabase-menu w-5/6" onClick={handleGoToEmployeeDatabaseMenu}><a href="" className="employeeDatabaseMenu" >Employee Database menu</a></p>
                            </>
                        )}
                    </div>
                    <h5 className=" text-l font-bold leading-9 tracking-tight text-amber-500 drop-shadow-md mt-20 mb-10 cursor-pointer" onClick={handleLogOut}>Logout</h5>
                </div>
                {modal === 'PersonalInformation' && < PersonalInformationModal
                    employee={employee}
                    onEmployeeAvatarUpdated={handleRefreshEmloyee}
                    onEmployeePasswordUpdated={handleCloseModal}
                    onEmployeeAddressUpdated={handleCloseModal}
                    onEmployeeBankAccountNumberUpdated={handleCloseModal}
                    onPersonalInformationModalLogout={handleCloseModal}
                    onClick={
                        modal === 'UpdatePassword'
                            ? (event) => event.preventDefault()
                            : handleGoToPersonalInformatioMenu
                    }

                />}
                {modal === 'PayrollMenu' && < PayrollMenuModal
                    employee={employee}
                    onPayrollMenuModalLogout={handleCloseModal}
                />}
                {modal === 'ManagePayrollMenu' && < ManagePayrollMenuModal
                    employee={employee}
                    onManagePayrollMenuModalLogout={handleCloseModal}
                />}
                {modal === 'EmployeeDatabaseMenu' && < EmployeeDatabaseMenuModal
                    employee={employee}
                    onEmployeeRegistered={handleCloseModal}
                    onEmployeeDatabaseMenuModalLogout={handleCloseModal} />}

                {modal === 'ChartMenu' && < ChartMenuModal
                    employee={employee}
                    onCloseEmployeeChartMenuModal={handleCloseModal}
                />}
                {modal === 'UpdatePassword' && < UpdatePasswordModal
                    employee={employee}
                    onEmployeePasswordUpdated={handleCloseModal}
                />}
            </main>
            <footer>
                {/* <h5 className=" text-l font-bold leading-9 tracking-tight text-amber-500 drop-shadow-md mt-10 mb-10 ml-4" onClick={handleLogOut}>Logout</h5> */}
            </footer>
        </div>
    </div>
}
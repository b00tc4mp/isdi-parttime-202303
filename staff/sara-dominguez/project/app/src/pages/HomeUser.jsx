import { useState, useEffect } from 'react'
import PersonalInformationModal from '../components/PersonalInformationModal.jsx'
import PayrollMenuModal from '../components/PayrollMenuModal.jsx'
import retrieveEmployee from '../logic/retrieveEmployee'
import isLoggedIn from '../logic/isLoggedIn'
import { context } from '../ui'






export default function Home() {
    const [view, setView] = useState(null)
    const [modal, setModal] = useState(null)
    const [employee, setEmployee] = useState()

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

        setModal('PersonalInformation')
    }


    const handleGoToPayrollMenu = (event) => {
        event.preventDefault()

        setModal('PayrollMenu')
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
                <p className="payroll-Menu" onClick={handleGoToPayrollMenu}><a href="" className="payrollMenu" >Payroll menu</a></p>
                <p className="notifications-menu"><a href="" className="notifications" >Notifications</a></p>

                {modal === 'PersonalInformation' && < PersonalInformationModal />}
                {modal === 'PayrollMenu' && < PayrollMenuModal />}
                {view === 'PayrollMenuUpdateAvatar' && < PersonalInformationModal onEmployeeAvatarUpdated={handleRefreshEmloyee} />}
                {view === 'PayrollMenuUpdatePassword' && < PersonalInformationModal onEmployeePasswordUpdated={handleRefreshEmloyee} />}
                {view === 'PayrollMenuUpdateAdress' && < PersonalInformationModal onEmployeeAdressUpdated={handleRefreshEmloyee} />}
                {view === 'PayrollMenuUpdateBankAccountNumber' && < PersonalInformationModal onEmployeeBankAccountNumberUpdated={handleRefreshEmloyee} />}

            </main>

            <footer>
                <h5 className="">Logout</h5>
            </footer>
        </div>

    </div>

}
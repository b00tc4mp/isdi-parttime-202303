import { useState, useEffect } from 'react'
import updateEmployeeAvatar from '../logic/updateEmployeeAvatar'
import updateEmployeePassword from '../logic/updateEmployeePassword'
import updateEmployeeAdress from '../logic/updateEmployeeAdress'
import updateEmployeeBankAccountNumber from '../logic/updateEmployeeBankAccountNumber'
import useAppContext from '../hooks/useAppContext'
import { utils } from 'com'
import { context } from '../ui'
import isCurrentEmployee from '../logic/isCurrentEmployee'
import retrieveEmployee from '../logic/retrieveEmployee'
import Header from './Header.jsx'

const { extractSubFromToken } = utils


export default function PersonalInformationModal({ employee, onEmployeeAvatarUpdated, onEmployeePasswordUpdated, onEmployeeBankAccountNumberUpdated, onEmployeeAdressUpdated, onPersonalInformationModalLogout }) {
    console.log('PersonalInformationModal --> open')

    const { alert } = useAppContext()
    // const [employee, setEmployee] = useState()

    useEffect(() => {
        try {

            retrieveEmployee(context.token)
                // .then(setEmployee)
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }, [])

    const handleUpdateAvatar = event => {
        event.preventDefault()

        const url = event.target.url.value

        try {

            updateEmployeeAvatar(url)

                .then(onEmployeeAvatarUpdated)

                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)

        }
    }
    const handleUpdatePassword = event => {
        event.preventDefault()

        const employeePassword = event.target.employeePassword.value
        const employeeNewPassword = event.target.employeeNewPassword.value
        const employeeNewPasswordConfirm = event.target.employeeNewPasswordConfirm.value

        try {

            updateEmployeePassword(employeePassword, employeeNewPassword, employeeNewPasswordConfirm)

                // .then(() => {

                //     onEmployeePasswordUpdated()
                // })
                .then(onEmployeePasswordUpdated)
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)

        }
    }

    const handleUpdateAdress = event => {
        event.preventDefault()

        const employeeStreet = event.target.employeeStreet.value
        const employeePostalCode = event.target.employeePostalCode.value
        const employeeCity = event.target.employeeCity.value
        const employeeCountry = event.target.employeeCountry.value

        try {

            const employeeNewAdress = `${employeeStreet}` + ' ' + `${employeePostalCode}` + ' ' + `${employeeCity}` + ' ' + `${employeeCountry}`

            updateEmployeeAdress(employeeNewAdress)

                .then(() => {

                    onEmployeeAdressUpdated()
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }

    const handleUpdateBankAccountNumber = event => {
        event.preventDefault()

        const bankAccountNumber = event.target.bankAccountNumber.value

        try {
            updateEmployeeBankAccountNumber(bankAccountNumber)

                // .then(() => {

                //     onEmployeeBankAccountNumberUpdated()
                // })

                .then(onEmployeeBankAccountNumberUpdated)
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }

    function handlePersonalInformationModalLogout(event) {
        event.preventDefault()

        onPersonalInformationModalLogout()
    }





    return <section className="personalInformation" style={{ backgroundColor: '#FFC0CB', color: '#ffffff' }}>

        <Header employee={employee}
        />

        <main>
            <h4>Personal Information</h4>
            <div>
                <h5>Update your avatar </h5>
                <form className="personalInformation-avatar-form" onSubmit={handleUpdateAvatar}>
                    <input className="input" type="url" name="url" />
                    <button className="button" type="submit">Update</button>
                </form>
            </div>
            <h5>Update your password</h5>
            <form className="personalInformation-password-form" onSubmit={handleUpdatePassword}>
                <input className="input" type="password" name="employeePassword" placeholder="Password" />
                <input className="input" type="password" name="employeeNewPassword" placeholder="New password" />
                <input className="input" type="password" name="employeeNewPasswordConfirm" placeholder="New password confirmation" />
                <button className="button" type="submit">Update</button>
            </form>
            <h5>Update your adress</h5>
            <form className="personalInformation-adress-form" onSubmit={handleUpdateAdress} >
                <input className="input" type="text" name="employeeStreet" placeholder="Street" />
                <input className="input" type="text" name="employeePostalCode" placeholder="Postal code" />
                <input className="input" type="text" name="employeeCity" placeholder="City " />
                <input className="input" type="text" name="employeeCountry" placeholder="Country" />
                <button className="button" type="submit">Update</button>
            </form>
            <h5>Update your bank account</h5>
            <form className="personalInformation-bankAccountNumber-form" name="bankAccountNumber" onSubmit={handleUpdateBankAccountNumber} >
                <input className="input" type="text" name="bankAccountNumber" placeholder="Bank Account Number" />
                <button className="button" type="submit">Update</button>
            </form>
        </main>
        <footer>
            <h5 className="" onClick={handlePersonalInformationModalLogout}>Logout</h5>
        </footer>

    </section>
}

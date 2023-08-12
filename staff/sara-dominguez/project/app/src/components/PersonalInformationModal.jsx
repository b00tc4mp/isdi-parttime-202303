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
import { Input, Container, Button } from '../library'

const { extractSubFromToken } = utils


export default function PersonalInformationModal({ employee, onEmployeeAvatarUpdated, onEmployeePasswordUpdated, onEmployeeBankAccountNumberUpdated, onEmployeeAdressUpdated, onPersonalInformationModalLogout }) {
    console.log('PersonalInformationModal --> open')


    const { alert, navigate } = useAppContext()


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
            updateEmployeeAdress(employeeStreet, employeePostalCode, employeeCity, employeeCountry)
                .then(onEmployeeAdressUpdated)

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





    return <Container tag="section" className="personalInformation">
        {/* <Header employee={employee} */}
        <Header
        />

        <main>
            <h4>Personal Information</h4>
            <div>
                <h5>Update your avatar </h5>
                <form className="personalInformation-avatar-form" onSubmit={handleUpdateAvatar}>
                    <Input className="input w-2/4" type="url" name="url" placeholder="URL" />
                    <Button className="button w-1/6" type="submit">Update</Button>
                </form>
            </div>
            <h5>Update your password</h5>
            <form className="personalInformation-password-form" onSubmit={handleUpdatePassword}>
                <Input className="input w-2/4" type="password" name="employeePassword" placeholder="Password" />
                <Input className="input w-2/4" type="password" name="employeeNewPassword" placeholder="New password" />
                <Input className="input w-2/4" type="password" name="employeeNewPasswordConfirm" placeholder="New password confirmation" />
                <Button className="button w-1/6" type="submit">Update</Button>
            </form>
            <h5>Update your adress</h5>
            <form className="personalInformation-adress-form" onSubmit={handleUpdateAdress} >
                <Input className="input w-2/4" type="text" name="employeeStreet" placeholder="Street" />
                <Input className="input w-2/4" type="text" name="employeePostalCode" placeholder="Postal code" />
                <Input className="input w-2/4" type="text" name="employeeCity" placeholder="City " />
                <Input className="input w-2/4" type="text" name="employeeCountry" placeholder="Country" />
                <Button className="button w-1/6" type="submit">Update</Button>
            </form>
            <h5>Update your bank account</h5>
            <form className="personalInformation-bankAccountNumber-form" name="bankAccountNumber" onSubmit={handleUpdateBankAccountNumber} >
                <Input className="input w-2/4" type="text" name="bankAccountNumber" placeholder="Bank Account Number" />
                <Button className="button w-1/6" type="submit">Update</Button>
            </form>
        </main>
        <footer>
            <h5 className="" onClick={handlePersonalInformationModalLogout}>Logout</h5>
        </footer>
    </Container >
}

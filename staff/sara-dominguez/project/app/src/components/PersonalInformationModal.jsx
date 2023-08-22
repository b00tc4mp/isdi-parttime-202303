import { useState, useEffect } from 'react'
import updateEmployeeAvatar from '../logic/updateEmployeeAvatar'
import updateEmployeePassword from '../logic/updateEmployeePassword'
import updateEmployeeAddress from '../logic/updateEmployeeAddress'
import updateEmployeeBankAccountNumber from '../logic/updateEmployeeBankAccountNumber'
import useAppContext from '../hooks/useAppContext'
import { utils } from 'com'
import { context } from '../ui'
import isCurrentEmployee from '../logic/isCurrentEmployee'
import retrieveEmployee from '../logic/retrieveEmployee'
import Header from './Header.jsx'
import { Input, Container, Button, FormButton } from '../library'

const { extractSubFromToken } = utils


export default function PersonalInformationModal({ employee, onEmployeeAvatarUpdated, onEmployeePasswordUpdated, onEmployeeBankAccountNumberUpdated, onEmployeeAddressUpdated, onPersonalInformationModalLogout }) {
    console.log('PersonalInformationModal --> open')

    const { alert } = useAppContext()

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

    const handleupdateAddress = event => {
        event.preventDefault()

        const employeeStreet = event.target.employeeStreet.value
        const employeePostalCode = event.target.employeePostalCode.value
        const employeeCity = event.target.employeeCity.value
        const employeeCountry = event.target.employeeCountry.value

        try {
            updateEmployeeAddress(employeeStreet, employeePostalCode, employeeCity, employeeCountry)
                .then(onEmployeeAddressUpdated)
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
        <main className="overflow-auto h-full">
            <div className="w-2/12 ml-4 pt-2 sticky top-0 bg-slate-200 z-10">
                <h4 className="w-2/12 italic text-ml">Personal Information</h4>
            </div>
            <div className="pl-52 pr-20 space-y-5 overflow">
                <div className="">
                    <div className="mb-1">
                        <h5 className="mb-1">Update avatar </h5>
                    </div>
                    <form className="personalInformation-avatar-form" onSubmit={handleUpdateAvatar}>
                        <div className="mb-1">
                            <Input type="url" name="url" placeholder="URL" />
                        </div>
                        <div className="mb-0.5">
                            <FormButton type="submit">Update</FormButton>
                        </div>
                    </form>
                </div>
                <div className="mt-2">
                    <h5 className="mb-1">Update password</h5>
                    <form className="personalInformation-password-form" onSubmit={handleUpdatePassword}>
                        <div className="mb-0.5">
                            <Input type="password" name="employeePassword" placeholder="Password" />
                        </div>
                        <div className="mb-0.5">
                            <Input type="password" name="employeeNewPassword" placeholder="New password" />
                        </div>
                        <div className="mb-0.5">
                            <Input type="password" name="employeeNewPasswordConfirm" placeholder="New password confirmation" />
                        </div>
                        <div className="mb-0.5">
                            <FormButton type="submit">Update</FormButton>
                        </div>
                    </form>
                </div>
                <div className="mt-2">
                    <h5 className="mb-1">Update address</h5>
                    <form className="personalInformation-address-form" onSubmit={handleupdateAddress} >
                        <div className="mb-0.5">
                            <Input type="text" name="employeeStreet" placeholder="Street number  floor door" />
                        </div>
                        <div className="mb-0.5">
                            <Input type="text" name="employeePostalCode" placeholder="Postal code" />
                        </div>
                        <div className="mb-0.5">
                            <Input type="text" name="employeeCity" placeholder="City (Province) " />
                        </div>
                        <div className="mb-0.5">
                            <Input type="text" name="employeeCountry" placeholder="Country" />
                        </div>
                        <div className="mb-0.5">
                            <FormButton type="submit">Update</FormButton>
                        </div>
                    </form>
                </div>
                <div>
                    <div className="mb-0.5">
                        <h5 className="mb-1">Update bank account</h5>
                    </div>
                    <form className="personalInformation-bankAccountNumber-form" name="bankAccountNumber" onSubmit={handleUpdateBankAccountNumber} >
                        <div className="mb-0.5">
                            <Input type="text" name="bankAccountNumber" placeholder="Bank Account Number" />
                        </div>
                        <div className="mb-10">
                            <FormButton type="submit">Update</FormButton>
                        </div>
                    </form>
                </div>
            </div>
        </main>
        <footer className="ml-4 mt-2 pb-0.5 sticky bottom-0 bg-slate-200 z-10 italic">
            <h5 onClick={handlePersonalInformationModalLogout}>Logout</h5>
        </footer>
    </Container >
}

// import { useState, useEffect } from 'react'
import useAppContext from '../hooks/useAppContext'
// import { utils } from 'com'
// import { context } from '../ui'
import Header from './Header.jsx'

import registerEmployee from '../logic/registerEmployee'



export default function EmployeeDatabaseMenuModal({ employee, onEmployeeRegistered }) {
    console.log('EmployeeDatabaseMenu --> open')

    const { alert } = useAppContext()

    const handleRegisterEmployee = (event) => {
        event.preventDefault()

        //  PERSONAL DATA
        const name = event.target.name.value
        const firstSurname = event.target.firstSurname.value
        const secondSurname = event.target.secondSurname.value
        // const birthDate = event.target.birthDate.value
        const idCardNumber = event.target.idCardNumber.value
        const tssNumber = event.target.tssNumber.value
        const adress = event.target.adress.value
        const personalPhoneNumber = event.target.personalPhoneNumber.value
        const bankAccountNumber = event.target.bankAccountNumber.value
        const avatar = event.target.avatar.value

        //  PROFESIONAL DATA
        const employeeNumber = parseInt(event.target.employeeNumber.value)
        // const startOfEmploymentData = event.target.startOfEmploymentData.value
        // const endOfEmploymentData = event.target.endOfEmploymentData.value
        // const lengthOfEmployment = event.target.lengthOfEmployment.value
        const typeOfContract = event.target.typeOfContract.value
        const jobPosition = event.target.jobPosition.value
        const department = event.target.department.value
        const salaryLevel = event.target.salaryLevel.value
        const centerAttached = event.target.centerAttached.value
        // const superiorHierachicalManager = event.target.superiorHierachicalManager.value

        //  PERMISSIONS AREA
        const roll = event.target.roll.value
        const professionalPhoneNumber = event.target.professionalPhoneNumber.value
        const professionalEmail = event.target.professionalEmail.value
        const accessPermissions = event.target.accessPermissions.value
        const employeePasssword = event.target.employeePasssword.value



        try {
            registerEmployee(name,
                firstSurname,
                secondSurname,
                // birthDate,
                idCardNumber,
                tssNumber,
                adress,
                personalPhoneNumber,
                bankAccountNumber,
                avatar,
                employeeNumber,
                // startOfEmploymentData,
                // endOfEmploymentData,
                // lengthOfEmployment,
                typeOfContract,
                jobPosition,
                department,
                salaryLevel,
                centerAttached,
                // superiorHierachicalManager,
                roll,
                professionalPhoneNumber,
                professionalEmail,
                accessPermissions,
                employeePasssword)

                .then(() => {

                    onEmployeeRegistered()
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }

    // function handleEmployeeDatabaseMenuLogout(event) {
    //     event.preventDefault()

    //     onEmployeeDatabaseMenuLogout()
    // }



    return <section className="personalInformation" style={{ backgroundColor: '#C0C0FF', color: '#ffffff' }}>
        <div>
            <Header employee={employee}
            />

            <main>
                <div>
                    <h4>Personal Database Menu</h4>
                </div>
                <h5>Register new employee</h5>
                <div>
                    <form className="" onSubmit={handleRegisterEmployee}>
                        {/* <h6>Personal Data</h6> */}
                        <label>Name: <input className="input" type="text" name="name" /></label>
                        <label>First surname: <input className="input" type="text" name="firstSurname" /></label>
                        <label>Second surname: <input className="input" type="text" name="secondSurname" /></label>
                        {/* <label>Birthdate: <input className="input" type="date" name="birthDate" /></label> */}
                        <label>Id Card number:<input className="input" type="text" name="idCardNumber" /></label>
                        <label>TSS number:<input className="input" type="text" name="tssNumber" /></label>
                        <label>Adress:<input className="input" type="text" name="adress" /></label>
                        <label>Personal phone number:<input className="input" type="number" name="personalPhoneNumber" /></label>
                        <label>Bank account number:<input className="input" type="text" name="bankAccountNumber" /></label>
                        <label>Avatar:<input className="input" type="url" name="avatar" /></label>
                        <h6>Professional data</h6>
                        <label>Employee number:<input className="input" type="number" name="employeeNumber" /></label>
                        {/* <label>Start of employment data:<input className="input" type="date" name="startOfEmploymentData" /></label>
                        <label>End of employment data:<input className="input" type="date" name="endOfEmploymentData" /></label>
                        <label>Length of employment:<input className="input" type="number" name="lengthOfEmployment" /></label> */}
                        <label>Type of contract:<input className="input" type="text" name="typeOfContract" /></label>
                        <label>Job position:<input className="input" type="text" name="jobPosition" /></label>
                        <label>Department:<input className="input" type="text" name="department" /></label>
                        <label>Salary level:<input className="input" type="number" name="salaryLevel" /></label>
                        <label>Center attached:<input className="input" type="text" name="centerAttached" /></label>
                        {/* <label>Superior hierarchical manager:<input className="input" type="text" name="superiorHierachicalManager" /></label> */}
                        <h6>Permissions Area</h6>
                        <label>Roll:<input className="input" type="text" name="roll" /></label>
                        <label>Professional phone number:<input className="input" type="text" name="professionalPhoneNumber" /></label>
                        <label>Professional email:<input className="input" type="email" name="professionalEmail" /></label>
                        <label>Access permissions<input className="input" type="text" name="accessPermissions" /></label>
                        <label>Employee password<input className="input" type="text" name="employeePasssword" /></label>

                        <button className="button" type="submit" >Register</button>
                    </form>
                </div>

            </main>
            <footer>
                <h5 className="" >Logout</h5>
            </footer>
        </div>
    </section >
}

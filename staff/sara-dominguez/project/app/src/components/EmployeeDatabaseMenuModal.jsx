// import { useState, useEffect } from 'react'
import useAppContext from '../hooks/useAppContext'
// import { utils } from 'com'
// import { context } from '../ui'
import Header from './Header.jsx'
import { Input, Container, Button } from '../library'
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



    return <Container tag="section" className="personalInformation">
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
                        <label>Name: <Input className="input w-1/4" type="text" name="name" /></label>
                        <label>First surname: <Input className="input w-1/4" type="text" name="firstSurname" /></label>
                        <label>Second surname: <Input className="input w-1/4" type="text" name="secondSurname" /></label>
                        {/* <label>Birthdate: <input className="input w-1/4" type="date" name="birthDate" /></label> */}
                        <label>Id Card number:<Input className="input w-1/4" type="text" name="idCardNumber" /></label>
                        <label>TSS number:<Input className="input w-1/4" type="text" name="tssNumber" /></label>
                        <label>Adress:<Input className="input w-1/4" type="text" name="adress" /></label>
                        <label>Personal phone number:<Input className="input w-1/4" type="number" name="personalPhoneNumber" /></label>
                        <label>Bank account number:<Input className="input w-1/4" type="text" name="bankAccountNumber" /></label>
                        <label>Avatar:<Input className="input w-1/4" type="url" name="avatar" /></label>
                        <h6>Professional data</h6>
                        <label>Employee number:<Input className="input w-1/4" type="number" name="employeeNumber" /></label>
                        {/* <label>Start of employment data:<input className="input" type="date" name="startOfEmploymentData" /></label>
                        <label>End of employment data:<input className="input" type="date" name="endOfEmploymentData" /></label>
                        <label>Length of employment:<input className="input" type="number" name="lengthOfEmployment" /></label> */}
                        <label>Type of contract:<Input className="input w-1/4" type="text" name="typeOfContract" /></label>
                        <label>Job position:<Input className="input w-1/4" type="text" name="jobPosition" /></label>
                        <label>Department:<Input className="input w-1/4" type="text" name="department" /></label>
                        <label>Salary level:<Input className="input w-1/4" type="number" name="salaryLevel" /></label>
                        <label>Center attached:<Input className="input w-1/4" type="text" name="centerAttached" /></label>
                        {/* <label>Superior hierarchical manager:<input className="input" type="text" name="superiorHierachicalManager" /></label> */}
                        <h6>Permissions Area</h6>
                        <label>Roll:<Input className="input w-1/4" type="text" name="roll" /></label>
                        <label>Professional phone number:<Input className="input w-1/4" type="text" name="professionalPhoneNumber" /></label>
                        <label>Professional email:<Input className="input w-1/4" type="email" name="professionalEmail" /></label>
                        <label>Access permissions<Input className="input w-1/4" type="text" name="accessPermissions" /></label>
                        <label>Employee password<Input className="input w-1/4" type="text" name="employeePasssword" /></label>

                        <Button className="button w-1/6" type="submit" >Register</Button>
                    </form>
                </div>

            </main>
            <footer>
                <h5 className="" >Logout</h5>
            </footer>
        </div>
    </Container >
}

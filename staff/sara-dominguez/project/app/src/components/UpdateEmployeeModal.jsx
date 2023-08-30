import useAppContext from '../hooks/useAppContext'
import Header from './Header.jsx'
import { Input, InputForm, Container, Button, FormButton } from '../library'
import updateEmployee from '../logic/updateEmployee'
import { useState, useEffect } from 'react'
import retrieveEmployee from '../logic/retrieveEmployee'


export default function RegisterEmployeeModal({ employeeId, onUpdateEmployeeModalClose, onEmployeeUpdated }) {
    console.log('EmployeeDatabaseMenu --> open')

    const { alert } = useAppContext()
    const [modal, setModal] = useState(null)
    const [employee, setEmployee] = useState(null)


    useEffect(() => {
        async function fetchEmployee() {
            const employee = await retrieveEmployee(employeeId)
            if (employee === undefined) {
                throw new Error("employee not found")
            }
            setEmployee(employee)

        }
        fetchEmployee()
    }, [])

    function handleUpdateEmployeeModalClose(event) {
        event.preventDefault()

        setModal(null)
        onUpdateEmployeeModalClose()
    }

    let { _id, name, firstSurname, secondSurname, idCardNumber, tssNumber, personalPhoneNumber, bankAccountNumber, address, avatar, typeOfContract, salaryLevel, centerAttached, department, jobPosition, roll, accessPermissions, professionalPhoneNumber, professionalEmail } = employee ?? {}


    const handleUpdateEmployee = (event) => {
        event.preventDefault()

        //  PERSONAL DATA
        let name = event.target.name.value
        let firstSurname = event.target.firstSurname.value
        let secondSurname = event.target.secondSurname.value
        // let birthDate = event.target.birthDate.value
        let idCardNumber = event.target.idCardNumber.value
        let tssNumber = (event.target.tssNumber.value).replace(/\s+/g, '')
        let address = event.target.address.value
        let personalPhoneNumber = Number((event.target.personalPhoneNumber.value).replace(/\s+/g, ''))
        let bankAccountNumber = (event.target.bankAccountNumber.value).replace(/\s+/g, '')
        let avatar = event.target.avatar.value

        //  PROFESIONAL DATA
        // let employeeNumber = parseInt(event.target.employeeNumber.value)
        // let startOfEmploymentData = event.target.startOfEmploymentData.value
        // let endOfEmploymentData = event.target.endOfEmploymentData.value
        // let lengthOfEmployment = event.target.lengthOfEmployment.value
        let typeOfContract = event.target.typeOfContract.value
        let jobPosition = event.target.jobPosition.value
        let department = event.target.department.value
        let salaryLevel = Number(event.target.salaryLevel.value)
        let centerAttached = event.target.centerAttached.value
        let superiorHierachicalManager = event.target.superiorHierachicalManager.value

        //  PERMISSIONS AREA
        let roll = event.target.roll.value
        let professionalPhoneNumber = Number((event.target.professionalPhoneNumber.value).replace(/\s+/g, ''))
        let professionalEmail = event.target.professionalEmail.value
        let accessPermissions = event.target.accessPermissions.value
        // let employeePasssword = event.target.employeePasssword.value

        try {

            return updateEmployee(_id,
                name,
                firstSurname,
                secondSurname,
                // birthDate,
                idCardNumber,
                tssNumber,
                address,
                personalPhoneNumber,
                bankAccountNumber,
                avatar,
                // employeeNumber,
                // startOfEmploymentData,
                // endOfEmploymentData,
                // lengthOfEmployment,
                typeOfContract,
                jobPosition,
                department,
                salaryLevel,
                centerAttached,
                superiorHierachicalManager,
                roll,
                professionalPhoneNumber,
                professionalEmail,
                accessPermissions,
                // employeePasssword
            )
                .then(() => {
                    setModal(null)
                    onEmployeeUpdated()
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }


    }


    return <section className="registerEmployee">
        <div className="h-full flex  pl-4 pr-12 mt-1 space-y-4 w-full">
            <form className="" onSubmit={handleUpdateEmployee}>
                <h5>Personal data </h5>
                <div className="flex flex-wrap">
                    <div className="w-2/6">
                        <label className="placeholder:text-">Name: <Input className="placeholder:text-xs" type="text" name="name" placeholder="Name" defaultValue={name} /></label>
                    </div>
                    <div className="w-2/6">
                        <label>First surname: <Input className="placeholder:text-xs" type="text" name="firstSurname" placeholder="First Surname" defaultValue={firstSurname} /></label>
                    </div>
                    <div className="w-2/6">
                        <label>Second surname: <Input className="placeholder:text-xs" type="text" name="secondSurname" placeholder="Second Surname" defaultValue={secondSurname} /></label>
                    </div>
                    {/* <label>Birthdate: <input className="input w-1/4" type="date" name="birthDate" /></label> */}
                    <div className="w-2/6">
                        <label>Id Card number:<Input className="placeholder:text-xs" type="text" name="idCardNumber" placeholder="NNNNNNNNL" defaultValue={idCardNumber} /></label>
                    </div>
                    <div className="w-2/6">
                        <label>TSS number:<Input className="placeholder:text-xs" type="text" name="tssNumber" placeholder="NN NNNNNNNN NN" defaultValue={tssNumber} /></label>
                    </div>
                    <div className="w-2/6">
                        <label>Personal phone number:<Input className="placeholder:text-xs" type="number" name="personalPhoneNumber" placeholder="NNN NN NN NN" defaultValue={personalPhoneNumber} /></label>
                    </div>
                    <div className="w-7/12">
                        <label>Bank account number:<Input className="w-full placeholder:text-xs" type="text" name="bankAccountNumber" placeholder="LLNN NNNN NNNN NNNN NNNN" defaultValue={bankAccountNumber} /></label>
                    </div>
                    <div className="w-7/12">
                        <label>Address:<Input className="w-full placeholder:text-xs" type="text" name="address" placeholder="Street number  floor door  Postal Code City (Province) Country" defaultValue={address} /></label>
                    </div>
                    <div className="w-7/12">
                        <label>Avatar:<Input className="w-full placeholder:text-xs" type="url" name="avatar" placeholder="URL" defaultValue={avatar} /></label>
                    </div>
                </div>
                <h5 className="mt-7">Professional data</h5>
                <div className="flex flex-wrap">
                    {/* <div className="w-2/6">
                        <label>Employee number:<Input className="placeholder:text-xs" type="number" name="employeeNumber" placeholder="NNNNN" defaultValue={employeeNumber} /></label>
                    </div> */}
                    {/* <label>Start of employment data:<input className="input" type="date" name="startOfEmploymentData" /></label>
                        <label>End of employment data:<input className="input" type="date" name="endOfEmploymentData" /></label>
                        <label>Length of employment:<input className="input" type="number" name="lengthOfEmployment" /></label> */}
                    <div className="w-2/6">
                        <label>Type of contract:<Input className="placeholder:text-xs" type="text" name="typeOfContract" placeholder="Temporal / Permanent" defaultValue={typeOfContract} /></label>
                    </div>
                    <div className="w-2/6">
                        <label>Salary level:<Input className="placeholder:text-xs" type="number" name="salaryLevel" placeholder="1 / 2 / 3 / 3 / 4 / 5" defaultValue={salaryLevel} /></label>
                    </div>
                    <div className="w-2/6 ">
                        <label>Center attached:<Input className="placeholder:text-xs" type="text" name="centerAttached" placeholder="Barcelona / Madrid / Malaga" defaultValue={centerAttached} /></label>
                    </div>
                    <div className="w-7/12">
                        <label>Department:<Input className="w-full placeholder:text-xs" type="text" name="department" placeholder="C-Suite /Development / Design / Financial / Human Resources" defaultValue={department} /></label>
                    </div>
                    <div className="w-7/12">
                        <label>Job position:<Input className="w-full placeholder:text-xs" type="text" name="jobPosition" placeholder="CEO / CFO / CTO / Executive / Manager / Developer / Financial Controller / Assistant" defaultValue={jobPosition} /></label>
                    </div>
                    <div className="w-7/12">
                        <label>Superior hierarchical manager:<Input className="input w-full" type="text" name="superiorHierachicalManager" placeholder="Id" /></label>
                    </div>
                    <h5 className="w-3/6 mt-7">Permissions area</h5>
                    <div className="flex flex-wrap mt-2 pb-3">
                        <div className="w-2/6 ">
                            <label>Roll:<Input className="placeholder:text-xs" type="text" name="roll" placeholder="Admin / User" defaultValue={roll} /></label>
                        </div>
                        <div className="w-2/6 ">
                            <label>Access permissions<Input className="placeholder:text-xs" type="text" name="accessPermissions" placeholder="Authorized / Denied" defaultValue={accessPermissions} /></label>
                        </div>

                        <div className="w-2/6 ">
                            <label>Profess. phone number:<Input className="placeholder:text-xs" type="text" name="professionalPhoneNumber" placeholder="NNN NN NN NN" defaultValue={professionalPhoneNumber} /></label>
                        </div>
                        <div className="w-7/12 ">
                            <label>Professional email:<Input className="w-full placeholder:text-xs" type="email" name="professionalEmail" placeholder="name.firstSurname@b-elevezsd.es" defaultValue={professionalEmail} /></label>
                        </div>
                    </div >
                    <div className="w-full flex bg-slate-200 sticky bottom-0 z-10">
                        <div className="w-3/12 pt-3 pb-b sticky bottom-0 z-10 bg-slate-200">
                            <Button className="w-7/12" type="submit" >Update </Button>
                        </div>
                        <div className="w-3/12 pt-3 pb-4 sticky bottom-0 z-10 bg-slate-200">
                            <Button className="w-7/12 bg-slate-500" onClick={handleUpdateEmployeeModalClose}>Cancel</Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </section >
}

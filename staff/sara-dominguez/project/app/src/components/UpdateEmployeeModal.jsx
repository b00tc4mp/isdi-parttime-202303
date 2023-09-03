import useAppContext from '../hooks/useAppContext'
import Header from './Header.jsx'
import { Input, InputForm, Container, Button, FormButton } from '../library'
import updateEmployee from '../logic/updateEmployee'
import { useState, useEffect } from 'react'
import retrieveEmployee from '../logic/retrieveEmployee'
import searchEmployees from '../logic/searchEmployees'


export default function RegisterEmployeeModal({ employeeId, onUpdateEmployeeModalClose, onEmployeeUpdated }) {
    console.log('EmployeeDatabaseMenu --> open')

    const { alert } = useAppContext()
    const [modal, setModal] = useState(null)
    const [employee, setEmployee] = useState(null)
    const [superiorHierarchicalManagerSelected, setSuperiorHierarchicalManagerSelected] = useState(null)

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

    const handleSearchSuperiorHierarchicalManager = (event) => {
        event.preventDefault()

        const superiorHierarchicalEmployeeNumber = event.target.superiorHierarchicalEmployeeNumber.value
        searchEmployees(superiorHierarchicalEmployeeNumber)

            .then((employee) => {
                const employeeId = employee[0]._id
                setSuperiorHierarchicalManagerSelected(employeeId)
            })

    }

    function handleUpdateEmployeeModalClose(event) {
        event.preventDefault()

        setModal(null)
        onUpdateEmployeeModalClose()
    }

    let { _id, name, firstSurname, secondSurname, idCardNumber, tssNumber, personalPhoneNumber, bankAccountNumber, address, avatar, typeOfContract, salaryLevel, centerAttached, department, jobPosition, roll, accessPermissions, professionalPhoneNumber, professionalEmail, superiorHierarchicalManager } = employee ?? {}


    const handleUpdateEmployee = (event) => {
        event.preventDefault()

        //  PERSONAL DATA
        let name = event.target.name.value
        let firstSurname = event.target.firstSurname.value
        let secondSurname = event.target.secondSurname.value
        let idCardNumber = event.target.idCardNumber.value
        let tssNumber = (event.target.tssNumber.value).replace(/\s+/g, '')
        let address = event.target.address.value
        let personalPhoneNumber = Number((event.target.personalPhoneNumber.value).replace(/\s+/g, ''))
        let bankAccountNumber = (event.target.bankAccountNumber.value).replace(/\s+/g, '')
        let avatar = event.target.avatar.value

        //  PROFESIONAL DATA
        let typeOfContract = event.target.typeOfContract.value
        let jobPosition = event.target.jobPosition.value
        let department = event.target.department.value
        let salaryLevel = Number(event.target.salaryLevel.value)
        let centerAttached = event.target.centerAttached.value
        let superiorHierarchicalManager = superiorHierarchicalManagerSelected

        //  PERMISSIONS AREA
        let roll = event.target.roll.value
        let professionalPhoneNumber = Number((event.target.professionalPhoneNumber.value).replace(/\s+/g, ''))
        let professionalEmail = event.target.professionalEmail.value
        let accessPermissions = event.target.accessPermissions.value

        try {

            return updateEmployee(_id,
                name,
                firstSurname,
                secondSurname,
                idCardNumber,
                tssNumber,
                address,
                personalPhoneNumber,
                bankAccountNumber,
                avatar,
                typeOfContract,
                jobPosition,
                department,
                salaryLevel,
                centerAttached,
                superiorHierarchicalManager,
                roll,
                professionalPhoneNumber,
                professionalEmail,
                accessPermissions,
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
        <main className="h-full flex flex-col pl-4 pr-12 mt-1 space-y-4 w-full">
            <form className="bg-slate-200 text-xs flex" onSubmit={handleSearchSuperiorHierarchicalManager}>
                <Input className="text-center w-[40%]" name="superiorHierarchicalEmployeeNumber" type="text" placeholder=" superior hierarchical employee number"></Input>
                <FormButton className="w-1/6 ml-2">search</FormButton>
            </form>
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
                        <label>Superior hierarchical manager:<Input className="input w-full" type="text" name="superiorHierachicalManager" placeholder="Id" defaultValue={superiorHierarchicalManager} /></label>
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
        </main>
    </section >
}

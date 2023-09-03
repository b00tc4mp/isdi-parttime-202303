import { useState, useEffect } from 'react'
import retrieveEmployee from '../logic/retrieveEmployee'
import { Input, Container, Button, FormButton } from '../library'
import useAppContext from '../hooks/useAppContext'

export default function EmployeeModal({ employeeId, onEmployeeModalClose }) {
    console.log("employeeModal --> open")

    const [modal, setModal] = useState(null)
    const [employee, setEmployee] = useState(null)
    const [superiorHierarchicalManagerDataCompleted, setSuperiorHierarchicalManagerDataCompleted] = useState(null)
    const { alert } = useAppContext()

    useEffect(() => {
        async function fetchEmployee() {
            try {
                const employee = await retrieveEmployee(employeeId)
                if (employee === undefined) {
                    throw new Error("employee not found")
                }
                setEmployee(employee)

                const superiorHierarchicalManagerData = await retrieveEmployee(employee.superiorHierarchicalManager)
                if (superiorHierarchicalManagerData === undefined) {
                    const superiorHierarchicalManagerDataCompleted = "Not specified"
                    setSuperiorHierarchicalManagerDataCompleted(superiorHierarchicalManagerDataCompleted)
                }
                const superiorHierarchicalManagerDataCompleted = { superiorHierarchicalName: superiorHierarchicalManagerData.name, superiorHierarchicalFirstSurname: superiorHierarchicalManagerData.firstSurname, superiorHierarchicalSecondSurname: superiorHierarchicalManagerData.secondSurname, superiorHierarchicalEmployeeNumber: superiorHierarchicalManagerData.employeeNumber }
                setSuperiorHierarchicalManagerDataCompleted(superiorHierarchicalManagerDataCompleted)
            } catch (error) {
                alert(error.message)
            }
        }
        fetchEmployee()
    }, [])

    function handleEmployeeModalClose(event) {
        event.preventDefault()

        try {
            setModal(null)
            onEmployeeModalClose()
        } catch (error) {
            alert(error.message)
        }
    }

    const { name, firstSurname, secondSurname, employeeNumber, idCardNumber, tssNumber, address, avatar, typeOfContract, jobPosition, personalPhoneNumber, professionalEmail, professionalPhoneNumber, centerAttached, roll, department, salaryLevel, accessPermissions } = employee ?? {}


    const { superiorHierarchicalName, superiorHierarchicalFirstSurname, superiorHierarchicalSecondSurname, superiorHierarchicalEmployeeNumber } = superiorHierarchicalManagerDataCompleted ?? {}

    return <Container className="w-full h-screen overflow-auto">
        <div className="w-full h-screen bg-slate-50 flex flex-col mb-2 p-3 rounded-[7px] shadow-md items-center block">
            <div className="w-full h-[15%] border-y-4 border-slate-200 flex flex- items-center" >
                <div className="">
                    <img className="rounded-full grayscale mr-3" src={avatar} width="60rem" />
                </div>
                <div>
                    <div >
                        <div className="w-full pl-2 text-lg font-bold">{name} {firstSurname} {secondSurname}</div>
                    </div>
                    <div>
                        <div className="w-11/12 pl-2 text-sm">Employee Number: {employeeNumber}</div>
                    </div>
                </div>
                <div className="flex w-2/12 ml-[30%]">
                    <button className="w-full text-xs rounded-md bg-slate-400 px-3 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 drop-shadow-md text-center" onClick={handleEmployeeModalClose}>Back</button>
                </div >
            </div>
            <div className="w-full h-[30%] border-b-4 border-slate-200 flex flex-wrap">
                <div className="w-full h-1/6 mt-2  bg-slate-200 flex items-center">
                    <h4 className="italic ml-2 text-xs font-bold">Personal Information</h4>
                </div>
                <div className=" w-full ml-[1%]">
                    <div className="w-full">
                        <h4 className="text-xs">Id card Number: {idCardNumber}</h4>
                    </div>
                    <div className="w-full">
                        <h4 className="text-xs">Birthdate:</h4>
                    </div>
                    <div className="w-full">
                        <h4 className="text-xs">Place of birth:</h4>
                    </div>
                    <div className="w-full">
                        <h4 className="text-xs">Nationality:</h4>
                    </div>
                    <div className="w-full">
                        <h4 className="text-xs">Gender:</h4>
                    </div>
                    <div className="w-full">
                        <h4 className="text-xs">Age:</h4>
                    </div>
                    <div className="w-full">
                        <h4 className="text-xs">Marital status:</h4>
                    </div>
                    <div className="w-full">
                        <h4 className="text-xs"> Current address: {address}</h4>
                    </div>
                </div>
            </div>
            <div className="w-full h-[15%] border-b-4 pb-2 border-slate-200 flex flex-wrap ">
                <div className=" w-5/12 mt-2 ml-[1%]">
                    <div className="w-full">
                        <h4 className="text-xs">TSS number: {tssNumber}</h4>
                    </div>
                    <div className="w-full">
                        <h4 className="text-xs">Phone number: {(personalPhoneNumber)}</h4>
                    </div>
                    <div className="w-full">
                        <h4 className="text-xs">Personal email: </h4>
                    </div>
                    <div className="w-full">
                        <h4 className="text-xs">Emergency contacts:</h4>
                    </div>
                </div>
            </div>

            <div className="w-full h-[25%] border-b-4 border-slate-200 flex flex-wrap ">
                <div className="w-full h-1/6 mt-2 bg-slate-200 flex items-center">
                    <h4 className="italic ml-2 text-xs font-bold">Professional Information</h4>
                </div>
                <div className=" w-full ml-[1%]">
                    <div className="w-full">
                        <h4 className="text-xs">TSS number: {tssNumber}</h4>
                    </div>
                    <div className="w-full">
                        <h4 className="text-xs">Type of contract: {typeOfContract}</h4>
                    </div>
                    <div className="w-full">
                        <h4 className="text-xs">Department: {department}</h4>
                    </div>
                    <div className="w-full">
                        <h4 className="text-xs">Job position: {jobPosition}</h4>
                    </div>
                    <div className="w-full">
                        <div className="w-full">
                            <h4 className="text-xs">Superior Hierarchical Manager:  {superiorHierarchicalName} {superiorHierarchicalFirstSurname} {superiorHierarchicalSecondSurname}-{superiorHierarchicalEmployeeNumber}</h4>
                        </div>
                        <h4 className="text-xs">Salary level: {salaryLevel}</h4>
                    </div>
                    <div className="w-full">
                        <h4 className="text-xs">Center attached: {centerAttached}</h4>
                    </div>
                </div>
            </div>
            <div className="w-full h-[15%] border-b-4 border-slate-200 flex flex-wrap ">
                <div className=" w-full mt-2 mb-2 ml-[1%]">
                    <div className="w-full">
                        <h4 className="text-xs w-full">Professional phone number: {professionalPhoneNumber}</h4>
                    </div>
                    <div className="w-full">
                        <h4 className="text-xs">Professional email: {professionalEmail}</h4>
                    </div>
                    <div className="w-full">
                        <h4 className="text-xs">Roll: {roll}</h4>
                    </div>
                    <div className="w-full">
                        <h4 className="text-xs">Access permissions: {accessPermissions}</h4>
                    </div>
                </div>
            </div>
        </div>
    </Container >
}
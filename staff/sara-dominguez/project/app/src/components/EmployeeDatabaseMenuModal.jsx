import useAppContext from '../hooks/useAppContext'
import Header from './Header.jsx'
import { Input, InputForm, Container, Button, FormButton } from '../library'
import registerEmployee from '../logic/registerEmployee'

export default function EmployeeDatabaseMenuModal({ employee, onEmployeeRegistered, onEmployeeDatabaseMenuModalLogout }) {
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
        const tssNumber = (event.target.tssNumber.value).replace(/\s+/g, '')
        const address = event.target.address.value
        const personalPhoneNumber = Number((event.target.personalPhoneNumber.value).replace(/\s+/g, ''))
        const bankAccountNumber = (event.target.bankAccountNumber.value).replace(/\s+/g, '')
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
        const professionalPhoneNumber = Number((event.target.professionalPhoneNumber.value).replace(/\s+/g, ''))
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
                address,
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
                employeePasssword
            )
                .then(() => {
                    onEmployeeRegistered()
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }
    function handleEmployeeDatabaseMenuModalLogout(event) {
        event.preventDefault()

        onEmployeeDatabaseMenuModalLogout()
    }
    return <Container tag="section" className="personalInformation">

        <Header employee={employee}
        />
        <main className="h-full flex overflow-auto h-full">
            <div className="sticky top-0 bg-slate-200 z-10">
                <div className="w-2/12 ml-4 pt-2 sticky top-0 bg-slate-200 z-10">
                    <h4 className="w-2/12 italic text-ml">Personal Database Menu</h4>
                </div>
                <div className="flex flex-col mt-20">
                    <h5 className="ml-3 mt-1">Register new employee</h5>
                </div>
            </div>
            <div className="pl-10 pr-12 mt-2 space-y-4 w-full">
                <form className="" onSubmit={handleRegisterEmployee}>
                    {/* <h6>Personal Data</h6> */}
                    <h5>Personal data </h5>
                    <div className="flex flex-wrap mt-2">
                        <div className="w-2/6">
                            <label className="">Name: <Input type="text" name="name" placeholder="Name" /></label>
                        </div>
                        <div className="w-2/6">
                            <label>First surname: <Input type="text" name="firstSurname" placeholder="First Surname" /></label>
                        </div>
                        <div className="w-2/6">
                            <label>Second surname: <Input type="text" name="secondSurname" placeholder="Second Surname" /></label>
                        </div>
                        {/* <label>Birthdate: <input className="input w-1/4" type="date" name="birthDate" /></label> */}
                        <div className="w-2/6">
                            <label>Id Card number:<Input type="text" name="idCardNumber" placeholder="NNNNNNNNL" /></label>
                        </div>
                        <div className="w-2/6">
                            <label>TSS number:<Input type="text" name="tssNumber" placeholder="NN NNNNNNNN NN" /></label>
                        </div>
                        <div className="w-2/6">
                            <label>Personal phone number:<Input type="number" name="personalPhoneNumber" placeholder="NNN NN NN NN" /></label>
                        </div>
                        <div className="w-7/12">
                            <label>Bank account number:<Input className="w-full" type="text" name="bankAccountNumber" placeholder="LLNN NNNN NNNN NNNN NNNN" /></label>
                        </div>
                        <div className="w-7/12">
                            <label>Address:<Input className="w-full" type="text" name="address" placeholder="Street number  floor door  Postal Code City (Province) Country" /></label>
                        </div>
                        <div className="w-7/12">
                            <label>Avatar:<Input className="w-full" type="url" name="avatar" placeholder="URL" /></label>
                        </div>
                    </div>
                    <h6 className="mt-7">Professional data</h6>
                    <div className="flex flex-wrap mt-2">
                        <div className="w-2/6">
                            <label>Employee number:<Input type="number" name="employeeNumber" placeholder="NNNNN" /></label>
                        </div>
                        {/* <label>Start of employment data:<input className="input" type="date" name="startOfEmploymentData" /></label>
                        <label>End of employment data:<input className="input" type="date" name="endOfEmploymentData" /></label>
                        <label>Length of employment:<input className="input" type="number" name="lengthOfEmployment" /></label> */}
                        <div className="w-2/6">
                            <label>Type of contract:<Input type="text" name="typeOfContract" placeholder="Temporal / Permanent" /></label>
                        </div>
                        <div className="w-2/6">
                            <label>Salary level:<Input type="number" name="salaryLevel" placeholder="1 / 2 / 3 / 3 / 4 / 5" /></label>
                        </div>
                        <div className="w-2/6 ">
                            <label>Center attached:<Input type="text" name="centerAttached" placeholder="Barcelona / Madrid / Malaga" /></label>
                        </div>
                        <div className="w-7/12">
                            <label>Department:<Input className="w-full" type="text" name="department" placeholder="Development / Design / Financial / Human Resources" /></label>
                        </div>
                        <div className="w-7/12">
                            <label>Job position:<Input className="w-full" type="text" name="jobPosition" placeholder="Executive / Manager / Developer / Financial Controller / Assistant" /></label>
                        </div>

                        {/* <label>Superior hierarchical manager:<input className="input" type="text" name="superiorHierachicalManager" /></label> */}

                        <h6 className="w-3/6 mt-7">Permissions area</h6>
                        <div className="flex flex-wrap mt-2">
                            <div className="w-2/6 ">
                                <label>Roll:<Input type="text" name="roll" placeholder="Admin / User" /></label>
                            </div>
                            <div className="w-2/6 ">
                                <label>Professional phone number:<Input type="text" name="professionalPhoneNumber" placeholder="NNN NN NN NN" /></label>
                            </div>
                            <div className="w-2/6 ">
                                <label>Professional email:<Input type="email" name="professionalEmail" placeholder="name.firstSurname@b-elevezsd.es" /></label>
                            </div>
                            <div className="w-2/6 ">
                                <label>Access permissions<Input type="text" name="accessPermissions" placeholder="Authorized / Denied" /></label>
                            </div>
                            <div className="w-2/6 ">
                                <label>Employee password<Input type="text" name="employeePasssword" placeholder="Be-NNNNN" />
                                </label>
                            </div>
                        </div >
                        <div className="w-full mt-9">
                            <Button className="w-7/12" type="submit" >Register</Button>
                        </div>
                    </div>
                </form>
            </div>
        </main>
        <footer className="ml-4 mt-2 pb-0.5 sticky bottom-0 bg-slate-200 z-10 italic">
            <h5 onClick={handleEmployeeDatabaseMenuModalLogout}>Logout</h5>
        </footer>
    </Container >
}

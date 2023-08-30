import { useState } from 'react'
import EmployeeFoundedModal from './EmployeeFoundedModal'
import searchEmployees from '../logic/searchEmployees'
import { Input, Container, Button, FormButton, Select } from '../library'
import useAppContext from '../hooks/useAppContext'


export default function searchEmployeesModal({ employee, onCloseSearchEmployeesModal }) {
    console.log("searchEmployee --> open")

    const [employees, setEmployees] = useState(null)
    const [modal, setModal] = useState(null)
    const [view, setView] = useState(null)
    const { alert } = useAppContext()


    const handleSearchEmployees = async (event) => {
        event.preventDefault()
        setView('employeesFound')

        const searchPattern = event.target.employeesToSearch.value

        if (!searchPattern) {
            throw alert('No search criteria found')
        }

        try {
            const employees = await searchEmployees(searchPattern)
            setEmployees(employees)
        } catch (error) {
            alert(error.message)
        }
    }

    const handleCloseSearchEmployeesModal = () => {
        setModal(null)
        onCloseSearchEmployeesModal()
    }
    const handleCloseEmployeeEmpoyeeFoundedModal = () => {
        setView(null)
        setEmployees(null)
        setModal(null)
    }


    return <section className="w-full mr-28 bg-slate-200 rounded-[7px] ">
        <form className="selectToProcessPayrollsPayment  bg-slate-200 mb- flex flex-wrap sticky top-0 z-10 items-center" onSubmit={handleSearchEmployees} >
            <Input className="placeholder:text-xs" type="text" name="employeesToSearch" placeholder="Search" />
            <div className="w-full flex mr-auto ml-auto p-0">
                <FormButton className="w-[45%] h-[47%] ml-6 mr-5 mt-4 mb-5">Search</FormButton>
                <FormButton className="w-[20%] mr-[4%] bg-slate-500 text-xs mt-4 mb-5" onClick={handleCloseSearchEmployeesModal}>Back</FormButton>
            </div>
        </form>
        <div className="flex flex-col">
            {view === 'employeesFound' && employees && employees.map((employee) => <EmployeeFoundedModal
                key={employee._id}
                employee={employee}
            />)}
            {employees ? (
                // <>
                <div className="h-[10%] pt-2 sticky bottom-0 bg-slate-200 z-10 flex justify-end">
                    <Button className="w-[20%] mr-[4%] bg-slate-500 flex justify-end text-xs mb-1 mt-2" onClick={handleCloseEmployeeEmpoyeeFoundedModal}>Close</Button>
                </div>

                // </>
            ) : (
                <h4></h4>
            )}
        </div>
    </section >

}

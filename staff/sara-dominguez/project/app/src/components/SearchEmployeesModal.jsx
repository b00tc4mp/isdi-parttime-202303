import { useState } from 'react'
import EmployeeFoundedModal from './EmployeeFoundedModal'
import searchEmployees from '../logic/searchEmployees'
import { Input, Container, Button, FormButton, Select } from '../library'
import useAppContext from '../hooks/useAppContext'


export default function searchEmployeesModal({ employee }) {
    console.log("searchEmployee --> open")

    const [employees, setEmployees] = useState(null)
    const [modal, setModal] = useState(null)
    const [view, setView] = useState(null)
    const { alert } = useAppContext()




    const handleSearchEmployees = async (event) => {
        event.preventDefault()
        setView('employeesFound')

        const employeesToSearch = event.target.employeesToSearch.value

        if (!employeesToSearch) {
            throw alert('No search criteria found')
        }

        try {
            const [name, firstSurname, secondSurname] = employeesToSearch.split(' ')
            const employees = await searchEmployees(name, firstSurname, secondSurname)

            setEmployees(employees)
        } catch (error) {
            alert(error.message)
        }
    }

    return <section className="w-full mr-28 bg-slate-200 rounded-[7px] ">
        <form className="selectToProcessPayrollsPayment bg-slate-200 mb-3 flex flex-wrap sticky top-0 z-10" onSubmit={handleSearchEmployees} >
            <Input className="placeholder:text-xs" type="text" name="employeesToSearch" placeholder="Names" />

            <FormButton className="mt-2 mb-3">Search</FormButton>
        </form>
        <div className="flex flex-col">
            {view === 'employeesFound' && employees && employees.map((employee) => <EmployeeFoundedModal
                key={employee._id}
                employee={employee}
            />)}
        </div >
    </section >
}

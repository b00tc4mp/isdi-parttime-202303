import { useState } from 'react'
import resetPassword from '../logic/resetPassword'
import { Input, Container, Button, FormButton, Select } from '../library'
import useAppContext from '../hooks/useAppContext'

export default function ResetPasswordModal({ employee, onPasswordReset, onCloseResetPasswordModal }) {
    console.log("searchEmployee --> open")

    const [employees, setEmployees] = useState(null)
    const [modal, setModal] = useState(null)
    const [view, setView] = useState(null)
    const { alert } = useAppContext()
    const [showCompletionMessage, setShowCompletionMessage] = useState(false)

    const handleResetPassword = async (event) => {
        event.preventDefault()

        try {
            const employeeNumber = event.target.employeePasswordToReset.value

            if (!employeeNumber) {
                throw alert('No search criteria found')
            }
            await resetPassword(employeeNumber)

            setShowCompletionMessage(true)

            setTimeout(() => {
                setShowCompletionMessage(false)
            }, 1500)
        } catch (error) {
            alert(error.message)
        }
    }

    const handleCloseSearchEmployeesModal = () => {
        setModal(null)
        onCloseResetPasswordModal()
    }

    return <section className="w-full mr-28 bg-slate-200 rounded-[7px] ">
        <form className="selectToProcessPayrollsPayment  bg-slate-200 mb- flex flex-wrap sticky top-0 z-10 items-center" onSubmit={handleResetPassword} >
            <Input className="placeholder:text-xs" type="text" name="employeePasswordToReset" placeholder="Employee Number" />
            {showCompletionMessage === true && (
                <div className="h-[10%] pt-2 sticky bottom-0 z-10 flex justify-end">
                    <p className="ml-3 text-amber-600">Password Reset!</p>
                </div>
            )}
            <div className="w-full flex mr-auto ml-auto p-0">
                <FormButton className="w-[45%] h-[47%] ml-6 mr-5 mt-4 mb-5">Reset</FormButton>
                <FormButton className="w-[20%] mr-[4%] bg-slate-500 text-xs mt-4 mb-5" onClick={handleCloseSearchEmployeesModal}>Back</FormButton>
            </div>
        </form>
        <div className="flex flex-col">
        </div>
    </section >

}

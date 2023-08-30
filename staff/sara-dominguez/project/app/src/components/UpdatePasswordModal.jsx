import updateEmployeePassword from '../logic/updateEmployeePassword'
import { Input, Container, Button, FormButton } from '../library'
import useAppContext from '../hooks/useAppContext'
import logoutEmployee from '../logic/logoutEmployee.js'

export default function UpdatePassword({ employee, onEmployeePasswordUpdated }) {
    console.debug('Update Password->render')
    const { alert, navigate } = useAppContext()

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
    const handleLogOut = () => {
        logoutEmployee()

        navigate('/Login')
    }

    const { name } = employee

    return <section className="h-screen w-screen flex justify-center bg-slate-50 fixed opacity-80 z-40">
        <div className="h-screen w-screen drop-shadow-md bg-slate-50 rounded-xl z-60">
            <h1 className="mt-44 mr-4 mb-5 text-center text-xl font-bold leading-9 tracking-tight text-amber-500 drop-shadow-md">Welcome {name}! please, it is necessary to update your password </h1>
            <form className="update-password-form" onSubmit={handleUpdatePassword}>
                <div className="mb-3 ml-[35%] w-[35%]">
                    <Input type="password" name="employeePassword" placeholder="Password" />
                </div>
                <div className="mb-3  ml-[35%] w-[35%]">
                    <Input type="password" name="employeeNewPassword" placeholder="New password" />
                </div>
                <div className="mb-3  ml-[35%] w-[35%]">
                    <Input type="password" name="employeeNewPasswordConfirm" placeholder="New password confirmation" />
                </div>
                <div className="mt-5 ml-[41%] w-[35%]">
                    <FormButton type="submit">Update</FormButton>
                </div>
            </form>
            <div className="mt-16 ml-[41%] w-[35%]">
                <FormButton type="submit" onClick={handleLogOut}>Logout</FormButton>
            </div>
        </div>
    </section>
}
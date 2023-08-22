import loginEmployee from '../logic/loginEmployee.js'
import { Link } from 'react-router-dom'
import useAppContext from '../hooks/useAppContext.js'
import { Button, Input } from '../library'



//TODO alert 

export default function Login() {
    console.debug('Login->render')
    const { alert, navigate } = useAppContext()

    function handleLogin(event) {
        event.preventDefault()

        const employeeNumber = Number(event.target.employeeNumber.value)
        const employeePassword = event.target.employeePassword.value

        try {
            loginEmployee(employeeNumber, employeePassword)
                .then(() => navigate('/'))
                .catch(error => {
                    alert(error.message, 'error')
                })
        } catch (error) {
            alert(error.message, 'error')
        }
    }
    return <div className="h-screen w-screen flex  items-center justify-center bg-slate-200"	>
        <div className="h-64 w-96 drop-shadow-md bg-white rounded-xl"	>
            <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-amber-500 drop-shadow-md mb-5">Welcome to b-ElevenzSd!</h1>
            <form onSubmit={handleLogin} className="space-y-3 flex flex-col items-center" >
                <Input type='number' name='employeeNumber' placeholder='Employee number' />
                <Input type='password' name='employeePassword' placeholder='Password' />
                <Button type="submit">Login</Button>
            </form>
        </div>
    </div>
}

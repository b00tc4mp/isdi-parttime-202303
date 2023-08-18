import loginEmployee from '../logic/loginEmployee.js'
import { Link } from 'react-router-dom'
import useAppContext from '../hooks/useAppContext.js'
import { Button } from '../library'



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
    return <div className="h-screen w-screen flex  items-center justify-center bg-neutral-200"	>
        <div className="h-64 w-96 drop-shadow-md bg-white rounded-xl"	>
            <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-amber-500 drop-shadow-md mb-5">Welcome to b-ElevenzSd!</h1>
            <form onSubmit={handleLogin} className="space-y-3 flex flex-col items-center" >
                <input type='number' name='employeeNumber' placeholder='Employee number' className="block w-9/12 rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 drop-shadow-md text-center" />
                <input type='password' name='employeePassword' autoComplete='new-password' placeholder='Password' className="block w-9/12 rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 drop-shadow-md text-center" />
                <Button type="submit">Login</Button>
            </form>
        </div>
    </div>
}
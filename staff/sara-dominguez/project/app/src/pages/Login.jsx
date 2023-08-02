import loginEmployee from '../logic/loginEmployee.js'
import { Link } from 'react-router-dom'
import useAppContext from '../hooks/useAppContext.js'




//TODO alert 

export default function Login() {
    console.debug('Login->render')
    const { alert, navigate } = useAppContext()

    function handleLogin(event) {
        event.preventDefault()

        const employeeNumber = event.target.employeeNumber.value
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

    return <div>
        <h1 className="">Welcome to b-Elevenzsd!</h1>
        <form onSubmit={handleLogin}>
            <input type='number' name='employeeNumber' placeholder='Employee number' />
            <input type='password' name='employeePassword' autoComplete='new-password' placeholder='Password' />
            <button type="submit">Login</button>
        </form>
        <p className=""> Forgot your password?<Link to="/ForgotPassword">Remember</Link></p>
    </div>

}
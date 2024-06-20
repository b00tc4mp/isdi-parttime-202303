import registerUser from '../../logic/registerUser'
import Container from "../library/Container"
import { useAppContext , useHandleErrors } from '../hooks'
import { Link } from 'react-router-dom'

export default function Register() {
    console.log('Register -> render')

    const { navigate } = useAppContext()
    const handleErrors = useHandleErrors()

    const handleRegister = (event) => {
        event.preventDefault()

        const name = event.target.name.value
        const email = event.target.email.value
        const password = event.target.password.value

        handleErrors(async () => {
            await registerUser(name, email, password)

            navigate('/login')
        })
    }
    
    return <Container>
        <h1 className ='title'> Sign up </h1>

        <h2> Already have an account? <Link to="/login"> Log in </Link></h2>

        <form className='form' onSubmit={handleRegister}>
            <input className='input' type='name' name='name' placeholder='Name*'/>
            <input className='input' type='email' name='email' placeholder='Email address*'/>
            <input className='input' type='password' name='password' placeholder='Password (8+ characters)*'/>
            <button className='button' type='submit'> CREATE AN ACCOUNT </button>

        </form>
    </Container>
}


import loginUser from '../../logic/loginUser'
import Container from '../library/Container'
import { useAppContext , useHandleErrors }from '../hooks'
import { Link } from 'react-router-dom'


export default function Login() {
    console.debug('Login -> render')

    const { navigate } = useAppContext()

    const handleErrors = useHandleErrors()

    const handleLogin = event => {
        event.preventDefault()
        
        const email = event.target.email.value
        const password = event.target.password.value

        handleErrors(async () => {
            await loginUser(email, password)

            navigate('/')
        })
    }

    return <Container tag="main">
        <h1 className='title'> Log in</h1>
        
        <h2> New to myApp?  <Link to="/register"> Sign up </Link></h2>

        <form className="form" onSubmit={handleLogin}>
            <input className="input" type="email" name="email" placeholder="Email address*"/>
            <input className="input" type="password" name="password" placeholder="Password (8+ characters)*"/>
            <button className= "button" type="submit"> Log in </button>
        </form>

    </Container>
}
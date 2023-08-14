import loginUser from '../../logic/loginUser'
import { Container, Form, Input, Button } from '../library'
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
        <h1> Log in</h1>
        
        <h2> New to myApp?  <Link to="/register" className="text-blue-500 hover:underline"> Sign up </Link></h2>

        <Form onSubmit={handleLogin}>
            <Input  type="email" name="email" placeholder="Email address*"/>
            <Input  type="password" name="password" placeholder="Password (8+ characters)*"/>
            <Button type="submit"> Log in </Button>
        </Form>

    </Container>
}